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
        if (this.CanMove()) {
            this.LastMoveTurn = Game.Current.TurnManager.CurrentTurn;
            if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
                //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
                var entity = this.World.GetEntity(this.Identifier);
                var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
                var targetTile = this.World.GetTile(targetLocation);
                var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

                if (entityAtTargetLoc) {//TODO: Move logic?
                    this.OnEnemyCollide(entityAtTargetLoc);//TODO: ColliderTypes
                } else if (targetTile && targetTile.Module.TileType == TileType.Floor.Value) {
                    this.World.MoveEntity(entity, targetLocation);
                    this.OnMove(targetTile);
                } else if (!targetTile || targetTile.TileType == TileType.Null.Value || targetTile.TileType == TileType.Wall.Value) {//TODO: Refactor. I don't like this collision check being here
                    this.OnCollision(targetTile);
                }

            }
        }
        else {
            EngineAudio.PlaySound(this.denied1Sound, 0.6);//TODO: Volume
        }
    }
    Attack(direction) {
        if (this.CanAttack()) {
            this.LastAttackTurn = Game.Current.TurnManager.CurrentTurn;
            if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
                //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
                var entity = this.World.GetEntity(this.Identifier);//Get self //TODO: Refactor into property on class set at constructor;
                var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
                var targetTile = this.World.GetTile(targetLocation);
                var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

                if (entityAtTargetLoc) {
                    this.OnAttackHit();
                    entityAtTargetLoc.Module.TakeDamage(this.CalculateDamage());
                } else {
                    this.OnAttackMiss(targetTile);
                }

            }
        }
        else {
            EngineAudio.PlaySound(this.denied2Sound, 0.6);//TODO: Volume
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

    TakeDamage(damage) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            this.CurrentHealth -= damage;
            if (this.CurrentHealth <= 0) {
                this.Death();
            }
            else {
                EngineAudio.PlaySound(this.damageTakenSound);
            }
        }
    }

    Death() {
        this.State = CharacterStateType.Dead;
        EngineAudio.PlaySound(this.deathSound);
    }



    OnCollision(tile) {
        if (!tile || !tile.TileType || tile.TileType == TileType.Wall || tile.TileType == TileType.Null) {
            EngineAudio.PlaySound(this.bounceOffWallSound);
        }
    }

    OnMove() {
        EngineAudio.PlaySound(this.footStepsSound);
    }

    OnEnemyCollide(characterAtTarget) {
        //TODO: Enemy collision
    }

    OnAttackMiss(tileHit) {
        if (tileHit && tileHit.Module.TileType == TileType.Floor.Value) {
            EngineAudio.PlaySound(this.swingWeaponSound);
        }
        else {
            EngineAudio.PlaySound(this.weaponClashedSound, 0.5);
        }
    }

    OnAttackHit(otherCharacter) {
        EngineAudio.PlaySound(this.swingWeaponSound);
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