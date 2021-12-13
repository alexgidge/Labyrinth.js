class Character extends WorldModule {
    constructor(world) {
        super();
        this.World = world;
        //Defaults: overridden in extended classes
        this.Type = CharacterType.Null;
        this.State = CharacterStateType.Null;
    }

    CharacterEvents(onCollision, onMove, onEnemyCollide) {//TODO: Better method than param injection for events? CharacterEvents that checks the IDs then queries the World's character list to call relevant methods?
        this.onMove = onMove;
        this.onCollision = onCollision;
        this.onEnemyCollide = onEnemyCollide;
    }

    Move(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {

            //TODO: Refactor both tiles & characters as game objects then generic logic for loading all game objects in a location (Tile and Character incl.)
            var entity = this.World.GetEntity(this.Identifier);
            var targetLocation = new Vector2(entity.Transform.Position.x + direction.x, entity.Transform.Position.y + direction.y);
            var targetTile = this.World.GetTile(targetLocation);
            var entityAtTargetLoc = this.World.GetEntityAtTile(targetLocation);

            if (entityAtTargetLoc) {
                this.onEnemyCollide(entityAtTargetLoc);//TODO: ColliderTypes
            } else if (targetTile && targetTile.Module.TileType == TileType.Floor) {
                this.World.MoveEntity(entity, targetLocation);
                this.onMove(targetTile);
            } else if (!targetTile || targetTile.TileType == TileType.Null || targetTile.TileType == TileType.Wall) {//TODO: Refactor. I don't like this collision check being here
                this.onCollision(targetTile);
            }

        }
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