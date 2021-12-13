class World {//TODO: Rename, refactor & separate populate from running logic.
    constructor(map) {
        this.currentMap = map;
        //TODO: Spawn etc.
        this.FillMap();
        this.SpawnMapCharacters();
    }
    FillMap() {
        this.grid = [];
        this.currentMap.Tiles.forEach(element => {
            this.SpawnTile(new Vector2(element.x, element.y), element.tileType);
        })
    }
    SpawnMapCharacters() {
        this.CharacterEntities = [];
        this.currentMap.SpawnPoints.forEach(element => {
            this.SpawnCharacter(element.CharacterType, element.X, element.Y)
        })
    }
    SpawnCharacter(characterType, _x, _y) {
        var character;
        switch (characterType) {
            case CharacterType.Player:
                character = new Player(this);
                break;
            case CharacterType.NPC:
                //TODO: NPC
                break;
        }
        var position = new Vector2(_x, _y);
        var transform = new WorldTransform(position)
        var entity = new WorldEntity(transform, character);
        if (this.CharacterEntities && this.CharacterEntities.length && this.CharacterEntities.length > 0) {
            this.CharacterEntities.push(entity);//TODO: GameObjects
        }
        else {
            this.CharacterEntities = [entity];
        }
    };
    SpawnTile(position, tileType) {
        var tile = new Tile(tileType);
        var transform = new WorldTransform(position);
        var entity = new WorldEntity(transform, tile);

        if (this.grid && this.grid.length && this.grid.length > 0) {
            this.grid.push(entity);//TODO: GameObjects
        }
        else {
            this.grid = [entity];
        }
    }
    GetPlayerEntity() {
        var returnCharacter;
        this.CharacterEntities.forEach(element => {
            if (element && element.Module && element.Module.Type && CharacterType.Compare(element.Module.Type, CharacterType.Player)) {
                returnCharacter = element.Module;
            }
        });
        return returnCharacter;
    }
    GetEntityAtTile(position) {
        this.CharacterEntities.forEach(element => {
            if (element && element.Transform.Position && element.Transform.Position.x && element.Transform.Position.y) {
                if (element.Transform.Position.x == position.x && element.Transform.Position.y == position.y) {
                    return element.Module;
                }
            }
            else {
                //TODO: Invalid character/position
            }
        });
    }
    GetEntity(characterID) {
        var returnEntity;
        this.CharacterEntities.forEach(element => {
            if (element && element.Module.Identifier == characterID) {
                returnEntity = element;
            }
        });
        return returnEntity;
    }
    GetTile(position) {
        var returnTile;
        this.grid.forEach(element => {
            if (element && element.Transform.Position.x == position.x && element.Transform.Position.y == position.y) {
                if (!element.Module.TileType) {
                    element.Module.TileType = TileType.Null;
                }
                returnTile = element;
            }
            else {
                //TODO: Invalid character/position
            }
        });
        return returnTile;
    }
    // GetCharacterPosition(identifier) {
    //     var returnPosition;
    //     if (this.CharacterEntities) {
    //         this.CharacterEntities.forEach(element => {
    //             if (element && element.Module && element.Module.Identifier && element.Module.Identifier == identifier) {
    //                 returnPosition = element.Position;
    //             }//TODO: Else invalid id
    //         });
    //     }
    //     return returnPosition;
    // }
    IsTileClear(position) {
        var returnVal;
        var tile = this.GetTile(position);
        if (!tile || tile.Module.TileType != TileType.Floor) {
            //TODO: Handle wall collision here or in Character?
            returnVal = false;
        } else if (this.GetEntityAtTile(position.x, position.y)) {
            //TODO: Character collision here or in Character?
            returnVal = false;
        }
        else {
            returnVal = true;
        }
        return returnVal;
    }
    MoveEntity(entity, position) {
        if (this.IsTileClear(position)) {
            //TODO: Move logic in engine?
            entity.Transform.Position.x = position.x;
            entity.Transform.Position.y = position.y;
            console.log("Entity moved: " + entity.Module.Identifier + " to [" + position.x, ", " + position.y + "]")
            return true;
        }
        return false;
    }
}