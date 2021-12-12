class Identifiable {
    static IdentifierCount = 0;

    constructor() {
        this.Identifier = Identifiable.IdentifierCount++;
    }
    compare(left, right) {
        return left && right && left.Identifier && right.Identifier && left.Identifier == right.Identifier;
    }
}