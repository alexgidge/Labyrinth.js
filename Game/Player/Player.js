class Player extends Character {
    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team);
        this.Type = CharacterType.Player.Value;
        this.State = CharacterStateType.Alive.Value;
    }
    //TODO: A player has player input? Not a game has player input. Would allow easier multiplayer
    //TODO: Could you get a different output source per player for splitear play
    OnEnemyCollide(targetLocation, characterAtTarget) {
        Engine.Current.EngineAudio.PlaySound(this.World, this.Type, this.bounceOffWallSound, false, targetLocation.x, targetLocation.y);//TODO: Change to different bounce sound. bump 
    }

    OnDeath() {
        Game.Current.GameOver(GameStateType.Dead.Value);
    }
    OnSpawn(location) {
        Engine.Current.EngineAudio.PlaySound(this.World, this.Type, this.breathe, false, location.x, location.y);//TODO: Check X,Y & Z. 
        Engine.Current.EngineAudio.PlaySound(this.World, this.Type, this.drawWeapon, false, location.x, location.y - 1, - 1);
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you woke up in a cold wet room...");
    }
}