$(function () {
    PopulateMaps();
});

async function PopulateMaps() {
    var mapAssets = await MapService.LoadMapAssets();
    var maps = []

    mapAssets.forEach(element => {
        maps.push({ map: element.ID, text: element.Text });
    });


    $('#divMaps').html(maps.map(MapButtonTemplate).join(''));
    maps.forEach(element => {
        $('#' + element.map).click(function (evt) {
            var t = (this.id);
            window.location.href = 'GameView.html?ID=' + t;
        });
    });
}

const MapButtonTemplate = ({ map, text, style }) => `<a class="nav-link" id="${map}" style="${style}">${text}</a>`