class Character extends WorldModule {
    constructor(world) {
        super();
        this.World = world;
        //Defaults: overridden in extended classes
        this.Type = CharacterType.Null;
        this.State = CharacterStateType.Null;
    }
    Move(direction) {
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
    Attack(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {

            //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
            var entity = this.World.GetEntity(this.Identifier);//Get self //TODO: Refactor into property on class set at constructor;
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            var targetTile = this.World.GetTile(targetLocation);
            var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

            if (entityAtTargetLoc) {
                this.OnAttackHit();
                //TODO: Damage other entity
            } else {
                this.OnAttackMiss(targetTile);
            }

        }
    }



    OnCollision(tile) {
        if (!tile || !tile.TileType || tile.TileType == TileType.Wall || tile.TileType == TileType.Null) {
            EngineAudio.PlaySound('BounceOffWall');
        }
    }

    OnMove() {
        EngineAudio.PlaySound('HumanFootsteps');
    }

    OnEnemyCollide(characterAtTarget) {
        //TODO: Enemy collision
    }

    OnAttackMiss(tileHit) {
        if (tileHit && tileHit.Module.TileType == TileType.Floor.Value) {
            EngineAudio.PlaySound('SwingSword');
        }
        else {
            EngineAudio.PlaySound('SwordHitWall', 0.5);
        }
    }

    OnAttackHit() {
        EngineAudio.PlaySound('MonsterStabbed');
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