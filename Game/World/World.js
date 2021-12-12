class World {
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
        this.CharacterTransforms = [];
        this.currentMap.SpawnPoints.forEach(element => {
            this.SpawnCharacter(element.CharacterType, element.X, element.Y)
        })
    }
    SpawnTile(position, tileType) {
        var tile = new Tile(position, tileType);

        if (this.grid && this.grid.length && this.grid.length > 0) {
            this.grid.push(tile);//TODO: GameObjects
        }
        else {
            this.grid = [tile];
        }
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
        var transform = new CharacterTransform(position, character);
        if (this.CharacterTransforms && this.CharacterTransforms.length && this.CharacterTransforms.length > 0) {
            this.CharacterTransforms.push(transform);//TODO: GameObjects
        }
        else {
            this.CharacterTransforms = [transform];
        }
    };
    GetPlayerCharacter() {
        var returnCharacter;
        this.CharacterTransforms.forEach(element => {
            if (element && element.Character && element.Character.Type && CharacterType.Compare(element.Character.Type, CharacterType.Player)) {
                returnCharacter = element.Character;
            }
        });
        return returnCharacter;
    }
    GetCharacterAtTile(position) {
        this.CharacterTransforms.forEach(element => {
            if (element && element.Position && element.Position.x && element.Position.y) {
                if (element.Position.x == position.x && element.Position.y == position.y) {
                    return element.Character;
                }
            }
            else {
                //TODO: Invalid character/position
            }
        });
    }
    GetCharacter(characterID) {
        this.CharacterTransforms.forEach(element => {
            if (element && element.Identifier == characterID) {
                return element.Character;
            }
            else {
                //TODO: Not found
            }
        });
    }
    GetCharacterTransform(characterID) {
        var returnTransform;
        this.CharacterTransforms.forEach(element => {
            if (element && element.Character.Identifier == characterID) {
                returnTransform = element;
            }
            else {
                //TODO: Not found
            }
        });
        return returnTransform;
    }
    GetTile(position) {
        var returnTile;
        this.grid.forEach(element => {
            if (element && element.Position.x == position.x && element.Position.y == position.y) {
                if (!element.TileType) {
                    element.TileType = TileType.Null;
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
    //     if (this.CharacterTransforms) {
    //         this.CharacterTransforms.forEach(element => {
    //             if (element && element.Character && element.Character.Identifier && element.Character.Identifier == identifier) {
    //                 returnPosition = element.Position;
    //             }//TODO: Else invalid id
    //         });
    //     }
    //     return returnPosition;
    // }
    IsTileClear(position) {
        var tile = this.GetTile(position);
        if (!tile || tile.TileType != TileType.Floor) {
            //TODO: Handle wall collision here or in Character?
            return false;
        } else if (this.GetCharacterAtTile(position.x, position.y)) {
            //TODO: Character collision here or in Character?
            return false;
        }
        else {
            return true;
        }
    }
    MoveCharacter(CharacterTransform, position) {
        if (this.IsTileClear(position)) {
            CharacterTransform.Position.x = position.x;
            CharacterTransform.Position.y = position.y;
            console.log("Character moved: " + Character.Identifier + " to [" + position.x, ", " + position.y + "]")
            return true;
        }

        return false;
    }
}