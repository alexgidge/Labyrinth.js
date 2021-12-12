var TickFrequency = 100; //100ms per tick or 10 ticks per second (effectively 10fps)
var tick = 0;
var startTime = Date.now();
var lastTick = Date.now();

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

function Tick() {
    //TODO: Handle delta
    var delta = (Date.now() - lastTick) / TickFrequency;
    lastTick = Date.now();
    tick++;
    console.log("tick: " + tick + " delta: " + delta + " time: " + Date.now());
}
