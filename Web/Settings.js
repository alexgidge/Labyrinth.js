//TODO: Volume settings (for each audio file in audio.json, provide a volume scale from 0 to 100)
//TODO: Volume groups (add volume group to audio.json, foreach group provide an overall scale)
//TODO: Map Editor that allows editing of maps.json maps (tiles, enemies & items)
//TODO: Uploading/Editing of audio files

$(function () {
    $('#btnSave').click(function (evt) {
        console.log("----- Save Settings -----");
        //TODO: Display save success
        SaveSettings();
    });
});

async function PopulateCurrentSettings() {
    var settings = await GameControls.GetPlayerPref('GameSettings');
    //TODO: Populate form

    return settings;
}

function SaveSettings() {
    var formSettings = $('#frmSettings').serializeArray();
    SettingsService.SaveSettings(JSON.stringify(formSettings));
}