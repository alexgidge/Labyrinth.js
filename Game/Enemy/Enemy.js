class Enemy extends Character {
    constructor(world, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = characterType;
        this.State = CharacterStateType.Alive;
    }
    Tick() {
        this.ProcessMovement();
        this.ProcessAttacks();
    }
    ProcessMovement() {
        if (this.CanMove() == true) {


            var direction = Vector2.GetRandomDirection();

            var entity = this.World.GetEntity(this.Identifier);
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);//TODO: Player collision? here or in Move();

            if (this.World.IsTileClear(targetLocation) == true) {
                this.Move(direction);//TODO: Some form of pathfinding & basic AI
            }
            //TODO: Else attack player?
        }
    }
    ProcessAttacks() {
        //TODO: Check turns and attack if possible
        if (this.CanAttack() == true) {
            var direction = Vector2.GetRandomDirection();
            var entity = this.World.GetEntity(this.Identifier);
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            var entityAtLocation = this.World.GetEntityAtTile(targetLocation);
            this.Attack(direction);
        }
    }
    OnEnemyCollide(targetLocation, characterAtTarget) {
        console.log("AI attempted to move into an occupied square. Should be okay but here's a log just incase");
    }//Should never happen for enemy AI unless player moves before AI moves in the same turn. Or async threads running on multiple AIs

    OnDeath() {
        //TODO: Handle enenmy deaths
    }
}