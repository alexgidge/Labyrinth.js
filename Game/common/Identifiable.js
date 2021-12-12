class Identifiable {
    static IdentifierCount = 0;

    constructor() {
        this.Identifier = IdentifierCount++;
    }
    compare(left, right) {
        return left && right && left.Identifier && right.Identifier && left.Identifier == right.Identifier;
    }
}