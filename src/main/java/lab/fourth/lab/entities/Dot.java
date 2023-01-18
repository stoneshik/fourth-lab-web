package lab.fourth.lab.entities;

import jakarta.persistence.*;

import java.time.Clock;
import java.time.LocalDateTime;

@Entity
@Table(name = "dot")
public class Dot {
    @Id
    @SequenceGenerator(name = "sequence_generator", sequenceName = "id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_generator")
    private Long id;
    private Double x = 0.0;
    private Double y = 0.0;
    private Double r = 1.0;
    private boolean isHit = false;
    private LocalDateTime timeDispatch = LocalDateTime.now(Clock.systemUTC());
    private Long timeLead;

    public Long getId() {
        return id;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public boolean getIsHit() {
        return isHit;
    }

    public LocalDateTime getTimeDispatch() {
        return timeDispatch;
    }

    public Long getTimeLead() {
        return timeLead;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setIsHit(boolean hit) {
        this.isHit = hit;
    }

    public void setTimeDispatch(LocalDateTime timeDispatch) {
        this.timeDispatch = timeDispatch;
    }

    public void setTimeLead(Long timeLead) {
        this.timeLead = timeLead;
    }
}