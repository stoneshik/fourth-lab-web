package lab.fourth.lab.api.user;

import lab.fourth.lab.api.Status;
import lab.fourth.lab.security.TokenDto;
import lab.fourth.lab.security.TokenFabric;

public class UserResponseFabric {

    public static UserResponse newInstance(Status statusResponse, boolean boolAnswer, TokenDto token) {
        return new UserResponse(
                statusResponse, "", "", boolAnswer, "", token
        );
    }

    public static UserResponse newInstance(Status statusResponse, String errorMessage) {
        return new UserResponse(
                statusResponse, "", "", false, errorMessage, TokenFabric.newInstance()
        );
    }

    public static UserResponse newInstance(Status statusResponse, String userName, String password) {
        return new UserResponse(
                statusResponse, userName, password, false, "", TokenFabric.newInstance()
        );
    }

    public static UserResponse newInstance(Status statusResponse, String userName, String password, boolean boolAnswer) {
        return new UserResponse(
                statusResponse, userName, password, boolAnswer, "", TokenFabric.newInstance()
        );
    }
}
