package lab.fourth.lab.api;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Status {
    CODE_200(200, "ok"),
    CODE_201(201, "dot created"),
    CODE_400(400, "bad request"),
    CODE_401(401, "not authorized");

    private final int code;
    private final String text;

    Status(int code, String text) {
        this.code = code;
        this.text = text;
    }

    public int getCode() {
        return code;
    }

    public String getText() {
        return text;
    }
}
