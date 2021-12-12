class Character extends Identifiable {

    static CharacterCount;
    constructor(world) {
        super();
        this.World = world;
    }

    Move(direction) {
        if (CharacterStateType.Compare(this.State, CharacterStateType.Alive)) {
            console.log("Char move (" + direction.x + "," + direction.y + ")");

            var transform = this.World.GetCharacterTransform(this.Identifier);
            var targetLocation = new Vector2(transform.Position.x + direction.x, transform.Position.y + direction.y)
            if (this.World.IsTileClear(targetLocation)) {
                this.World.MoveCharacter(transform, targetLocation);
            }
            //TODO: Handle collision
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