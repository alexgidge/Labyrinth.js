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

const MapButtonTemplate = ({ map, text }) => ` <a class="nav-link" href="Settings.html" id="${map}">${text}</a>`