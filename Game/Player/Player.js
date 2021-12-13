class Player extends Character {
    constructor(world) {
        super(world);
        this.CharacterEvents(this.OnCollision, this.OnMove, this.OnEnemyCollide);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }

    OnCollision(tile) {
        EngineAudio.PlaySound();
    }

    OnMove(tile) {
        EngineAudio.PlayMoveSound();
    }

    OnEnemyCollide(characterAtTarget) {
        EngineAudio.PlaySound();
    }
}