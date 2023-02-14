package lab.fourth.lab.controller;

import lab.fourth.lab.api.dot.DotResponse;
import lab.fourth.lab.api.dot.DotResponseFabric;
import lab.fourth.lab.api.dot.Status;
import lab.fourth.lab.entities.Dot;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class DotController {
    @GetMapping("/api/dot/load")
    public DotResponse load() {
        ArrayList<Dot> dots = new ArrayList<>();
        dots.add(new Dot());
        return DotResponseFabric.newInstance(Status.CODE_200, dots, true);
    }
}
