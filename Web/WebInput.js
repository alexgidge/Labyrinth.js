//TODO: Inject game input

class WebInput {


    constructor(_engineInput, controls) {
        this.engineInput = _engineInput;
        this.Controls = controls;
    }
    OnButtonDown(e) {
        //if (e.keyCode != 27) {//Escape
        var inputType = this.GetInputTypeByKeyCode(e.keyCode);
        this.engineInput.InputPressed(inputType);
        //}
    }
    GetInputTypeByKeyCode(keycode) {
        var inputType = InputType.NullValue.Value;
        this.Controls.forEach(element => {
            if (element.key == keycode) {
                inputType = element.action;
            }
        });
        return inputType;
    }
}