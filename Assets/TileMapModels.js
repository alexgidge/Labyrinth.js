class TileMap {
    constructor(tiles, spawnPoints) {
        this.Tiles = tiles;
        this.SpawnPoints = spawnPoints;
    }
}

class TileBlueprint {
    constructor(x, y, tileType) {
        this.x = x;
        this.y = y;
        this.tileType = tileType;
    }
}

class SpawnPoint {
    constructor(x, y, characterType) {
        this.X = x;
        this.Y = y;
        this.CharacterType = characterType;
    }
}