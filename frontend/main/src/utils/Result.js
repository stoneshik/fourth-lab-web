import { getParseTimeInString } from "./util";


export class Result {
    constructor(isHit, x, y, r, timeDispatch, timeLead) {
        this.isHit = isHit;
        this.x = x;
        this.y = y;
        this.r = r;
        this.timeDispatch = timeDispatch;
        this.timeLead = timeLead;
    }
    renderClassName() {
        if (this.isHit) {
            return "success";
        }
        return "fail";
    }
    renderIsHit() {
        if (this.isHit) {
            return 'Попала';
        }
        return 'Не попала';
    }
    renderX() {
        return parseFloat(this.x).toFixed(4);
    }
    renderY() {
        return parseFloat(this.y).toFixed(4);
    }
    renderR() {
        return parseFloat(this.r).toFixed(4);
    }
    renderTimeDispatch() {
        return getParseTimeInString(this.timeDispatch);
    }
    renderTimeLead() {
        return (parseFloat(this.timeLead) * 0.001).toFixed(3) + ' мкс';
    }
    renderResult(key) {
        return (
            <tr className={this.renderClassName()} key={key}>
                <td>{this.renderIsHit()}</td>
                <td>{this.renderX()}</td>
                <td>{this.renderY()}</td>
                <td>{this.renderR()}</td>
                <td>{this.renderTimeDispatch()}</td>
                <td>{this.renderTimeLead()}</td>
            </tr>
        );
    }
}