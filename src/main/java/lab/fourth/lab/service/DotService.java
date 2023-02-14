package lab.fourth.lab.service;

import lab.fourth.lab.entities.Dot;
import lab.fourth.lab.repository.DotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DotService {
    private final DotRepository repository;

    public DotService(@Autowired DotRepository dotRepository) {
        this.repository = dotRepository;
    }

    public List<Dot> findAll() {
        return repository.findAll();
    }
}
