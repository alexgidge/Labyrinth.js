class EngineInput {
    constructor(_playerInput) {
        this.PlayerInput = _playerInput;
    }
    InputPressed(inputType, held) {
        if (inputType == InputType.Escape) {
            //TODO: Canvas.blur()
        } else {
            this.PlayerInput.InputPressed(inputType, held)
        }
    }
}

//TODO: JSON File with web keycodes connected.
//TODO: Controller input HTML5 Gamepad
//TODO: Touch? Other?
class InputType extends NamedRange {
    static RestartGame = new InputType('RESTART');

    static MoveForward = new InputType('MOVE-UP');
    static MoveLeft = new InputType('MOVE-LEFT');
    static MoveRight = new InputType('MOVE-RIGHT');
    static MoveBack = new InputType('MOVE-DOWN');

    static ActionForward = new InputType('ACTION-UP');
    static ActionLeft = new InputType('ACTION-LEFT');
    static ActionRight = new InputType('ACTION-RIGHT');
    static ActionBack = new InputType('ACTION-DOWN');

    static Escape = new InputType('ESCAPE');

}