$(function () {
    PopulateCurrentControls();
    $('#btnSave').click(SaveControls);
});

async function PopulateCurrentControls() {
    var settings = await GameControls.GetControls();
    $('#divKeyMappingsList').html(settings.map(KeyMappingTemplate).join(''));

    //TODO: Dedupe
    return settings;
}

function SaveControls() {
    var formControls = $('#frmControls').serializeArray();
    var controls = [];
    formControls.forEach(element => {
        controls.push({ action: element.name, key: element.value });
    });
    PlayerPrefs.SavePlayerPref('Controls', controls);
}


//TODO: React or similar lightweight front end framework
const KeyMappingTemplate = ({ text, action, key }) => `
<div>
<label>${text}</label>
<input type="text" name="${action}" id="txt${action}" value="${key}"></input><!--<button id="btn${action}Listener">Listen for ${text}</button>-->
<br/>
</div>
`