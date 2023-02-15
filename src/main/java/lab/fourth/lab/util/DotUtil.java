package lab.fourth.lab.util;

import lab.fourth.lab.entities.Dot;

public class DotUtil {
    private static boolean checkHit(Double x, Double y, Double r) {
        return (
            (x <= 0 && y <= 0 && y >= -(x + r)) ||
            (x >= 0 && y <= 0 && x <= r / 2 && y >= -r) ||
            (x >= 0 && y >= 0 && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))
        );
    }

    public static void updateDot(Dot dot, Long startTime) {
        dot.setIsHit(
            checkHit(dot.getX(), dot.getY(), dot.getR())
        );
        dot.setTimeLead(System.nanoTime() - startTime);
    }
}
