class WorldEntity extends Identifiable {

    constructor(transform, module) {
        super();
        this.Transform = transform;
        this.Module = module;//TODO: Multiple modules
    }

}