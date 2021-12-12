TickFrequency = 100; //100ms per tick or 10 ticks per second. The game can then handle each tick as it needs

var engine;
var webInput;
var playerInput;
var engineInput;
var canvas;//TODO: Move to graphics
var game;
var player;

$(function () {
    //TODO: Move into engine
    canvas = initCanvas();
    tileMaps = new TileMaps();
    game = new Game(tileMaps.GetRandomMap());
    game.InitialiseGame();
    player = game.World.GetPlayerCharacter();

    playerInput = new PlayerInput(player)
    engineInput = new EngineInput(playerInput);

    engine = new Engine(game, TickFrequency);
    input = new WebInput(engineInput);

    canvas.keydown(CanvasKeydown);
    setInterval(EngineTick, TickFrequency);//10 ticks per second
    //drawFocusIfNeeded()
});

function CanvasKeydown(e) {
    input.OnButtonDown(e)
}

function EngineTick() {
    engine.Tick();
}

function initCanvas() {
    var canvas = $('#canvGameArea');
    canvas.focus();
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    $(window).bind("resize", function () {
        resizeCanvas(canvas);
    });

    resizeCanvas(canvas);

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

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
