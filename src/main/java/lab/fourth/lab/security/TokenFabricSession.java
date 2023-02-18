package lab.fourth.lab.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class TokenFabricSession {
    public static Token newInstance(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object tokenRaw = session.getAttribute("csrf_token");
        Object tokenNameRaw = session.getAttribute("csrf_header");
        if (tokenRaw == null || tokenNameRaw == null) {
            return new Token("", "");
        }
        String token, tokenName;
        try {
            token = (String) tokenRaw;
            tokenName = (String) tokenNameRaw;
        } catch (ClassCastException e) {
            return new Token("", "");
        }
        return new Token(token, tokenName);
    }
}
