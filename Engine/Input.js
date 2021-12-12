class EngineInput {
    constructor(_playerInput) {
        this.PlayerInput = _playerInput;
    }
    InputPressed(inputType) {
        if (inputType == InputType.Escape) {
            //TODO: Canvas.blur()
        } else {
            this.PlayerInput.InputPressed(inputType)
        }
    }
}

class InputType extends NamedRange {//TODO: Load from map json & link with web keycodes
    static MoveForward = new InputType('MOVE-FORWARD');
    static MoveLeft = new InputType('MOVE-LEFT');
    static MoveRight = new InputType('MOVE-RIGHT');
    static MoveBack = new InputType('MOVE-BACK');

    static ActionForward = new InputType('ACTION-FORWARD');
    static ActionLeft = new InputType('ACTION-LEFT');
    static ActionRight = new InputType('ACTION-RIGHT');
    static ActionBack = new InputType('ACTION-BACK');

    static Escape = new InputType('ESCAPE');

}