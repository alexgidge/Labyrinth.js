class Enemy extends Character {
    constructor(world, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = characterType;
        this.State = CharacterStateType.Alive;
    }
    Tick() {
        //TODO: movement and actions
        //this.ProcessMovement();
    }
    ProcessMovement() {
        if (this.CanMove()) {
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
            this.Move(direction);
        }
    }
    ProcessActions() {
        //TODO: Check turns and move if possible

    }

}