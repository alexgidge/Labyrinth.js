$(function () {
    $('#txtGameTitle').text("Labyrinth");//TODO: load from json
    $('#btnStart').click(function (evt) {
        window.location.href = 'Game/View.html';
    });
});