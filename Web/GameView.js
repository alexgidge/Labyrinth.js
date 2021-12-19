const TickFrequency = 10; //100ms per tick or 10 ticks per second. The game can then handle each tick as it needs

var GameCanvas;//TODO: Move to graphics
var CurrentPlayer;
var CurrentEngine;

$(function () {
    StartUp();
    $('#btnRestart').click(function (evt) {
        location.reload();
    });
});
async function StartUp() {
    var urlParams = new URLSearchParams(window.location.search);
    var mapName = urlParams.get('ID');
    console.log("--------------------------INITIALISING---------------------------");
    GameCanvas = initCanvas();
    SetGameBackground('#130b13');
    ResizeCanvas();
    await InitialiseGame(mapName);//TODO: Level select
    $('#canvGameArea').keyup(CanvasKeydown);
    console.log("--------------------------STARTING---------------------------");
    await StartGame();
}
async function InitialiseGame(mapName) {
    var engineGraphics = new EngineGraphics();
    var engineAudio = new EngineAudio();

    var map = await AssetDataAccess.GetMap(mapName);//TODO: Param passed from level select.
    var game = new Game(map, function () { location.reload(); });
    game.InitialiseGame();

    CurrentEngine = new Engine(game, engineGraphics, engineAudio, TickFrequency);
}

async function StartGame() {


    CurrentEngine.Game.GameStart();

    CurrentPlayer = CurrentEngine.Game.World.GetPlayerEntity();

    var playerInput = new PlayerInput(CurrentPlayer)
    var engineInput = new EngineInput(playerInput);

    var controls = await GameControls.GetControls();
    input = new WebInput(engineInput, controls);


    setInterval(EngineTick, TickFrequency);//10 ticks per second
}

function CanvasKeydown(e) {
    input.OnButtonDown(e)
}

function EngineTick() {
    CurrentEngine.Tick();
    DisplayText();
    UpdateBackground();
}

function DisplayText() {
    var nextText = CurrentEngine.EngineGraphics.GetNextDisplayText();
    if (nextText) {
        //TODO: Add the text instead of replace
        $('#divGameText').text(nextText);
    }
}

function UpdateBackground() {
    var background = CurrentEngine.EngineGraphics.BackgroundColour;
    if (background) {
        SetGameBackground(background);
    }
}

function initCanvas() {
    canvas = $('#canvGameArea')[0];

    $(window).bind("resize", function () {
        ResizeCanvas(canvas);
    });

    //$(canvas)[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
    //$(canvas)[0].mozRequestFullScreen(); //Firefox
    return canvas;
}

function SetGameBackground(colour) {
    var ctx = GameCanvas.getContext("2d");
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, GameCanvas.width, GameCanvas.height);
}

function ResizeCanvas() {
    var w = $(window).width();
    var h = $(window).height();

    $(GameCanvas).css("width", w + "px");
    $(GameCanvas).css("height", h + "px");
}