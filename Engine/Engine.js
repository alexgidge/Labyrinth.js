class Engine {
    static Current;

    constructor(_game, engineGraphics, engineAudio, _tickFrequency) {
        Engine.Current = this;
        this.tickFrequency = _tickFrequency;
        this.EngineAudio = engineAudio;
        this.EngineGraphics = engineGraphics;
        this.Game = _game;
        this.tick = 0;
        this.lastTick = Date.now();
        this.startTime = Date.now();
    }

    StartGame() {
        //TODO: generate map & narrative scenes
        this.Game.Start();
    }

    Tick() {//TODO: Queue ticks? 
        //TODO: Handle delta
        this.tick++;
        this.lastTick = Date.now();
        var delta = (this.lastTick - this.startTime) / this.tickFrequency;
        this.Game.OnEngineTick(delta);//TODO: Injected game tick/events
        //TODO: Graphics/audio ticks
    }
}