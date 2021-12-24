//TODO: Refactor UI
$(function () {
    PopulateAudioSettingsForm();
    $('#btnSave').click(SaveAudioSettings());
});

async function PopulateAudioSettingsForm() {
    var audioSettings = await SoundService.LoadAudioAssets();
    audioSettings.GroupedSounds.forEach(audioGroup => {

    });
}

function SaveAudioSettings() {

}


//TODO: React or similar lightweight front end framework
const AudioSettingsTemplate = ({ text, action, key }) => `
<div>
<label>${text}</label>
<input type="text" name="${action}" id="txt${action}" value="${key}"></input><!--<button id="btn${action}Listener">Listen for ${text}</button>-->
<br/>
</div>
`