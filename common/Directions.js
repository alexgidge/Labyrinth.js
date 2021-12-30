class DirectionType extends NamedRange {
    static GetDirectionType(vector2) {
        var direction = "";
        if (vector2.y == 1) {
            direction += "NORTH ";
        } else
            if (vector2.y == -1) {
                direction += "SOUTH ";
            }

        if (vector2.x == -1) {
            direction += "WEST";
        } else if (vector2.x == 1) {
            direction += "EAST";
        }
        return direction;
    }
}