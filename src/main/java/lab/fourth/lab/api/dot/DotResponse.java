package lab.fourth.lab.api.dot;

import lab.fourth.lab.entities.Dot;

import java.util.ArrayList;

public record DotResponse(Status statusResponse, ArrayList<Dot> dots, boolean boolAnswer, String errorMessage) {}
