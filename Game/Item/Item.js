class Item extends WorldModule {
    useEnabled = 'USE';
    useDisabled = 'USEDISABLED';
    useLocked = 'USELOCKED';
    pickupSound = 'PICKUP';
    unlockSound = 'UNLOCK';
    idleSound = 'IDLE';


    constructor(world, itemType, itemState, pickupable, lockable, unlockedby) {
        super();
        this.ItemType = itemType;
        this.ItemState = itemState;
        this.Pickupable = pickupable;
        this.Lockable = lockable;
        this.UnlockedByItem = unlockedby;
        this.World = world;
        this.IdleTurns = 50;
        this.lastIdleTurn = 0;
    }
    Spawn() {

    }
    Tick() {
        if (this.lastIdleTurn + this.IdleTurns < Game.Current.TurnManager.CurrentTurn) {
            var thisEntity = this.World.GetEntity(this.Identifier);
            this.Idle(thisEntity);
            this.lastIdleTurn = Game.Current.TurnManager.CurrentTurn;
        }
    }
    Unlock(items) {
        var keyFound = false;
        if (this.ItemState == ItemState.Locked.Value) {
            items.forEach(element => {
                if (element.ItemType == this.UnlockedByItem) {
                    keyFound = true;
                }
            });
        }

        if (keyFound == true) {
            this.ItemState = ItemState.Enabled.Value;
            return true;
        }
        else {
            return false;
        }
    }
    Use(characterType, location, items) {
        if (characterType == CharacterType.Player.Value) {
            if (this.ItemState == ItemState.Enabled.Value) {
                Game.Current.GameOver(GameStateType.Completed.Value);//TODO: Different item types/events/triggers
            } else if (this.ItemState == ItemState.Locked.Value) {
                if (this.Unlock(items) == true) {
                    Engine.Current.EngineAudio.PlaySound(this.World, "ITEM", this.ItemType, this.unlockSound, false, location.x, location.y);
                    Engine.Current.EngineGraphics.AddTextToDisplayQueue(this.ItemType + " unlocked");
                    Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.GoodColour, 250);
                } else {
                    Engine.Current.EngineAudio.PlaySound(this.World, "ITEM", this.ItemType, this.useLocked, false, location.x, location.y);
                    Engine.Current.EngineGraphics.AddTextToDisplayQueue(this.ItemType + " is locked");
                    Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.WarningColour, 1000);
                }
            } else if (this.ItemState == ItemState.Disabled.Value) {
                Engine.Current.EngineAudio.PlaySound(this.World, "ITEM", this.ItemType, this.useDisabled, false, location.x, location.y);
                Engine.Current.EngineGraphics.AddTextToDisplayQueue(this.ItemType + " cannot be used.");
                Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.WarningColour, 1000);
            }
        }
    }

    Pickup(characterType, location) {
        if (characterType == CharacterType.Player.Value) {
            if (this.ItemState == ItemState.Enabled.Value && this.Pickupable == true) {
                this.ItemState = ItemState.Disabled.Value;
                Engine.Current.EngineAudio.PlaySound(this.World, "ITEM", this.ItemType, this.pickupSound, false, location.x, location.y);
                Engine.Current.EngineGraphics.AddTextToDisplayQueue(this.ItemType + " picked up");
                Engine.Current.EngineGraphics.ChangeGameBackground(Engine.Current.EngineGraphics.InfoColour, 2000);
                return true;
            } else {
                return false;
            }
        }
    }

    Idle(thisEntity) {
        if (this.ItemState != ItemState.Disabled.Value) {
            var location = new Vector2(thisEntity.Transform.Position.x, thisEntity.Transform.Position.y);
            Engine.Current.EngineAudio.PlaySound(this.World, "ITEM", this.ItemType, this.idleSound, false, location.x, location.y);
        }
    }

}

class ItemState extends NamedRange {
    static Locked = new NamedRange("LOCKED");
    static Enabled = new NamedRange("ENABLED");
    static Disabled = new NamedRange("DISABLED");
}

class ItemType extends NamedRange {//TODO: Does NamedRange.js even have a use?
    static DOOR = new NamedRange("DOOR");
    static KEY = new NamedRange("KEY");
}