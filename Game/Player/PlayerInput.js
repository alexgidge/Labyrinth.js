class PlayerInput {
    constructor(player) {
        this.Player = player;
    }

    InputPressed(inputType, held) {
        //console.log(inputType.Value);
        switch (inputType) {
            case InputType.MoveForward.Value:
                this.Player.Module.Move(new Vector2(0, 1), held);
                break;
            case InputType.MoveLeft.Value:
                this.Player.Module.Move(new Vector2(-1, 0), held);
                break;
            case InputType.MoveBack.Value:
                this.Player.Module.Move(new Vector2(0, -1), held);
                break;
            case InputType.MoveRight.Value:
                this.Player.Module.Move(new Vector2(1, 0), held);
                break;
            case InputType.ActionForward.Value:
                this.Player.Module.Attack(new Vector2(0, 1), held);
                break;
            case InputType.ActionLeft.Value:
                this.Player.Module.Attack(new Vector2(-1, 0), held);
                break;
            case InputType.ActionBack.Value:
                this.Player.Module.Attack(new Vector2(0, -1), held);
                break;
            case InputType.ActionRight.Value:
                this.Player.Module.Attack(new Vector2(1, 0), held);
                break;
        }
    }
}
