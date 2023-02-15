package lab.fourth.lab.api.dot;

import lab.fourth.lab.entities.Dot;

import java.util.ArrayList;

public class DotResponseFabric {
    public static DotResponse newInstance(Status statusResponse, String errorMessage) {
        return new DotResponse(statusResponse, new ArrayList<>(), false, errorMessage);
    }
    public static DotResponse newInstance(Status statusResponse, boolean boolAnswer) {
        return new DotResponse(statusResponse, new ArrayList<>(), boolAnswer, "");
    }
    public static DotResponse newInstance(Status statusResponse, ArrayList<Dot> dots) {
        return new DotResponse(statusResponse, dots, false, "");
    }
    public static DotResponse newInstance(Status statusResponse, ArrayList<Dot> dots, boolean boolAnswer) {
        return new DotResponse(statusResponse, dots, boolAnswer, "");
    }
}
