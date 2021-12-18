class World {//TODO: Rename, refactor & separate populate from running logic.
    constructor(map) {
        this.currentMap = map;
        //TODO: Spawn etc.
        this.Entities = [];
        this.FillMap();
        this.SpawnMapCharacters();
        this.SpawnMapItems();
    }

    FillMap() {
        //TODO: Tiled supportable
        this.currentMap.Room.Tiles.forEach(element => {
            this.SpawnTile(new Vector2(element.x, element.y), element.TileType);
        })
    }
    SpawnMapCharacters() {
        this.currentMap.Room.Spawns.forEach(element => {
            this.SpawnCharacter(element.CharacterType, element.x, element.y, element.minDamage, element.maxDamage, element.maxHealth, element.turnsPerMove, element.turnsPerAttack);
        })
    }
    SpawnMapItems() {
        this.currentMap.Room.Items.forEach(element => {
            this.SpawnItem(element.ItemType, element.ItemStartState, element.Pickupable, element.Lockable, element.UnlockedByItem, element.x, element.y);
        })
    }

    SpawnCharacter(characterType, _x, _y, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack) {
        var position = new Vector2(_x, _y);
        var character;
        if (characterType == CharacterType.Player.Value) {
            character = new Player(this, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);
        }
        else {
            character = new Enemy(this, characterType, minDamage, maxDamage, maxHealth, turnsPerMove, turnsPerAttack);//TODO: Load different enemy types
        }
        var transform = new WorldTransform(position)
        var entity = new WorldEntity(transform, character, EntityType.Character.Value);
        if (this.Entities && this.Entities.length && this.Entities.length > 0) {
            this.Entities.push(entity);//TODO: GameObjects
        }
        else {
            this.Entities = [entity];
        }

        character.Spawn(position);
        console.log("Spawned " + characterType + " at (" + entity.Transform.Position.x + "," + entity.Transform.Position.y + ")");
    };
    SpawnItem(itemType, itemState, pickupable, lockable, unlockedby, _x, _y) {
        var position = new Vector2(_x, _y);
        var item = new Item(this, itemType, itemState, pickupable, lockable, unlockedby);
        var transform = new WorldTransform(position)
        var entity = new WorldEntity(transform, item, EntityType.Item.Value);
        if (this.Entities && this.Entities.length && this.Entities.length > 0) {
            this.Entities.push(entity);//TODO: GameObjects
        }
        else {
            this.Entities = [entity];
        }

        item.Spawn(position);
        console.log("Spawned " + itemType + " at (" + entity.Transform.Position.x + "," + entity.Transform.Position.y + ")");
    };
    SpawnTile(position, tileType) {
        var tile = new Tile(tileType);
        var transform = new WorldTransform(position);
        var entity = new WorldEntity(transform, tile, EntityType.Tile.Value);

        //TODO: Add to entities method
        if (this.Entities && this.Entities.length && this.Entities.length > 0) {
            this.Entities.push(entity);//TODO: GameObjects
        }
        else {
            this.Entities = [entity];
        }
    }
    GetPlayerEntity() {
        var returnCharacter;
        this.Entities.forEach(element => {
            if (element.EntityType == EntityType.Character.Value && element && element.Module && element.Module.Type && element.Module.Type == CharacterType.Player.Value) {
                returnCharacter = element;
            }
        });
        return returnCharacter;
    }
    FindDistanceToPlayer(location) {
        var player = this.GetPlayerEntity();
        return Vector2.Distance(location, player.Transform.Position);
    }
    GetEntitiesAtTile(position) {//TODO: at position? Filter to incl/excl tile, item and char
        var returnEntity = [];
        this.Entities.forEach(element => {
            if (element && element.Transform.Position) {
                if (element.Transform.Position.x == position.x && element.Transform.Position.y == position.y) {
                    returnEntity.push(element);
                }
            }
        });
        return returnEntity;
    }
    GetEntity(characterID) {
        var returnEntity;
        this.Entities.forEach(element => {
            if (element && element.Module.Identifier == characterID) {
                if (CharacterStateType.Compare(element.Module.State, CharacterStateType.Alive)) {//TODO: Character specific?
                    returnEntity = element;
                }
            }
        });
        return returnEntity;
    }
    GetTile(position) {
        var returnTile;
        this.Entities.forEach(element => {
            if (element.EntityType == EntityType.Tile.Value && element && element.Transform.Position.x == position.x && element.Transform.Position.y == position.y) {
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
    CanMoveToTile(position) {
        var tileValid = false;
        var tileEmpty = true;
        var entities = this.GetEntitiesAtTile(position);
        entities.forEach(element => {
            if (element.EntityType == EntityType.Tile.Value) {
                if (element.Module.TileType == TileType.Floor.Value) {
                    tileValid = true;
                }
            }
            else if (element.EntityType == EntityType.Character.Value) {
                //TODO: Remove dead from array?
                if (element.Module.State != CharacterStateType.Dead.Value) {
                    tileEmpty = false;
                }
            }
            else if (element.EntityType == EntityType.Item.Value && element.Module.ItemState != ItemState.Locked.Value) {

            }
            else {
                tileEmpty = false;
            }
        });

        return tileValid && tileEmpty;
    }
    MoveEntity(entity, position) {
        if (this.CanMoveToTile(position)) {
            //TODO: Move logic in engine?
            entity.Transform.Position.x = position.x;
            entity.Transform.Position.y = position.y;
            console.log("Entity moved: " + entity.Module.Identifier + " to [" + position.x, ", " + position.y + "]")
            return true;
        }
        return false;
    }
}