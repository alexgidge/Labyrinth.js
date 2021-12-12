class Character extends Identifiable {

    static CharacterCount;
    constructor(world) {
        super();
        this.World = world;
    }

    CharacterEvents(onCollision, onMove, onEnemyCollide) {
        this.onMove = onMove;
        this.onCollision = onCollision;
        this.onEnemyCollide = onEnemyCollide;
    }

    Move(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            console.log("Char move (" + direction.x + "," + direction.y + ")");

            var transform = this.World.GetCharacterTransform(this.Identifier);//TODO: Attach together in gameObject class
            var targetLocation = new Vector2(transform.Position.x + direction.x, transform.Position.y + direction.y);
            var targetTile = this.World.GetTile(targetLocation);
            var characterAtTarget = this.World.GetCharacterAtTile(targetLocation)
            if (characterAtTarget) {
                this.onEnemyCollide(characterAtTarget);//TODO: ColliderTypes
            } else if (targetTile && targetTile.TileType == TileType.Floor) {
                this.World.MoveCharacter(transform, targetLocation);
                this.onMove(targetTile);
            } else if (!targetTile || targetTile.TileType == TileType.Wall) {
                this.onCollision(targetTile);
            }

        }
    }
}

class CharacterType extends NamedRange {
    static Player = new CharacterType("PLAYER")
    static NPC = new CharacterType("NPC")
}

class CharacterStateType extends NamedRange {
    static Null = new CharacterStateType("NULL")
    static Alive = new CharacterStateType("ALIVE")
    static Dead = new CharacterStateType("DEAD")
}