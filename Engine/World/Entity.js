class WorldEntity extends Identifiable {

    constructor(transform, module, entityType) {
        super();
        this.Transform = transform;
        this.Module = module;//TODO: Multiple modules
        this.EntityType = entityType;
    }

}

class EntityType extends NamedRange {
    static Character = new NamedRange('CHARACTER');
    static Item = new NamedRange('ITEM');
    static Tile = new NamedRange('TILE');
}