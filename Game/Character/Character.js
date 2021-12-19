class Character extends WorldModule {

    //TODO: Method for having different values for diff character types
    deathSound = 'DEATH';
    damageTakenSound = 'DAMAGE-TAKEN';
    damageGivenSound = 'DAMAGE-DEALT';
    killDealtSound = 'KILL-DEALT';
    denied1Sound = 'ATTACK-DENIED';
    denied2Sound = 'WALK-DENIED';
    bounceOffWallSound = 'WALK-BUMP';
    footStepsSound = 'WALK';
    swingWeaponSound = 'ATTACK';
    weaponClashedSound = 'ATTACK-BUMP';
    spawnSound = 'SPAWN';
    breathe = 'EMOTE';
    drawWeapon = 'DRAW-WEAPON';
    Emote = 'EMOTE';

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
        this.TurnsPerPlayerSpottedEmote = 100;//TODO: Setting per character
        this.LastMoveTurn = 0;
        this.LastAttackTurn = 0;
        this.LastEmoteTurn = 0;
        this.Items = [];
    }
    Spawn(location) {
        EngineAudio.PlaySound(this.World, this.Type, this.spawnSound, false, location.x, location.y);
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
                EngineAudio.PlaySound(this.World, this.Type, this.denied1Sound, false, targetLocation.x, targetLocation.y);//TODO: constructor instead of each PlaySound() call
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
                EngineAudio.PlaySound(this.World, this.Type, this.denied2Sound, false, targetLocation.x, targetLocation.y);
            }
        }
    }
    CheckIfCanSeePlayer(location) {
        if (this.Type != CharacterType.Player.Value) {
            var distance = this.World.FindDistanceToPlayer(location);
            if (distance < 3 && (this.LastEmoteTurn + this.TurnsPerPlayerSpottedEmote < Game.Current.TurnManager.CurrentTurn)) {
                this.LastEmoteTurn = Game.Current.TurnManager.CurrentTurn;
                EngineAudio.PlaySound(this.World, this.Type, this.Emote, false, location.x, location.y);
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
            EngineAudio.PlaySound(this.World, this.Type, this.damageTakenSound, false, location.x, location.y);
            if (this.CurrentHealth <= 0) {
                this.Death(location);
            }
        }
    }

    Death(location) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            EngineAudio.PlaySound(this.World, this.Type, this.deathSound, false, location.x, location.y);
            //TODO: Handle player death (fade all sounds & restart)
            this.State = CharacterStateType.Dead.Value;
            this.OnDeath();
        }
    }

    OnCollision(targetLocation, targetTile) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            if (!targetTile || !targetTile.TileType || targetTile.TileType == TileType.Wall || targetTile.TileType == TileType.Null) {
                EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, false, targetLocation.x, targetLocation.y);
            }
        }
    }

    OnMove(newLocation) {
        EngineAudio.PlaySound(this.World, this.Type, this.footStepsSound, false, newLocation.x, newLocation.y);
    }

    OnAttackMiss(targetLocation, tileType) {
        if (tileType && tileType == TileType.Floor.Value) {
            EngineAudio.PlaySound(this.World, this.Type, this.swingWeaponSound, false, targetLocation.x, targetLocation.y);
        }
        else {
            EngineAudio.PlaySound(this.World, this.Type, this.weaponClashedSound, false, targetLocation.x, targetLocation.y);
        }
    }

    OnAttackHit(targetLocation, otherCharacter) {
        //TODO: Other character
        EngineAudio.PlaySound(this.World, this.Type, this.damageGivenSound, false, targetLocation.x, targetLocation.y);
    }

    OnAttackKilled(targetLocation, otherCharacter) {
        EngineAudio.PlaySound(this.World, this.Type, this.killDealtSound, false, targetLocation.x, targetLocation.y);
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