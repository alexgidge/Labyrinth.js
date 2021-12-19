class TurnManager {
    constructor() {
        this.CurrentTurn = 0;
        this.CurrentTurnStartTime = 0;
        this.TurnFrequency = 250;//ms
        this.TurnChanged = new CustomEvent('TurnChanged', { detail: { turn: 0 } });
        document.addEventListener('TurnChanged', this.TurnChanged);
    }
    Tick(gameDelta) {
        var timeSinceLastTurn = gameDelta - this.CurrentTurnStartTime;
        if (timeSinceLastTurn > this.TurnFrequency) {
            this.NextTurn(gameDelta);
        }
    }
    NextTurn(gameDelta) {
        this.CurrentTurnStartTime = gameDelta;
        this.CurrentTurn++;
    }
}