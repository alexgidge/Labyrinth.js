class NamedRange {

    static NullValue = new NamedRange("NULL-VALUE")

    static Compare(left, right) {
        return left && right && (left.Value == right.Value || left == right.Value || left.Value == right) && left.Value != NamedRange.NullValue;
    }
    constructor(value) {
        this.Value = value
    }
}