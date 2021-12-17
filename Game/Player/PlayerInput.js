class PlayerInput {
    constructor(player) {
        this.Player = player;
    }

    InputPressed(inputType) {
        console.log(inputType.Value);
        switch (inputType) {
            case InputType.MoveForward:
                this.Player.Module.Move(new Vector2(0, 1));
                break;
            case InputType.MoveLeft:
                this.Player.Module.Move(new Vector2(-1, 0));
                break;
            case InputType.MoveBack:
                this.Player.Module.Move(new Vector2(0, -1));
                break;
            case InputType.MoveRight:
                this.Player.Module.Move(new Vector2(1, 0));
                break;
            case InputType.ActionForward:
                this.Player.Module.Attack(new Vector2(0, 1));
                break;
            case InputType.ActionLeft:
                this.Player.Module.Attack(new Vector2(-1, 0));
                break;
            case InputType.ActionBack:
                this.Player.Module.Attack(new Vector2(0, -1));
                break;
            case InputType.ActionRight:
                this.Player.Module.Attack(new Vector2(1, 0));
                break;
        }
    }
}
