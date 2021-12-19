$(function () {
    $('#divPageHeader').html('<button id="btnHome">Back home</button>');
    $('#btnHome').click(function (evt) {
        window.location.href = '../index.html';
    });
});