class Vector2 {
    constructor(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }
    AddVector(vector2Add) {
        this.x += vector2Add.x;
        this.y += vector2Add.y;
    }
}

function GetRandomIntFromInterval(min, max) {//Inclusive
    return Math.floor(Math.random() * (max - min + 1) + min)
}