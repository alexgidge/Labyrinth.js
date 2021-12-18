class Item extends WorldModule {
    useEnabled = 'UseEnabled';
    useDisabled = 'UseDisabled';
    pickupSound = 'Pickup';
    unlockSound = 'Unlock';

    constructor(world, itemType, itemState, pickupable, lockable, unlockedby) {
        super();
        this.ItemType = itemType;
        this.ItemState = itemState;
        this.Pickupable = pickupable;
        this.Lockable = lockable;
        this.UnlockedByItem = unlockedby;
        this.World = world;
    }
    Spawn() {

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
    Use(location, items) {
        if (this.ItemState == ItemState.Enabled.Value) {
            EngineAudio.PlaySound(this.World, this.ItemType, this.useEnabled, 1, false, location.x, location.y);
            Game.Current.GameOver(GameStateType.Completed.Value);
        } else if (this.ItemState == ItemState.Locked.Value) {
            if (this.Unlock(items) == true) {
                EngineAudio.PlaySound(this.World, this.ItemType, this.unlockSound, 1, false, location.x, location.y);
            } else {
                EngineAudio.PlaySound(this.World, this.ItemType, this.useDisabled, 1, false, location.x, location.y);
            }
        } else if (this.ItemState == ItemState.Disabled.Value) {
            EngineAudio.PlaySound(this.World, this.ItemType, this.useDisabled, 1, false, location.x, location.y);
        }
    }

    Pickup(location) {
        if (this.ItemState == ItemState.Enabled.Value && this.Pickupable == true) {
            this.ItemState = ItemState.Disabled.Value;
            EngineAudio.PlaySound(this.World, this.ItemType, this.pickupSound, 1, false, location.x, location.y);
            return true;
        } else {
            return false;
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