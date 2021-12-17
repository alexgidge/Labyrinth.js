class Player extends Character {
    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = CharacterType.Player.Value;
        this.State = CharacterStateType.Alive;
    }
    //TODO: A player has player input? Not a game has player input. Would allow easier multiplayer
    //TODO: Could you get a different output source per player for splitear play
    OnEnemyCollide(targetLocation, characterAtTarget) {
        EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, 1, false, targetLocation.x, targetLocation.y);//TODO: Change to different bounce sound. bump ?
    }
}