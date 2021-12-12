class Character extends Identifiable {

    static CharacterCount;

    Move(direction) {
        if (CharacterStateType.Compare(this.CharacterState, CharacterStateType.Alive)) {
            //TODO: Call grid and attempt to move
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