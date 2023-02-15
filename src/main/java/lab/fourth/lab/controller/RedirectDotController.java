package lab.fourth.lab.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class RedirectDotController {
    @GetMapping("api/dot/add")
    public RedirectView redirectAdd() {
        return new RedirectView("/main.html");
    }

    @GetMapping("api/dot/clear")
    public RedirectView redirectClear() {
        return new RedirectView("/main.html");
    }
}
