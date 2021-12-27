//TODO: Refactor UI
$(function () {
    PopulateAudioSettingsForm();
    $('#btnSave').click(SaveAudioSettings());
});

async function PopulateAudioSettingsForm() {
    var audioSettings = await SoundService.LoadAudioAssets();
    var settingsList = [];

    audioSettings.GroupedSounds.forEach(audioGroup => {
        audioGroup.Sounds.forEach(sound => {
            settingsList.push({ GroupID: audioGroup.GroupID, SoundName: sound.SoundName, Volume: sound.Volume, FileName: sound.FileName });
        });
    });

    $('#divFormContent').html(settingsList.map(AudioSettingsTemplate).join(''));
}

function SaveAudioSettings() {
    var form = $('#frmSettings').serializeArray();
    var audioSettings = [];

    form.forEach(element => {
        //TODO: HERE
        audioSettings.push({});
    });
    ControlsService.SaveControls(JSON.stringify(controls));
}


//TODO: React or similar lightweight front end framework
const AudioSettingsTemplate = ({ GroupID, SoundName, Volume, FileName }) => `
<div>
<label>${GroupID} ${SoundName}</label>
<input type="text" name="${GroupID}${SoundName}" id="txt${GroupID}${SoundName}" value="${Volume}"></input>
<label>${FileName}</label>
<br/>
</div>
`