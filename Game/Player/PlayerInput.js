class PlayerInput {
    constructor(player) {
        this.Player = player;
    }

    InputPressed(inputType) {
        console.log(inputType.Value);
        switch (inputType) {
            case InputType.MoveForward:
                this.Player.Move(new Vector2(0, 1));
                break;
            case InputType.MoveLeft:
                this.Player.Move(new Vector2(-1, 0));
                break;
            case InputType.MoveBack:
                this.Player.Move(new Vector2(0, -1));
                break;
            case InputType.MoveRight:
                this.Player.Move(new Vector2(1, 0));
                break;
            case InputType.ActionForward:
                this.Player.Action(new Vector2(0, 1));
                break;
            case InputType.ActionLeft:
                this.Player.Action(new Vector2(-1, 0));
                break;
            case InputType.ActionBack:
                this.Player.Action(new Vector2(0, -1));
                break;
            case InputType.ActionRight:
                this.Player.Action(new Vector2(-1, 0));
                break;
        }
    }
}
