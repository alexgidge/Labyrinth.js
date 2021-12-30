class EngineGraphics {
    constructor() {
        this.TextQueue = ['...'];
        //TODO: Add to JSON file
        this.DefaultColour = '#130b13';
        this.GoodColour = '#279A21';
        this.GameWinColour = '#edf6ff';
        this.InfoColour = '#1E5D78';
        this.WarningColour = '#BEA229';
        this.BadColour = '#BE4029';
        this.BackgroundColour = this.DefaultColour;
    }
    AddTextToDisplayQueue(text) {
        if (Game.Current.GameState == GameStateType.Playing.Value) {
            this.TextQueue.push(text);
        }
        //TODO: Text formatting
        //TODO: Text type/priority to pin/remove old text
        //TODO: Spatial to player, only display if < 3 squares away / scale font by distance
    }
    GetNextDisplayText() {
        return this.TextQueue.shift();
    }
    ChangeGameBackground(colour, timeoutLength) {
        if (timeoutLength && timeoutLength > 0) {
            setTimeout(function () { Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.DefaultColour); }, timeoutLength);
            //TODO: Colour queue to not cancel eachother out
        }
        this.BackgroundColour = colour;
    }
}
