package lab.fourth.lab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class RedirectApi {
    @GetMapping("api/dot/add")
    public String redirectAdd() {
        return "forward:/main";
    }

    @GetMapping("api/dot/clear")
    public String redirectClear() {
        return "forward:/main";
    }

    @GetMapping("api/dot/auth")
    public String redirectAuth() {
        return "forward:/main";
    }

    @GetMapping("/api/user/registration")
    public String redirectRegistration() {
        return "forward:/main";
    }
}
