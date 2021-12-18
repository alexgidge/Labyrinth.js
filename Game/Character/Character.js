class Character extends WorldModule {

    //TODO: Method for having different values for diff character types
    deathSound = 'CharacterDeath';
    damageTakenSound = 'DamageTakenAudio';
    damageGivenSound = 'CharacterDoesDamage';
    killDealtSound = 'CharacterDoesDamage';
    denied1Sound = 'Denied1';
    denied2Sound = 'Denied2';
    bounceOffWallSound = 'BounceOffWall';
    footStepsSound = 'CharacterFootsteps';
    swingWeaponSound = 'SwingSword';
    weaponClashedSound = 'SwordHitWall';
    spawnSound = 'SpawnSound';
    breathe = 'Breathe';
    drawWeapon = 'DrawWeapon';

    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super();
        this.World = world;
        //Defaults: overridden in extended classes
        this.Type = CharacterType.Null.Value;
        this.State = CharacterStateType.Null.Value;
        this.MinDamage = minDamage;
        this.MaxDamage = maxDamage;
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
        this.TurnsPerMove = turnsPerMove;
        this.TurnsPerAttack = turnsPerAttack;
        this.LastMoveTurn = 0;
        this.LastAttackTurn = 0;
        this.Items = [];
    }
    Spawn(location) {
        EngineAudio.PlaySound(this.World, this.Type, this.spawnSound, 0.35, false, location.x, location.y);
        this.OnSpawn(location);
    }
    Move(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            var entity = this.World.GetEntity(this.Identifier);
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            if (this.CanMove() == true) {
                this.LastMoveTurn = Game.Current.TurnManager.CurrentTurn;
                var entitiesAtTargetLoc = this.World.GetEntitiesAtTile(targetLocation);
                if (entitiesAtTargetLoc && entitiesAtTargetLoc.length > 0) {//TODO: Move logic?
                    entitiesAtTargetLoc.forEach(element => {
                        if (element.EntityType == EntityType.Character.Value && element.Module.State == CharacterStateType.Alive.Value) {//TODO: boolean on character for playable? All I need here is to check if they're an npc
                            this.OnEnemyCollide(targetLocation, element);//TODO: ColliderTypes
                        } else if (element.EntityType == EntityType.Tile.Value) {
                            if (element && element.Module.TileType == TileType.Floor.Value) {
                                this.World.MoveEntity(entity, targetLocation);
                                this.OnMove(targetLocation, element);
                            } else if (!element || element.Module.TileType == TileType.Null.Value || element.Module.TileType == TileType.Wall.Value) {//TODO: Refactor. I don't like this collision check being here
                                this.OnCollision(targetLocation, element.Module);
                            }
                        } else if (element.EntityType == EntityType.Item.Value) {
                            if (element.Module.Pickupable == true) {
                                if (element.Module.Pickup(this.Type, targetLocation)) {
                                    this.Items.push(element.Module);
                                }
                            }
                            else {
                                element.Module.Use(this.Type, targetLocation, this.Items);
                            }
                        }
                    });
                } else {
                    this.OnCollision(targetLocation, null);
                }
            }
            else {
                EngineAudio.PlaySound(this.World, this.Type, this.denied1Sound, 0.08, false, targetLocation.x, targetLocation.y);//TODO: constructor instead of each PlaySound() call
            }

        }
    }
    Attack(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            var entity = this.World.GetEntity(this.Identifier);//Get self //TODO: Refactor into property on class set at constructor;
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            if (this.CanAttack() == true) {
                this.LastAttackTurn = Game.Current.TurnManager.CurrentTurn;
                var entitiesAtTargetLoc = this.World.GetEntitiesAtTile(targetLocation);

                if (entitiesAtTargetLoc && entitiesAtTargetLoc.length > 0) {//TODO: Move logic?
                    entitiesAtTargetLoc.forEach(element => {
                        if (element.EntityType == EntityType.Character.Value && element.Module.State == CharacterStateType.Alive.Value) {
                            this.OnAttackHit(targetLocation);
                            element.Module.TakeDamage(targetLocation, this.CalculateDamage());
                        } else if (element.EntityType == EntityType.Tile.Value) {
                            this.OnAttackMiss(targetLocation, element.Module.TileType);
                        }
                    });
                } else {
                    this.OnAttackMiss(targetLocation, null);
                }

            }
            else {
                EngineAudio.PlaySound(this.World, this.Type, this.denied2Sound, 0.1, false, targetLocation.x, targetLocation.y);
            }
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
            EngineAudio.PlaySound(this.World, this.Type, this.damageTakenSound, 1, false, location.x, location.y);
            if (this.CurrentHealth <= 0) {
                this.Death(location);
            }
        }
    }

    Death(location) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            EngineAudio.PlaySound(this.World, this.Type, this.deathSound, 1, false, location.x, location.y);
            //TODO: Handle player death (fade all sounds & restart)
            this.State = CharacterStateType.Dead.Value;
            this.OnDeath();
        }
    }

    OnCollision(targetLocation, targetTile) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            if (!targetTile || !targetTile.TileType || targetTile.TileType == TileType.Wall || targetTile.TileType == TileType.Null) {
                EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, 0.6, false, targetLocation.x, targetLocation.y);
            }
        }
    }

    OnMove(targetLocation) {
        EngineAudio.PlaySound(this.World, this.Type, this.footStepsSound, 0.4, false, targetLocation.x, targetLocation.y);
    }

    OnAttackMiss(targetLocation, tileType) {
        if (tileType && tileType == TileType.Floor.Value) {
            EngineAudio.PlaySound(this.World, this.Type, this.swingWeaponSound, 0.3, false, targetLocation.x, targetLocation.y);
        }
        else {
            EngineAudio.PlaySound(this.World, this.Type, this.weaponClashedSound, 0.3, false, targetLocation.x, targetLocation.y);
        }
    }

    OnAttackHit(targetLocation, otherCharacter) {
        //TODO: Other character
        EngineAudio.PlaySound(this.World, this.Type, this.damageGivenSound, 0.4, false, targetLocation.x, targetLocation.y);
    }

    OnAttackKilled(targetLocation, otherCharacter) {
        EngineAudio.PlaySound(this.World, this.Type, this.killDealtSound, 0.6, false, targetLocation.x, targetLocation.y);
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