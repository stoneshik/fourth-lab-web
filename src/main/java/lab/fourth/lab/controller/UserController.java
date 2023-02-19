package lab.fourth.lab.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lab.fourth.lab.api.Status;
import lab.fourth.lab.api.user.UserResponse;
import lab.fourth.lab.api.user.UserResponseFabric;
import lab.fourth.lab.entity.User;
import lab.fourth.lab.exceptions.ReadPostParameterException;
import lab.fourth.lab.security.JwtTokenRepository;
import lab.fourth.lab.security.TokenDto;
import lab.fourth.lab.security.TokenFabric;
import lab.fourth.lab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenRepository tokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(
            @Autowired UserService userService,
            @Autowired JwtTokenRepository tokenRepository,
            @Autowired BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.tokenRepository = tokenRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    private User readUserFromPost(
            HttpServletRequest request
    ) throws ReadPostParameterException, JsonProcessingException {
        String userRawString = request.getParameter("user");
        if (userRawString == null) {
            throw new ReadPostParameterException();
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(userRawString, User.class);
    }

    private TokenDto createToken(HttpServletRequest request, HttpServletResponse response) {
        CsrfToken csrfToken = this.tokenRepository.generateToken(request);
        this.tokenRepository.saveToken(csrfToken, request, response);
        return TokenFabric.newInstance(
                csrfToken.getToken(),
                csrfToken.getParameterName(),
                csrfToken.getHeaderName()
        );
    }

    @PostMapping("/api/user/registration")
    public UserResponse registerUser(HttpServletRequest request, HttpServletResponse response) {
        User newUser;
        try {
            newUser = this.readUserFromPost(request);
        } catch (ReadPostParameterException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Не найден POST параметр user_name");
        } catch (JsonProcessingException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Ошибка в переданном JSON");
        }

        try {
            if (!this.userService.saveUser(newUser)) {
                return UserResponseFabric.newInstance(
                        Status.CODE_401,
                        "Пользователь с таким именем уже существует"
                );
            }
        } catch (TransactionSystemException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, e.getMessage());
        }

        TokenDto token = this.createToken(request, response);

        return UserResponseFabric.newInstance(Status.CODE_200, true, token);
    }

    @PostMapping("/api/user/auth")
    public UserResponse authUser(HttpServletRequest request, HttpServletResponse response) {
        User user;
        try {
            user = this.readUserFromPost(request);
        } catch (ReadPostParameterException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Не найден POST параметр user_name");
        } catch (JsonProcessingException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Ошибка в переданном JSON");
        }

        User loadUser;
        try {
            loadUser = this.userService.loadUserByUsername(user.getUsername());
        } catch (TransactionSystemException e) {
            return UserResponseFabric.newInstance(Status.CODE_401, e.getMessage());
        } catch (UsernameNotFoundException e) {
            return UserResponseFabric.newInstance(
                    Status.CODE_401,
                    "Пользователя с таким именем не существует"
            );
        }
        if (!this.bCryptPasswordEncoder.matches(user.getPassword(), loadUser.getPassword())) {
            return UserResponseFabric.newInstance(
                    Status.CODE_401,
                    "Неверный пароль"
            );
        }

        TokenDto token = this.createToken(request, response);

        return UserResponseFabric.newInstance(Status.CODE_200, true, token);
    }

    @PostMapping("/api/user/logout")
    public UserResponse getAuthUser(HttpServletRequest request) {
        this.tokenRepository.clearToken(request);
        TokenDto token = TokenFabric.newInstance();
        return UserResponseFabric.newInstance(Status.CODE_200, true, token);
    }
}
