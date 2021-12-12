class Player extends Character {
    constructor(world) {
        super(world);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }
}