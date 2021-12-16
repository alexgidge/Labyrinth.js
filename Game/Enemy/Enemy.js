class Enemy extends Character {
    constructor(world, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = characterType;
        this.State = CharacterStateType.Alive;
    }
    Tick() {
        //TODO: movement and actions

    }
}