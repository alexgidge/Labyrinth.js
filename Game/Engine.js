var timer = 0;

var CurrentText = "Labyrinth Game" //TODO: Text queue & display

function Start() {
    //TODO: generate map & narrative scenes
    //TODO: Game.Initialise
}

function Update(delta)//Called on tick/update/timer from main
{
    //Game.tick(delta);
    timer += delta;
}

function PlaySound(SoundFile, volume = 1, looping = false)//TODO: Sound library instead of passing file path
{
    //TODO: Validation
    //TODO: Howler.play audio
    alert("Play audio: " + SoundFile)
}

function SetScreenText(text) {
    CurrentText = text;
}