package lab.fourth.lab.security;

import lab.fourth.lab.util.TokenKeyInSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class TokenFabric {
    public static TokenDto newInstance() {
        return new TokenDto("", "", "");
    }

    public static TokenDto newInstance(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object tokenRaw = session.getAttribute(TokenKeyInSession.TOKEN.key());
        Object tokenParameterNameRaw = session.getAttribute(TokenKeyInSession.PARAMETER_NAME.key());
        Object headerRaw = session.getAttribute(TokenKeyInSession.HEADER.key());
        if (tokenRaw == null || tokenParameterNameRaw == null || headerRaw == null) {
            return new TokenDto("", "", "");
        }
        String token, tokenParameterName, header;
        try {
            token = (String) tokenRaw;
            tokenParameterName = (String) tokenParameterNameRaw;
            header = (String) headerRaw;
        } catch (ClassCastException e) {
            return new TokenDto("", "", "");
        }
        return new TokenDto(token, tokenParameterName, header);
    }

    public static TokenDto newInstance(String token, String parameterName, String headerToken) {
        return new TokenDto(token, parameterName, headerToken);
    }
}
