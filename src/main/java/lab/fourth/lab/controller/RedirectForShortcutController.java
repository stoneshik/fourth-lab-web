package lab.fourth.lab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class RedirectForShortcutController {
    @GetMapping("/main")
    public RedirectView redirectForMainPage() {
        return new RedirectView("/main.html");
    }

    @GetMapping("/index")
    public RedirectView redirectForIndexPage() {
        return new RedirectView("/index.html");
    }
}
