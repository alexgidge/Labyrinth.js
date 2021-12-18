class Item extends WorldModule {
    constructor(itemType, itemState, pickupable, lockable, unlockedby) {
        super();
        this.ItemType = itemType;
        this.ItemState = itemState;
        this.Pickupable = pickupable;
        this.Lockable = lockable;
        this.UnlockedByItem = unlockedby;
    }

    Spawn() {

    }

    Unlock() {
        if (this.ItemState == ItemState.Locked.Value) {
            this.ItemState = ItemState.Enabled.Value;
            //TODO: Play unlocked sound
        }
    }

    Lock() {
        if (this.ItemState == ItemState.Locked.Value && this.Lockable == true) {
            this.ItemState = ItemState.Locked.Value;
            //TODO: Play locked sound
        }
    }

    Use() {
        if (this.ItemState == ItemState.Enabled.Value) {
            //TODO: Play sound
            //TODO: If end game portal then change game state
        } else if (this.ItemState == ItemState.Locked.Value) {
            //TODO: If player has key then unlock
            //TODO: Play locked sound
        } else if (this.ItemState == ItemState.Disabled.Value) {
            //TODO: Play disabled sound & handle use disabled?
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