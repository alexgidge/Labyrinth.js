class Enemy extends Character {
    constructor(world, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = characterType;
        this.State = CharacterStateType.Alive;
    }
    Tick() {
        this.ProcessMovement();
    }
    ProcessMovement() {
        if (this.CanMove()) {


            var direction = Vector2.GetRandomDirection();

            var entity = this.World.GetEntity(this.Identifier);
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            //var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);//TODO: Player collision? here or in Move();

            if (this.World.IsTileClear(targetLocation)) {
                this.Move(direction);//TODO: Some form of pathfinding & basic AI
            }
        }
    }
    ProcessAttacks() {
        //TODO: Check turns and attack if possible

    }

}