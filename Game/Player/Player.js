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
        //TODO: refactor
        var filename = AssetDataAccess.GetAudioAsset('HumanFootsteps').filename;
        var location = "../Assets/Audio/" + filename;
        EngineAudio.PlaySound(location);
    }

    OnEnemyCollide(characterAtTarget) {
        //TODO: Enemy collision
    }

    OnAttackMiss(tileHit) {
        if (tileHit && tileHit.Module.TileType == TileType.Floor.Value) {
            var filename = AssetDataAccess.GetAudioAsset('SwingSword').filename;
            var location = "../Assets/Audio/" + filename;
            EngineAudio.PlaySound(location);
        }
        else {
            var filename = AssetDataAccess.GetAudioAsset('SwordHitWall').filename;
            var location = "../Assets/Audio/" + filename;
            EngineAudio.PlaySound(location, 0.5);
        }
    }

    OnAttackHit() {
        //TODO: Refactor audio loading into game/engine audio components.
        var filename = AssetDataAccess.GetAudioAsset('MonsterStabbed').filename;
        var location = "../Assets/Audio/" + filename;
        EngineAudio.PlaySound(location);
    }
}