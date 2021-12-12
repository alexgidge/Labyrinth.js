class Player extends Character {
    constructor(world) {
        super(world);
        this.CharacterEvents(this.OnCollision, this.OnMove, this.OnEnemyCollide);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }

    OnCollision(tile) {
        AudioManager.PlaySound();//TODO: Spatial
    }

    OnMove(tile) {
        AudioManager.PlayMoveSound();//TODO: Spatial
    }

    OnEnemyCollide(characterAtTarget) {
        AudioManager.PlaySound();//TODO: Spatial
    }
}