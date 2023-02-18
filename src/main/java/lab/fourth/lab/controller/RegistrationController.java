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
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class RegistrationController {
    private final UserService userService;
    private final JwtTokenRepository tokenRepository;

    public RegistrationController(@Autowired UserService userService, @Autowired JwtTokenRepository tokenRepository) {
        this.userService = userService;
        this.tokenRepository = tokenRepository;
    }

    @PostMapping("/api/user/registration")
    public UserResponse addUser(HttpServletRequest request, HttpServletResponse response) {
        String userRawString = request.getParameter("user");
        if (userRawString == null) {
            return UserResponseFabric.newInstance(Status.CODE_401, "Не найден POST параметр user_name");
        }
        ObjectMapper mapper = new ObjectMapper();
        User newUser;
        try {
            newUser = mapper.readValue(userRawString, User.class);
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
