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

    public Dot() {}

    public Dot(Double x, Double y, Double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = this.checkHit();
        this.timeLead = System.nanoTime();
    }

    private boolean checkHit() {
        return (
            (this.x <= 0 && this.y <= 0 && this.y == -(this.x + this.r)) ||
            (this.x >= 0 && this.y <= 0 && this.x <= this.r / 2 && this.y >= -this.r) ||
            (this.x >= 0 && this.y >= 0 && Math.pow(this.x, 2) + Math.pow(this.y, 2) <= Math.pow(this.r, 2))
        );
    }

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