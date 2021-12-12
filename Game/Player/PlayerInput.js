class PlayerInput {
    InputPressed(inputType) {
        console.log(inputType.Value);
        switch (inputType) {
            case InputType.MoveForward:
                Player.Current.Move(new Vector2(0, 1));
                break;
            case InputType.MoveLeft:
                Player.Current.Move(new Vector2(-1, 0));
                break;
            case InputType.MoveBack:
                Player.Current.Move(new Vector2(0, -1));
                break;
            case InputType.MoveRight:
                Player.Current.Move(new Vector2(1, 0));
                break;
            case InputType.ActionForward:
                Player.Current.Action(new Vector2(0, 1));
                break;
            case InputType.ActionLeft:
                Player.Current.Action(new Vector2(-1, 0));
                break;
            case InputType.ActionBack:
                Player.Current.Action(new Vector2(0, -1));
                break;
            case InputType.ActionRight:
                Player.Current.Action(new Vector2(-1, 0));
                break;
        }
    }
}
