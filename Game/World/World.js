class World {
    constructor(map) {
        this.currentMap = map;
        //TODO: Spawn etc.
        this.CharacterTransforms = new [];
        this.SpawnMapCharacters()
    }
    SpawnMapCharacters() {
        this.currentMap.Characters.forEach(element => {
            this.SpawnCharacter(element.CharacterType, element.X, element.Y)
        })
    }
    SpawnCharacter(characterType, _x, _y) {
        var character;
        switch (characterType) {
            case CharacterType.Player:
                character = new Player();
                break;
            case CharacterType.NPC:
                //TODO: NPC
                break;
        }
        var position = new Vector2(_x, _y);
        this.CharacterTransforms += new CharacterTransform(position, character);//TODO: GameObjects
    };
    GetCharacterAtTile(_x, _y) {
        this.CharacterTransforms.forEach(element => {
            if (element && element.Position && element.Position.x && element.Position.y) {
                if (element.Position.x == _x && element.Position.y == _y) {
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
        this.CharacterTransforms.forEach(element => {
            if (element && element.Identifier == characterID) {
                return element;
            }
            else {
                //TODO: Not found
            }
        });
    }
    GetTile(_x, _y) {
        this.currentMap.Tiles.forEach(element => {
            if (element && element.x && element.y) {
                if (!element.TileType) {
                    element.TileType = TileType.Null;
                }
                return element;
            }
            else {
                //TODO: Invalid character/position
            }
        })
    }
    CanMoveCharacter(newX, newY) {
        var tile = this.GetTile(newX, newY);
        if (!tile || tile.TileType != TileType.Floor) {
            //TODO: Handle wall collision here or in Character?
            return false;
        } else if (this.GetCharacterAtTile(newX, newY)) {
            //TODO: Character collision here or in Character?
            return false;
        }
        else {
            return true;
        }
    }
    MoveCharacter(CharacterTransform, newX, newY) {
        if (this.CanMoveCharacter(newX, newY)) {
            CharacterTransform.Position.x = newX;
            CharacterTransform.Position.y = newY;
            console.log("Character moved: " + Character.Identifier + " to [" + newX, ", " + newY + "]")
            return true;
        }

        return false;
    }
}