package lab.fourth.lab.util;

import lab.fourth.lab.security.TokenDto;
import lab.fourth.lab.security.TokenFabricSession;

import javax.servlet.http.HttpServletRequest;

public class TokenUtil {
    public static void setValue(HttpServletRequest request, String token, String tokenName) {
        SessionUtil.setValue(request, "csrf_token", token);
        SessionUtil.setValue(request, "csrf_header", tokenName);
    }

    public static TokenDto readValue(HttpServletRequest request) {
        return TokenFabricSession.newInstance(request);
    }

    public static void deleteValue(HttpServletRequest request) {
        SessionUtil.deleteValue(request, "csrf_token");
        SessionUtil.deleteValue(request, "csrf_header");
    }

    public static boolean isEmpty(TokenDto tokenDto) {
        return tokenDto.token().equals("") || tokenDto.headerToken().equals("");
    }
}
