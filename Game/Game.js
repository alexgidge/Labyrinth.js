class Game {

    //TODO: Inject a logger for console.log
    //TODO: Inject all dependencies for clear separation between Web, Engine & Game

    constructor() {
        this.GameState = GameStateType.Null;
        this.TurnLength = 1;//Seconds per turn. Will max out at the engine's FPS
        this.CurrentTurn = 0;
        this.LastTurnTime = 0;
    }

    OnEngineTick(_delta, _gameDelta) {//called by engine on each engine tick e.g. 1fps would call every 60 seconds
        GameTick(_delta, _gameDelta);//TODO: Scene/Story deltas
    }

    InitialiseGame() {
        if (this.GameState == GameStateType.Null) {
            this.GameState = GameStateType.New;
            Maps.GetMaps();
            this.World = new World()
            //TODO: grid.Spawn(Enemy spawnObjects)
        }//TODO: Else
    }

    GameStart() {
        if (GameState.Compare(this.GameState, GameStateType.New)) {
            this.GameState = GameStateType.Playing;
            //TODO: Start ambience FX 
            //TODO: Start game/story/scenario
            //TODO: Play intro scene/cinematic

        }//TODO: Else
    }

    OnEngineTick(gameDelta) {
        if (GameStateType.Compare(this.GameState, GameStateType.Playing)) {
            //TODO: Add tick to queue of ticks
            processTurns(gameDelta);
            //TODO: Where do I lock player input? Change game state to cinematic?

        }//TODO: Else
    }

    processTurns(gameDelta) {
        var timeSinceLastTurn = gameDelta - lastTurnTime;
        if (timeSinceLastTurn > TurnLength) {
            lastTurnTime = gameDelta;
            CurrentTurn++;
            //TODO: Process enemy movement
            //TODO: Turn noise?
            console.log("Turn: " + CurrentTurn);
        }
    }
}

class GameStateType extends NamedRange {
    static Null = new NamedRange("NULL"); //Initialise
    static New = new NamedRange("NEW");//No input, run inits
    static Playing = new NamedRange("PLAYING");//Check input, run game tick
    static Dead = new NamedRange("DEAD");//Dead, tbc
    static Completed = new NamedRange("COMPLETED");//Completed, tbc
}
