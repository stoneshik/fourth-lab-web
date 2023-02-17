package lab.fourth.lab.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.time.Clock;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_dot")
public class Dot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @DecimalMin("-5.0")
    @DecimalMax("3.0")
    private Double x = 0.0;
    @NotNull
    @DecimalMin("-5.0")
    @DecimalMax("5.0")
    private Double y = 0.0;
    @NotNull
    @DecimalMin("1.0")
    @DecimalMax("3.0")
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