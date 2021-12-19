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
        var gameDelta = (Date.now() - this.startTime);
        var tickDelta = (Date.now() - this.lastTick);
        if (gameDelta > this.tickFrequency) {
            this.lastTick = Date.now();
            this.Game.OnEngineTick(gameDelta, tickDelta);//TODO: Injected game tick/events
            //TODO: Graphics/audio ticks
        }
    }
}