package lab.fourth.lab.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
    public static void setValue(HttpServletRequest request, String nameValue, Object value) {
        HttpSession session = request.getSession();
        session.setAttribute(nameValue, value);
    }

    public static Object readValue(HttpServletRequest request, String nameValue) {
        HttpSession session = request.getSession();
        return session.getAttribute(nameValue);
    }

    public static void deleteValue(HttpServletRequest request, String nameValue) {
        HttpSession session = request.getSession();
        session.removeAttribute(nameValue);
    }
}
