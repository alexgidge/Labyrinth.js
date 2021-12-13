class Player extends Character {
    constructor(world) {
        super(world);
        this.CharacterEvents(this.OnCollision, this.OnMove, this.OnEnemyCollide);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }

    OnCollision(tile) {
        AudioManager.PlaySound();
    }

    OnMove(tile) {
        AudioManager.PlayMoveSound();
    }

    OnEnemyCollide(characterAtTarget) {
        AudioManager.PlaySound();
    }
}