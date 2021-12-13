class Player extends Character {
    constructor(world) {
        super(world);
        this.CharacterEvents(this.OnCollision, this.OnMove, this.OnEnemyCollide);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }

    OnCollision(tile) {
        if (!tile || !tile.TileType || tile.TileType == TileType.Wall || tile.TileType == TileType.Null) {
            var filename = AssetDataAccess.GetAudioAsset('BounceOffWall').filename;
            var location = "../Assets/Audio/" + filename;
            EngineAudio.PlaySound(location);
        }
    }

    OnMove(tile) {
        var filename = AssetDataAccess.GetAudioAsset('HumanFootsteps').filename;
        var location = "../Assets/Audio/" + filename;
        EngineAudio.PlaySound(location);//TODO: What am I even doing? This is so lazy.
    }

    OnEnemyCollide(characterAtTarget) {
        //TODO: Enemy collision
    }
}