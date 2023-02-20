package lab.fourth.lab.util;

import lab.fourth.lab.security.TokenDto;
import lab.fourth.lab.security.TokenFabric;

import javax.servlet.http.HttpServletRequest;

public class TokenUtil {
    public static void setValue(HttpServletRequest request, String token, String tokenName) {
        SessionUtil.setValue(request, TokenKeyInSession.TOKEN.key(), token);
        SessionUtil.setValue(request, TokenKeyInSession.PARAMETER_NAME.key(), tokenName);
        SessionUtil.setValue(request, TokenKeyInSession.HEADER.key(), tokenName);
    }

    public static TokenDto readValue(HttpServletRequest request) {
        return TokenFabric.newInstance(request);
    }

    public static void deleteValue(HttpServletRequest request) {
        SessionUtil.deleteValue(request, TokenKeyInSession.TOKEN.key());
        SessionUtil.deleteValue(request, TokenKeyInSession.PARAMETER_NAME.key());
        SessionUtil.deleteValue(request, TokenKeyInSession.HEADER.key());
    }

    public static boolean isEmpty(TokenDto tokenDto) {
        return tokenDto.token().equals("") || tokenDto.headerToken().equals("");
    }
}
