package lab.fourth.lab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectForShortcutController {
    @GetMapping("/main")
    public String redirectForMainPage() {
        return "redirect:/main.jsp";
    }

    @GetMapping("/index")
    public String redirectForIndexPage() {
        return "forward:/";
    }
}
