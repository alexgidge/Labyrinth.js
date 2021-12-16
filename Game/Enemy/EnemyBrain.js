class EnemyBrain {//TODO: Better enemy AI

    constructor(world) {
        super(world);
        this.CharacterEvents(this.OnCollision, this.OnMove, this.OnEnemyCollide);
        this.Type = CharacterType.Player;
        this.State = CharacterStateType.Alive;
    }

    OnMove() {

    }

}