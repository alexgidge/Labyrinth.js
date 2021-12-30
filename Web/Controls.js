$(function () {
    PopulateCurrentControls();
    $('#btnSave').click(SaveControls);
});

async function PopulateCurrentControls() {
    var controls = await ControlsService.LoadControlMappings();
    $('#frmControls').html(controls.map(KeyMappingTemplate).join(''));
}

function SaveControls() {
    var formControls = $('#frmControls').serializeArray();
    var controls = [];
    formControls.forEach(element => {
        controls.push({ action: element.name, key: element.value });
    });
    ControlsService.SaveControls(JSON.stringify(controls));
}


//TODO: React or similar lightweight front end framework
const KeyMappingTemplate = ({ text, action, key }) => `
<div class="row">
<div class="col">
<label for="txt${action}">${text}</label>
</div>
<div class="col">
<input type="text" class="form-control" name="${action}" id="txt${action}" value="${key}"></input><!--<button id="btn${action}Listener">Listen for ${text}</button>-->
</div>
</div>
`