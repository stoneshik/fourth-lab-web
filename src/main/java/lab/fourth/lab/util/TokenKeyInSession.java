package lab.fourth.lab.util;

public enum TokenKeyInSession {
    TOKEN("csrf_token"),
    PARAMETER_NAME("csrf_parameter_name"),
    HEADER("csrf_header");

    private final String key;
    TokenKeyInSession(String key) {
        this.key = key;
    }

    public String key() {
        return key;
    }
}
