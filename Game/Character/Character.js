class Character extends WorldModule {

    //TODO: Method for having different values for diff character types
    deathSound = 'MonsterDeath';
    damageTakenSound = 'MonsterRoar';
    denied1Sound = 'Denied1';
    denied2Sound = 'Denied2';
    bounceOffWallSound = 'BounceOffWall';
    footStepsSound = 'HumanFootsteps';
    swingWeaponSound = 'SwingSword';
    weaponClashedSound = 'SwordHitWall';

    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super();
        this.World = world;
        //Defaults: overridden in extended classes
        this.Type = CharacterType.Null;
        this.State = CharacterStateType.Null;
        this.MinDamage = minDamage;
        this.MaxDamage = maxDamage;
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
        this.TurnsPerMove = turnsPerMove;
        this.TurnsPerAttack = turnsPerAttack;
        this.LastMoveTurn = 0;
        this.LastAttackTurn = 0;
    }
    Move(direction) {
        var entity = this.World.GetEntity(this.Identifier);
        var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
        if (this.CanMove()) {
            this.LastMoveTurn = Game.Current.TurnManager.CurrentTurn;
            if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
                //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
                var targetTile = this.World.GetTile(targetLocation);
                var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

                //TODO: One method to get entity at location
                if (entityAtTargetLoc) {//TODO: Move logic?
                    this.OnEnemyCollide(targetLocation, entityAtTargetLoc);//TODO: ColliderTypes
                } else if (targetTile && targetTile.Module.TileType == TileType.Floor.Value) {
                    this.World.MoveEntity(entity, targetLocation);
                    this.OnMove(targetLocation, targetTile);
                } else if (!targetTile || targetTile.TileType == TileType.Null.Value || targetTile.TileType == TileType.Wall.Value) {//TODO: Refactor. I don't like this collision check being here
                    this.OnCollision(targetLocation, targetTile);
                }

            }
        }
        else {
            EngineAudio.PlaySound(this.World, this.Type, this.denied1Sound, 0.3, false, targetLocation.x, targetLocation.y);//TODO: constructor instead of each PlaySound() call
        }
    }
    Attack(direction) {
        var entity = this.World.GetEntity(this.Identifier);//Get self //TODO: Refactor into property on class set at constructor;
        var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
        if (this.CanAttack()) {
            this.LastAttackTurn = Game.Current.TurnManager.CurrentTurn;
            if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
                //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
                var targetTile = this.World.GetTile(targetLocation);
                var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

                if (entityAtTargetLoc) {
                    this.OnAttackHit(targetLocation);
                    entityAtTargetLoc.Module.TakeDamage(targetLocation, this.CalculateDamage());
                } else {
                    this.OnAttackMiss(targetLocation, targetTile);
                }

            }
        }
        else {
            EngineAudio.PlaySound(this.World, this.Type, this.denied2Sound, 0.3, false, targetLocation.x, targetLocation.y);
        }
    }
    CanMove() {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            return (this.LastMoveTurn + this.TurnsPerMove < Game.Current.TurnManager.CurrentTurn);
        }
    }
    CanAttack() {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            return (this.LastAttackTurn + this.TurnsPerAttack < Game.Current.TurnManager.CurrentTurn);
        }
    }
    CalculateDamage() {
        return Math.floor((Math.random() * this.MaxDamage) + this.MinDamage);
    }

    TakeDamage(location, damage) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            this.CurrentHealth -= damage;
            if (this.CurrentHealth <= 0) {
                this.Death(location);
            }
            else {
                EngineAudio.PlaySound(this.World, this.Type, this.damageTakenSound, 1, false, location.x, location.y);
            }
        }
    }

    Death(location) {
        this.State = CharacterStateType.Dead;
        EngineAudio.PlaySound(this.World, this.Type, this.deathSound, 1, false, location.x, location.y);
    }



    OnCollision(targetLocation, targetTile) {
        if (!targetTile || !targetTile.TileType || targetTile.TileType == TileType.Wall || targetTile.TileType == TileType.Null) {
            EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, 1, false, targetLocation.x, targetLocation.y);
        }
    }

    OnMove(targetLocation) {
        EngineAudio.PlaySound(this.World, this.Type, this.footStepsSound, 0.5, false, targetLocation.x, targetLocation.y);
    }

    OnEnemyCollide(characterAtTarget) {
        //TODO: Enemy collision
    }

    OnAttackMiss(targetLocation, tileHit) {
        if (tileHit && tileHit.Module.TileType == TileType.Floor.Value) {
            EngineAudio.PlaySound(this.World, this.Type, this.swingWeaponSound, 1, false, targetLocation.x, targetLocation.y);
        }
        else {
            EngineAudio.PlaySound(this.World, this.Type, this.weaponClashedSound, 0.3, false, targetLocation.x, targetLocation.y);
        }
    }

    OnAttackHit(targetLocation, otherCharacter) {
        //TODO: Other character
        EngineAudio.PlaySound(this.World, this.Type, this.weaponClashedSound, 0.3, false, targetLocation.x, targetLocation.y);//TODO: Weapon clashed? Why did I put that in hit?
    }



}

class CharacterType extends NamedRange {
    static Null = new CharacterType("NULL-CHARACTER");
    static Player = new CharacterType("PLAYER");
    static Eyeman = new CharacterType("EYE");
}

class CharacterStateType extends NamedRange {
    static Null = new CharacterStateType("NULL");
    static Alive = new CharacterStateType("ALIVE");
    static Dead = new CharacterStateType("DEAD");
}