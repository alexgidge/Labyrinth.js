class Engine {
    static Current;

    constructor(_game, _tickFrequency) {
        Engine.Current = this;
        this.tickFrequency = _tickFrequency
        this.game = _game;
        this.tick = 0;
        this.lastTick = Date.now();
        this.startTime = Date.now();
    }

    StartGame() {
        //TODO: generate map & narrative scenes
        this.game.Start();
    }

    Tick() {//TODO: Queue ticks? 
        //TODO: Handle delta
        this.tick++;
        this.lastTick = Date.now();
        var delta = (this.lastTick - this.startTime) / this.tickFrequency;
        this.game.OnEngineTick(delta);//TODO: Injected game tick/events
        console.log("tick: " + this.tick + " delta: " + delta + " time: " + this.lastTick);
    }
}