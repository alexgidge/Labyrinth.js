class Player extends Character {
    constructor(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team) {
        super(world, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack, team);
        this.Type = CharacterType.Player.Value;
        this.State = CharacterStateType.Alive.Value;
    }
    //TODO: A player has player input? Not a game has player input. Would allow easier multiplayer
    //TODO: Could you get a different output source per player for splitear play
    OnEnemyCollide(targetLocation, characterAtTarget) {
        Engine.Current.EngineAudio.PlaySound(this.World, "CHARACTER", this.Type, this.bounceOffWallSound, false, targetLocation.x, targetLocation.y);//TODO: Change to different bounce sound. bump 
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you bumped into something living...");
    }

    OnWallBumped() {
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you bumped into something solid");
    }
    OnMoveCompleted(moveDirection) {
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you moved " + DirectionType.GetDirectionType(moveDirection));
    }

    OnAttackMissed() {
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you swung your sword through the air");
    }

    OnAttackHitWall() {
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("your sword hit a wall.");
    }

    OnDeath() {
        setTimeout(Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.BadColour));
        Game.Current.GameOver(GameStateType.Dead.Value);
    }
    OnSpawn(location) {
        Engine.Current.EngineAudio.PlaySound(this.World, "CHARACTER", this.Type, this.breathe, false, location.x, location.y);//TODO: Check X,Y & Z. 
        Engine.Current.EngineAudio.PlaySound(this.World, "CHARACTER", this.Type, this.drawWeapon, false, location.x, location.y - 1, - 1);
        Engine.Current.EngineGraphics.AddTextToDisplayQueue("you wake up in a dark stone passageway...");
        Engine.Current.EngineGraphics.ChangeGameBackground('black', 2000);
    }

    OnTakeDamage() {
        Engine.Current.EngineGraphics.ChangeGameBackground('red', 1000);
    }
}