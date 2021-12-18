class Player extends Character {
    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        this.Type = CharacterType.Player.Value;
        this.State = CharacterStateType.Alive.Value;
    }
    //TODO: A player has player input? Not a game has player input. Would allow easier multiplayer
    //TODO: Could you get a different output source per player for splitear play
    OnEnemyCollide(targetLocation, characterAtTarget) {
        EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, 1, false, targetLocation.x, targetLocation.y);//TODO: Change to different bounce sound. bump 
    }

    OnDeath() {
        Game.Current.GameOver(GameStateType.Dead.Value);
    }
    OnSpawn(location) {
        EngineAudio.PlaySound(this.World, this.Type, this.breathe, 0.5, false, location.x, location.y);//TODO: Check X,Y & Z. 
        EngineAudio.PlaySound(this.World, this.Type, this.drawWeapon, 0.7, false, location.x, location.y - 1, - 1);
    }
}