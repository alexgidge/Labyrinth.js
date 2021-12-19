$(function () {
    PopulateMaps();
});

async function PopulateMaps() {
    var mapAssets = await AssetDataAccess.LoadMapAssets();
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

//TODO: React or similar lightweight front end framework
const MapButtonTemplate = ({ map, text }) => `<button id="${map}">${text}</button>`