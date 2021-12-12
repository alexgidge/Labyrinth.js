//TODO: Refactor. I don't like this method, even when JSON is working.
class TileMaps {

    static MapsFile = 'maps.json'
    GetMaps() {
        console.log(this.MapsFile);

        var tileBlueprints = [
            new TileBlueprint(0, 0, TileType.Floor),
            new TileBlueprint(0, 1, TileType.Floor),
            new TileBlueprint(0, 2, TileType.Floor),
            new TileBlueprint(0, 3, TileType.Floor),
            new TileBlueprint(0, 4, TileType.Floor)
        ];
        var spawnPoints = [
            new SpawnPoint(0, 0, CharacterType.Player)
        ];

        var tileMap = new TileMap(tileBlueprints, spawnPoints);

        return tileMap;

        //TODO: store in a file
        $.getJSON(TileMaps.MapsFile, function (data) {
            return data;
        });

        $.getJSON(TileMaps.MapsFile, function (json) {
            console.log(json); // this will show the info it in firebug console
        });
    }

    GetRandomMap() {
        //TODO: Data persistence methods
        return this.GetMaps();
        //TODO: Random after json storage
        if (mapList) {
            var count = mapList.count;
            var x = Math.ceil(Math.floor(Math.random() * 100), count);//100 max maps
            return mapList[x];
        }
    }
}

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