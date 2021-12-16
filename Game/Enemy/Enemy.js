class Enemy extends Character {
    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = CharacterType.Enemy;
        this.State = CharacterStateType.Alive;
    }
    Tick() {
        //TODO: Turn management here or on Character?
        this.Movement?.Tick();
        this.Actions?.Tick();
        this.Move(CalculateNextMove());
    }
    MakeNextMove() {

    }
}