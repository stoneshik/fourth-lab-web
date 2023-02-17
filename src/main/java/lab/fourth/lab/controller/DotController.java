package lab.fourth.lab.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import lab.fourth.lab.api.dot.DotResponse;
import lab.fourth.lab.api.dot.DotResponseFabric;
import lab.fourth.lab.api.dot.Status;
import lab.fourth.lab.entity.Dot;
import lab.fourth.lab.service.DotService;
import lab.fourth.lab.util.DotUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.*;

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
        return DotResponseFabric.newInstance(Status.CODE_200, dots);
    }

    @PostMapping("api/dot/add")
    public DotResponse add(HttpServletRequest request) {
        long startTime = System.nanoTime();
        String dotsRawString = request.getParameter("dots");
        if (dotsRawString == null) {
            return DotResponseFabric.newInstance(Status.CODE_401, "Не найден POST параметр dots");
        }
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<Dot> dots;
        try {
            dots = mapper.readValue(dotsRawString, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            return DotResponseFabric.newInstance(Status.CODE_401, "Ошибка в переданном JSON");
        }
        dots.forEach(dot -> DotUtil.updateDot(dot, startTime));
        try {
            this.dotService.add(dots);
        } catch (TransactionSystemException e) {
            return DotResponseFabric.newInstance(Status.CODE_401, e.getMessage());
        }
        return DotResponseFabric.newInstance(Status.CODE_201, dots, true);
    }

    @DeleteMapping("api/dot/clear")
    public DotResponse clear() {
        this.dotService.clear();
        return DotResponseFabric.newInstance(Status.CODE_201, true);
    }
}
