package lab.fourth.lab.api.user;

import lab.fourth.lab.api.Status;

public class UserResponseFabric {

    public static UserResponse newInstance(Status statusResponse, boolean boolAnswer) {
        return new UserResponse(statusResponse, "", "", boolAnswer, "");
    }

    public static UserResponse newInstance(Status statusResponse, String errorMessage) {
        return new UserResponse(statusResponse, "", "", false, errorMessage);
    }

    public static UserResponse newInstance(Status statusResponse, String userName, String password) {
        return new UserResponse(statusResponse, userName, password, false, "");
    }

    public static UserResponse newInstance(Status statusResponse, String userName, String password, boolean boolAnswer) {
        return new UserResponse(statusResponse, userName, password, boolAnswer, "");
    }
}
