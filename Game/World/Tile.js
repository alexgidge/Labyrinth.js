class Tile extends WorldTile {
    constructor(position, tileType) {
        super(position);
        this.TileType = tileType;
    }
}

class TileType extends NamedRange {//TODO: Extend to custom tile types with custom sounds etc.
    static Null = new TileType("NULL_TILE");
    static Floor = new TileType("FLOOR_TILE");
    static Wall = new TileType("WALL_TILE");
}