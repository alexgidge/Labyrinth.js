$(function () {
    initCanvas();
    setInterval(Tick, TickFrequency);//10 ticks per second
    //drawFocusIfNeeded()
});

function initCanvas() {
    var canvas = $('#canvGameArea');
    canvas.focus();
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    var handlekeydown = function (e) {
        alert('keycode: ' + e.keyCode);
        return false;
        //TODO: canvas.blur(); on esc
    };

    canvas.keydown(handlekeydown);

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
}

function resizeCanvas(canvas) {
    var w = $(window).width();
    var h = $(window).height();

    $(canvas).css("width", w + "px");
    $(canvas).css("height", h + "px");
}

