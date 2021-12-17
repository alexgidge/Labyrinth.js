class Game {

    static Current;

    //TODO: Inject a logger for console.log
    //TODO: Inject all dependencies for clear separation between Web, Engine & Game

    constructor(tileMap, onRestart) {
        this.GameState = GameStateType.Null;
        this.TurnLength = 1;//Seconds per turn. Will max out at the engine's FPS
        this.CurrentTurn = 0;
        this.LastTurnTime = 0;
        this.TileMap = tileMap;
        this.TurnManager = new TurnManager();
        this.Restart = onRestart;
        this.gameOverAudio = 'GameOver';
        Game.Current = this;
    }

    InitialiseGame() {
        if (this.GameState == GameStateType.Null) {
            this.GameState = GameStateType.New;
            this.World = new World(this.TileMap);
            //TODO: grid.Spawn(Enemy spawnObjects)
        }//TODO: Else
    }

    GameStart() {
        if (GameStateType.Compare(this.GameState, GameStateType.New)) {
            this.GameState = GameStateType.Playing;
            //TODO: Start ambience FX 
            //TODO: Start game/story/scenario
            //TODO: Play intro scene/cinematic

        }//TODO: Else
    }

    OnEngineTick(gameDelta) {
        if (GameStateType.Compare(this.GameState, GameStateType.Playing)) {
            this.TurnManager.Tick(gameDelta);
            this.World.CharacterEntities.forEach(element => {
                if (element.Module.Type && element.Module.Type != CharacterType.Player.Value) {//TODO: boolean on character for playable? All I need here is to check if they're an npc
                    element.Module.Tick();
                }
            });
            //TODO: Where do I lock player input? Change game state to cinematic?
        }//TODO: Else
    }

    GameOver(gameState) {
        this.GameState = gameState;
        var player = this.World.GetPlayerEntity();
        EngineAudio.PlaySound(this.World, "GAME", this.gameOverAudio, 0.1, false, player.Transform.Position.x, player.Transform.Position.y);
        setTimeout(this.Restart, 3500);
    }

}

class GameStateType extends NamedRange {
    static Null = new NamedRange("NULL"); //Initialise
    static New = new NamedRange("NEW");//No input, run inits
    static Playing = new NamedRange("PLAYING");//Check input, run game tick
    static Dead = new NamedRange("DEAD");//Dead, tbc
    static Completed = new NamedRange("COMPLETED");//Completed, tbc
}
