package lab.fourth.lab.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class TokenFabricSession {
    public static TokenDto newInstance(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object tokenRaw = session.getAttribute("csrf_token");
        Object tokenParameterNameRaw = session.getAttribute("csrf_parameter_name");
        Object tokenNameRaw = session.getAttribute("csrf_header");
        if (tokenRaw == null || tokenNameRaw == null) {
            return new TokenDto("", "", "");
        }
        String token, tokenParameterName, tokenName;
        try {
            token = (String) tokenRaw;
            tokenParameterName = (String) tokenParameterNameRaw;
            tokenName = (String) tokenNameRaw;
        } catch (ClassCastException e) {
            return new TokenDto("", "", "");
        }
        return new TokenDto(token, tokenParameterName, tokenName);
    }
}
