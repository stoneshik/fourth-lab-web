package lab.fourth.lab.api.user;

import lab.fourth.lab.api.Status;
import lab.fourth.lab.security.TokenDto;

public record UserResponse(
        Status statusResponse,
        String userName,
        String password,
        boolean boolAnswer,
        String errorMessage,
        TokenDto token) {}
