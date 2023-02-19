package lab.fourth.lab.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lab.fourth.lab.api.Status;
import lab.fourth.lab.api.user.UserResponse;
import lab.fourth.lab.api.user.UserResponseFabric;
import lab.fourth.lab.entity.User;
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
public class AuthController {
    private final UserService userService;
    private final JwtTokenRepository tokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthController(
            @Autowired UserService userService,
            @Autowired JwtTokenRepository tokenRepository,
            @Autowired BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.tokenRepository = tokenRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping(path = "/api/user/auth")
    public UserResponse getAuthUser(HttpServletRequest request, HttpServletResponse response) {
        String userRawString = request.getParameter("user");
        if (userRawString == null) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Не найден POST параметр user_name");
        }
        ObjectMapper mapper = new ObjectMapper();
        User user;
        try {
            user = mapper.readValue(userRawString, User.class);
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

        CsrfToken csrfToken = this.tokenRepository.generateToken(request);
        this.tokenRepository.saveToken(csrfToken, request, response);
        TokenDto token = TokenFabric.newInstance(
                csrfToken.getToken(),
                csrfToken.getParameterName(),
                csrfToken.getHeaderName()
        );

        return UserResponseFabric.newInstance(Status.CODE_200, true, token);
    }
}
