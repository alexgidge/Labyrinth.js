class Vector2 {
    constructor(x, y) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
    }
    AddVector(vector2Add) {
        this.x += vector2Add.x;
        this.y += vector2Add.y;
    }
    static GetRandomDirection() {
        var rand = GetRandomIntFromInterval(1, 4);
        var direction = new Vector2(0, 0);
        switch (rand) {
            case 1:
                direction = new Vector2(0, 1);
                break;
            case 2:
                direction = new Vector2(1, 0);
                break;
            case 3:
                direction = new Vector2(0, -1);
                break;
            case 4:
                direction = new Vector2(-1, 0);
                break;
        }
        return direction;
    }
}

function GetRandomIntFromInterval(min, max) {//Inclusive
    return Math.floor(Math.random() * (max - min + 1) + min)
}