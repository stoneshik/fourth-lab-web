package lab.fourth.lab.service;

import javax.transaction.Transactional;
import lab.fourth.lab.entity.Dot;
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

    @Transactional
    public List<Dot> findAll() {
        return this.repository.findAll();
    }

    @Transactional
    public void add(List<Dot> dots) {
        this.repository.saveAll(dots);
    }

    @Transactional
    public void clear() {
        this.repository.deleteAll();
    }
}
