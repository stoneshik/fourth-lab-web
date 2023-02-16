package lab.fourth.lab.repository;

import lab.fourth.lab.entity.Dot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DotRepository extends JpaRepository<Dot, Long> {}
