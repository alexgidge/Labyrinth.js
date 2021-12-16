class Enemy extends Character {
    constructor() {
        this.Brain = new EnemyBrain();
    }
    Tick() {
        //TODO: Turn management here or on Character?
        this.Movement?.Tick();
        this.Actions?.Tick();
    }


}