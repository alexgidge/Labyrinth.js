class Player extends Character {
    constructor(world) {
        super(world);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }
    //TODO: A player has player input? Not a game has player input. Would allow easier multiplayer
    //TODO: Could you get a different output source per player for splitear play
}