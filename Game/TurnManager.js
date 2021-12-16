class TurnManager {
    constructor() {
        this.CurrentTurn = 0;
        this.CurrentTurnStartTime = 0;
        this.TurnFrequency = 0.250;//ms
        this.TurnChanged = new CustomEvent('TurnChanged', { detail: { turn: 0 } });
        document.addEventListener('TurnChanged', this.TurnChanged);
    }
    Tick(gameDelta) {
        var timeSinceLastTurn = gameDelta - this.CurrentTurnStartTime;
        if (timeSinceLastTurn > this.TurnFrequency) {
            this.NextTurn(gameDelta);
            //TODO: Process enemy movement
            //TODO: Turn noise?
        }
    }
    NextTurn(gameDelta) {
        this.CurrentTurnStartTime = gameDelta;
        this.CurrentTurn++;
    }
}