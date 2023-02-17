package lab.fourth.lab.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectDotController {
    @GetMapping("api/dot/add")
    public String redirectAdd() {
        return "forward:/main.html";
    }

    @GetMapping("api/dot/clear")
    public String redirectClear() {
        return "forward:/main.html";
    }
}
