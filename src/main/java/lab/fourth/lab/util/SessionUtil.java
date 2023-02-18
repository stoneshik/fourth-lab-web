package lab.fourth.lab.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
    public static void setValue(HttpServletRequest request, String nameValue, Object value) {
        HttpSession session = request.getSession();
        session.setAttribute(nameValue, value);
        /*response.addCookie(
            new Cookie(nameCookie, valueCookie)
        );*/
    }

    public static Object readValue(HttpServletRequest request, String nameValue) {
        HttpSession session = request.getSession();
        return session.getAttribute(nameValue);
        /*return Arrays.stream(req.getCookies())
                .filter(c -> c.getName().equals(cookieName))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);*/
    }

    public static void deleteValue(HttpServletRequest request, String nameValue) {
        HttpSession session = request.getSession();
        session.removeAttribute(nameValue);
        /*Cookie userNameCookieRemove = new Cookie(nameCookie, "");
        userNameCookieRemove.setMaxAge(0);
        response.addCookie(userNameCookieRemove);*/
    }
}
