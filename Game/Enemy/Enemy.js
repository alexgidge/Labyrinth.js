class Enemy extends Character {
    constructor(world, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team);
        this.Type = characterType;
        this.State = CharacterStateType.Alive.Value;
    }
    Tick() {
        if (this.State == CharacterStateType.Alive.Value) {
            var thisEntity = this.World.GetEntity(this.Identifier);
            this.ProcessMovement(thisEntity);
            this.ProcessAttacks();
            this.CheckIfCanSeePlayer(thisEntity.Transform.Position);
        }
    }
    ProcessMovement(thisEntity) {
        if (this.CanMove() == true) {
            var direction = Vector2.GetRandomDirection();
            var targetLocation = new Vector2(thisEntity.Transform.Position.x + direction.x, thisEntity.Transform.Position.y + direction.y);

            if (this.World.CanMoveToTile(targetLocation) == true) {
                this.Move(direction);//TODO: Some form of pathfinding & basic AI
            }
            //TODO: Else attack player?
        }
    }
    ProcessAttacks() {
        //TODO: Check turns and attack if possible
        if (this.CanAttack() == true) {
            var direction = Vector2.GetRandomDirection();
            this.Attack(direction);
        }
    }
    OnEnemyCollide(targetLocation, characterAtTarget) {
        console.log("AI attempted to move into an occupied square. Should be okay but here's a log just incase");
    }//Should never happen for enemy AI unless player moves before AI moves in the same turn. Or async threads running on multiple AIs

    OnDeath() {
        //TODO: Handle eneny deaths
        Engine.Current.EngineGraphics.AddTextToDisplayQueue(this.Type + " passed away.");
    }
    OnSpawn() {
        //TODO: Handle enemy spawn?
    }
}