const TickFrequency = 10; //100ms per tick or 10 ticks per second. The game can then handle each tick as it needs

var GameCanvas;//TODO: Move to graphics
var CurrentPlayer;
var CurrentEngine;
var Input;

$(function () {
    StartUp();
    $(this).keydown(CanvasKeydown);
    $(this).keyup(CanvasKeyPress);
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
    $('#canvGameArea').keydown(CanvasKeyPress);

    console.log("--------------------------STARTING---------------------------");
    setTimeout(StartGame, 1500);
    $('#btnOnScreenControls').click(function () {
        $('#divOnscreenControls').show();
        $(this).hide();
        $('#btnOnScreenControlsHide').show();
    });
}

async function InitialiseGame(mapName) {
    var map = await MapService.GetMap(mapName);//TODO: Param passed from level select.
    var game = new Game(map, function () { location.reload(); });
    game.InitialiseGame();

    var engineGraphics = new EngineGraphics();
    var engineAudio = new EngineAudio();

    CurrentEngine = new Engine(game, engineGraphics, engineAudio, TickFrequency);
}

async function StartGame() {
    CurrentEngine.Game.GameStart();

    CurrentPlayer = CurrentEngine.Game.World.GetPlayerEntity();

    var playerInput = new PlayerInput(CurrentPlayer)
    var engineInput = new EngineInput(playerInput);

    var controls = await ControlsService.LoadControlMappings();
    Input = new WebInput(engineInput, controls);

    SetupButtons(Input);

    setInterval(EngineTick, TickFrequency);//10 ticks per second
    $('#canvGameArea').focus();
}

function SetupButtons(WebInput) {
    $('#btnRestart').click(function (evt) {
        Input.OnInputPressed(InputType.RestartGame.Value);
    });
    $('#btnW').click(function () {
        Input.OnInputPressed(InputType.MoveForward.Value);
    });
    $('#btnA').click(function () {
        Input.OnInputPressed(InputType.MoveLeft.Value);
    });
    $('#btnS').click(function () {
        Input.OnInputPressed(InputType.MoveBack.Value);
    });
    $('#btnD').click(function () {
        Input.OnInputPressed(InputType.MoveRight.Value);
    });
    $('#btnUp').click(function () {
        Input.OnInputPressed(InputType.ActionForward.Value);
    });
    $('#btnLeft').click(function () {
        Input.OnInputPressed(InputType.ActionLeft.Value);
    });
    $('#btnDown').click(function () {
        Input.OnInputPressed(InputType.ActionBack.Value);
    });
    $('#btnRight').click(function () {
        Input.OnInputPressed(InputType.ActionRight.Value);
    });
}


function CanvasKeydown(e) {
    if (Input) { Input.OnButtonDown(e); }
}

function CanvasKeyPress(e) {
    if (Input) { Input.OnButtonDown(e, true); }
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

    $(GameCanvas).css("width", Math.ceil(320, w) + "px");
    $(GameCanvas).css("height", Math.ceil(140, h) + "px");
}