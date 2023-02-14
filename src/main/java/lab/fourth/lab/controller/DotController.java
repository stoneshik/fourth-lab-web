package lab.fourth.lab.controller;

import lab.fourth.lab.api.dot.DotResponse;
import lab.fourth.lab.api.dot.DotResponseFabric;
import lab.fourth.lab.api.dot.Status;
import lab.fourth.lab.entities.Dot;
import lab.fourth.lab.service.DotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class DotController {
    private final DotService dotService;

    public DotController(@Autowired DotService dotService) {
        this.dotService = dotService;
    }

    @GetMapping("/api/dot/load")
    public DotResponse load() {
        ArrayList<Dot> dots = (ArrayList<Dot>) this.dotService.findAll();
        return DotResponseFabric.newInstance(Status.CODE_200, dots, true);
    }
}
