class Tile extends Identifiable {
    constructor(position, value) {
        super();
        this.Position = position;
        this.TileType = value;
    }
}

class TileType extends NamedRange {//TODO: Extend to custom tile types with custom sounds etc.
    static Null = new TileType("NULL_TILE");
    static Floor = new TileType("FLOOR_TILE");
    static Wall = new TileType("WALL_TILE");
}