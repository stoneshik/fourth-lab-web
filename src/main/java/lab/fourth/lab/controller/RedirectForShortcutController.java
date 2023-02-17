package lab.fourth.lab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class RedirectForShortcutController {
    @GetMapping("/main")
    public String redirectForMainPage() {
        return "forward:/main.html";
    }

    @GetMapping("/index")
    public RedirectView redirectForIndexPage() {
        return new RedirectView("/index.html");
    }
}
