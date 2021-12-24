$(function () {
    PopulateMaps();
});

async function PopulateMaps() {
    var mapAssets = await MapService.LoadMapAssets();
    var maps = []

    mapAssets.forEach(element => {
        if (element.Hidden == "true") {
            maps.push({ map: element.ID, text: element.Text, style: "display:none;" });
        }
        else {
            maps.push({ map: element.ID, text: element.Text });
        }
    });


    $('#divMaps').html(maps.map(MapButtonTemplate).join(''));
    maps.forEach(element => {
        $('#' + element.map).click(function (evt) {
            var t = (this.id);
            window.location.href = 'GameView.html?ID=' + t;
        });
    });
}

const MapButtonTemplate = ({ map, text, style }) => `<button id="${map}" style="${style}">${text}</button>`