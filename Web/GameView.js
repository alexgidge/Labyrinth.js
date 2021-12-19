TickFrequency = 100; //100ms per tick or 10 ticks per second. The game can then handle each tick as it needs

var engine;
var webInput;
var playerInput;
var engineInput;
var canvas;//TODO: Move to graphics
var game;
var player;

$(function () {
    StartUp();
    $('#btnRestart').click(function (evt) {
        location.reload();
    });
});
async function StartUp() {
    var urlParams = new URLSearchParams(window.location.search);
    var mapName = urlParams.get('ID');
    await InitialiseGame(mapName);//TODO: Level select
    await StartGame();
}
async function InitialiseGame(mapName) {
    //TODO: Level select
    //TODO: Easy, Med & Hard maps
    //TODO: Rewrite, not all of this is right or needed but the canvas currently does function. Size & events need reviewing.
    console.log("--------------------------INITIALISING---------------------------");
    //TODO: Move into engine
    canvas = initCanvas();
    map = await AssetDataAccess.GetMap(mapName);//TODO: Param passed from level select.
    game = new Game(map, function () { location.reload(); });
    Game.Current.InitialiseGame();
    player = game.World.GetPlayerEntity();

    playerInput = new PlayerInput(player)
    engineInput = new EngineInput(playerInput);

    engine = new Engine(game, TickFrequency);
    var controls = await GameControls.GetControls();
    input = new WebInput(engineInput, controls);

    $('#canvGameArea').keyup(CanvasKeydown);
    setInterval(EngineTick, TickFrequency);//10 ticks per second
    //drawFocusIfNeeded()
}
async function StartGame() {
    console.log("--------------------------GAME STARTING---------------------------");
    Game.Current.GameStart();
    setInterval(EngineTick, TickFrequency);//10 ticks per second
}

function CanvasKeydown(e) {
    input.OnButtonDown(e)
}

function EngineTick() {
    engine.Tick();
}

function SetCanvasBackground(canvas, colour) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function initCanvas() {
    var canvas = $('#canvGameArea')[0];

    $(window).bind("resize", function () {
        resizeCanvas(canvas);
    });

    resizeCanvas(canvas);
    SetCanvasBackground(canvas, '#130b13');

    //$(canvas)[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
    //$(canvas)[0].mozRequestFullScreen(); //Firefox
    return canvas;
}

function resizeCanvas(canvas) {
    var w = $(window).width();
    var h = $(window).height();

    $(canvas).css("width", w + "px");
    $(canvas).css("height", h + "px");
}

