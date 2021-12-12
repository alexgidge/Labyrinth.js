//TODO: Inject game input

class WebInput {
    constructor(_engineInput) {
        this.engineInput = _engineInput;
    }
    OnButtonDown(e) {
        if (e.keyCode == 87) {//w
            this.engineInput.InputPressed(InputType.MoveForward);
        } else if (e.keyCode == 65) {//a
            this.engineInput.InputPressed(InputType.MoveLeft);
        } else if (e.keyCode == 83) {//s
            this.engineInput.InputPressed(InputType.MoveBack);
        } else if (e.keyCode == 68) {//d
            this.engineInput.InputPressed(InputType.MoveRight);
        } else if (e.keyCode == 38) {//up arrow
            this.engineInput.InputPressed(InputType.ActionForward);
        } else if (e.keyCode == 37) {//left arrow
            this.engineInput.InputPressed(InputType.ActionLeft);
        } else if (e.keyCode == 40) {//down arrow
            this.engineInput.InputPressed(InputType.ActionBack);
        } else if (e.keyCode == 39) {//right arrow
            this.engineInput.InputPressed(InputType.ActionRight);
        }
        else if (e.keyCode == 27) {//Escape
            this.canvas.blur();//TODO: Move?
        }
    }
}