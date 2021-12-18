//TODO: Volume settings (for each audio file in audio.json, provide a volume scale from 0 to 100)
//TODO: Volume groups (add volume group to audio.json, foreach group provide an overall scale)
//TODO: Key Mapping (Add a json file for key mapping, foreach key mapping, add a "Listen" button with a canvas that listens for input)
//TODO: Map Editor that allows editing of maps.json maps (tiles, enemies & items)
//TODO: Uploading/Editing of audio files

$(function () {
    $('#btnSave').click(function (evt) {
        console.log("----- Save Settings -----");
        //TODO: Display save success
        var entries = $('#frmSettings').serializeArray();
        //TODO: Attempt to save to settings JSON file
        entries.forEach(element => {
            console.log(element);
        });
    });
    $('#btnHome').click(function (evt) {
        window.location.href = '../index.html';
    });
});