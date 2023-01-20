import React from "react";

export class DotsManager {
    dots = [];
    // Работа с данными точек, считываемыми из таблицы результатов
    newDot(isHit, x, y, r) {
        return {isHit: isHit, x: x, y: y, r: r};
    }
    addDot(dot) {
        this.dots.push(dot);
    }
    cleanDots() {
        this.dots = [];
    }
}
export class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = new Canvas();
    }

    componentDidMount() {
        this.canvas.updateCanvasObj();
        this.canvas.drawCanvas();
    }

    render() {
        return <canvas id="canvas" height="600" width="600" x="0" y="0"></canvas>;
    }
}
export class Canvas {
    constructor() {
        this.dotsManager = new DotsManager();
        this.canvasObj = {
            canvas: undefined,
            width: undefined,
            height: undefined,
            font: "16px serif",
            center: {x: 0, y: 0},
            dotArgs: {x: 0, y: 0, r: 0},
            step: {x: 17, y: 17},
            serif: {
                numSerif: {x: 2, y: 2},
                numStepForSerif: {x: 3, y: 3}
            },
            r: {},
            lineWidth: 1,
        };
    }
    updateCanvasObj() {
        this.canvasObj.canvas = document.getElementById('canvas');
        this.canvasObj.width = this.canvasObj.canvas.width;
        this.canvasObj.height = this.canvasObj.canvas.height;
        this.canvasObj.r = {
            step: {
                x: this.canvasObj.serif.numStepForSerif.x * this.canvasObj.step.x,
                y: this.canvasObj.serif.numStepForSerif.y * this.canvasObj.step.y
            }
        };
    }
    drawCanvas() {
        const ctx = this.canvasObj.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasObj.canvas.width, this.canvasObj.canvas.height);
        this.findCenter(this.canvasObj);
        this.drawArea(ctx, this.canvasObj, '#4A90E2');
        this.drawGrid(ctx, this.canvasObj, 'lightgray');
        this.drawAxes(ctx, this.canvasObj, 'black');
        this.drawSerifs(ctx, this.canvasObj, 'black');
        this.drawLabels(ctx, this.canvasObj, 'black');
        if (this.dotsManager.dots.length !== 0) {
            this.drawDots(ctx, this.canvasObj, '#25D500', '#F60018');
        }
    }
    calcCoordinates(offsetX, offsetY, r) {
        return {
            'x': ((offsetX - this.canvasObj.center.x) / (this.canvasObj.r.step.x * 2)) * r,
            'y': -(((offsetY - this.canvasObj.center.y) / (this.canvasObj.r.step.y * 2)) * r)
        };
    }
    findCenter(canvasObj) {
        canvasObj.center.x = Math.round(canvasObj.width / canvasObj.step.x / 2) * canvasObj.step.x;
        canvasObj.center.y = Math.round(canvasObj.height / canvasObj.step.y / 2) * canvasObj.step.y;
    }
    drawArea(ctx, canvasObj, color) {
        const center = canvasObj.center;
        const r = canvasObj.r;

        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.arc(center.x, center.y, r.step.x, Math.PI, Math.PI + Math.PI / 2);
        ctx.lineTo(center.x + r.step.x * 2, center.y);
        ctx.lineTo(center.x + r.step.x * 2, center.y + r.step.y * 2);
        ctx.lineTo(center.x, center.y + (r.step.y * 2));
        ctx.lineTo(center.x, center.y);

        ctx.fillStyle = color;
        ctx.fill();
    }
    drawGrid(ctx, canvasObj, color) {
        const stepX = canvasObj.step.x;
        const stepY = canvasObj.step.y;
        ctx.beginPath();
        for (let i = 1 + stepX; i < canvasObj.width; i += stepX) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvasObj.height);
        }
        for (let j = 1 + stepY; j < canvasObj.height; j += stepY) {
            ctx.moveTo(0, j);
            ctx.lineTo(canvasObj.width, j);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = canvasObj.lineWidth;
        ctx.stroke();
    }
    drawAxes(ctx, canvasObj, color) {
        const center = canvasObj.center;
        const step = canvasObj.step;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = canvasObj.lineWidth;
        //ось X
        ctx.beginPath();
        ctx.moveTo(0, center.y);
        ctx.lineTo(canvasObj.width, center.y);
        //ось Y
        ctx.moveTo(center.x, canvasObj.height);
        ctx.lineTo(center.x, 0);
        ctx.stroke();

        //отрисовка стрелок
        const halfStepX = Math.round(step.x / 2);
        const halfStepY = Math.round(step.y / 2);
        //для X
        ctx.beginPath();
        ctx.moveTo(canvasObj.width, center.y);
        ctx.lineTo(canvasObj.width - halfStepX, center.y + halfStepY);
        ctx.lineTo(canvasObj.width - halfStepX, center.y - halfStepY);
        ctx.fill();
        //для Y
        ctx.beginPath();
        ctx.moveTo(center.x - halfStepX, halfStepY);
        ctx.lineTo(center.x, 0);
        ctx.lineTo(center.x + halfStepX, halfStepY);
        ctx.fill();
    }
    drawSerifs(ctx, canvasObj, color) {
        const center = canvasObj.center;
        const step = canvasObj.step;
        const serif = canvasObj.serif;
        const r = canvasObj.r;
        const startSerifX = center.x - (r.step.x * serif.numSerif.x);
        const startSerifY = center.y - (r.step.y * serif.numSerif.y);

        ctx.beginPath();
        // Рисуем для оси X
        for (let i = 0; i < serif.numSerif.x * 2 + 1; i++) {
            ctx.moveTo(startSerifX + (r.step.x * i), center.y - Math.round(step.y / 2));
            ctx.lineTo(startSerifX + (r.step.x * i), center.y + Math.round(step.y / 2));
        }
        // Рисуем для оси Y
        for (let i = 0; i < serif.numSerif.y * 2 + 1; i++) {
            ctx.moveTo(center.x - Math.round(step.x / 2), startSerifY + (r.step.y * i));
            ctx.lineTo(center.x + Math.round(step.x / 2), startSerifY + (r.step.y * i));
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = canvasObj.lineWidth;
        ctx.stroke();
    }
    drawLabels(ctx, canvasObj, color) {
        const center = canvasObj.center;
        const step = canvasObj.step;
        const r = canvasObj.r;

        ctx.font = canvasObj.font;
        // Для оси X
        ctx.strokeText('-R', center.x - (r.step.x * 2) - Math.round(step.x / 2), center.y - step.y);
        ctx.strokeText('-R/2', center.x - r.step.x - Math.round(step.x / 2), center.y - step.y);
        ctx.strokeText('R/2', center.x + r.step.x - Math.round(step.x / 2), center.y - step.y);
        ctx.strokeText('R', center.x + (r.step.x * 2) - Math.round(step.x / 4), center.y - step.y);
        ctx.strokeText('x', canvasObj.width - Math.round(step.x * 0.6), center.y - step.y);
        // Для оси Y
        ctx.strokeText('-R', center.x + step.x, center.y + (r.step.y * 2) + Math.round(step.y / 4));
        ctx.strokeText('-R/2', center.x + step.x, center.y + r.step.y + Math.round(step.y / 4));
        ctx.strokeText('R/2', center.x + step.x, center.y - r.step.y + Math.round(step.y / 4));
        ctx.strokeText('R', center.x + step.x, center.y - (r.step.y * 2) + Math.round(step.y / 4));
        ctx.strokeText('y', center.x + step.x, Math.round(step.y * 0.6));
    }
    drawDots(ctx, canvasObj, colorWhenDotIsHit, colorWhenDotIsNotHit) {
        let isHit, x, y, r;
        const center = canvasObj.center;
        const stepR = canvasObj.r.step;
        for (let i = 0; i < this.dotsManager.dots.length; i++) {
            isHit = this.dotsManager.dots[i].isHit;
            x = this.dotsManager.dots[i].x;
            y = this.dotsManager.dots[i].y;
            r = this.dotsManager.dots[i].r;
            ctx.beginPath();
            ctx.arc(
                center.x + ((x / r) * stepR.x * 2),
                center.y - ((y / r) * stepR.y * 2),
                Math.round(canvasObj.step.x / 4),
                0,
                Math.PI * 2
            );
            if (isHit) {
                ctx.fillStyle = colorWhenDotIsHit;
            } else {
                ctx.fillStyle = colorWhenDotIsNotHit;
            }
            ctx.fill();
        }
    }
}