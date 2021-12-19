class EngineGraphics {
    constructor() {
        this.TextQueue = ['...'];
        this.BackgroundColor = '#130b13';
    }
    AddTextToDisplayQueue(text) {
        this.TextQueue.push(text);
        //TODO: Text formatting
        //TODO: Text type/priority to pin/remove old text
        //TODO: Spatial to player, only display if < 3 squares away / scale font by distance
    }
    GetNextDisplayText() {
        return this.TextQueue.shift();
    }
    ChangeGameBackground(colour) {
        this.BackgroundColor = colour;
    }
}
