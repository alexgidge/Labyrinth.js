$(function () {
    PopulateCurrentMaps();
    $('#btnSave').click(SaveMaps);
});

async function PopulateCurrentMaps() {
    var maps = await MapService.LoadMapAssets();
    $('#tblMaps').html(maps.map(MapJSONTemplate));
}

function SaveMaps() {
    var formMaps = $('#frmMapManager').serializeArray();
    var maps = [];
    for (let index = 0; index < formMaps.length; index++) {
        const id = formMaps[index++];
        const text = formMaps[index++];
        const room = formMaps[index];
        maps.push({ ID: id.value, Text: text.value, Room: JSON.parse(room.value) });
    }
    MapService.SaveMaps(JSON.stringify({ Maps: maps }));
    $('#pSaveSuccess').text('Saved.');
    setTimeout(function () {
        $('#pSaveSuccess').text(' ');
    }, 1000);
}


//TODO: React or similar lightweight front end framework
const MapJSONTemplate = ({ ID, Text, Room }) => `
<tr>
<td>
<input type="text" class="form-control" name="${ID}-ID" id="txt${ID}-ID" style="display:none;" value="${ID}"></input>
<label for="txt${ID}-Text">Name:</label>
<input type="text" class="form-control" name="${ID}-Text" id="txt${ID}-Text" aria-label="Level Name" value="${Text}"></input>
<label for="txt${ID}-JSON">JSON Data:</label>
<textarea rows="15" class="form-control" name="maps" id="txt${ID}-JSON" value="">${JSON.stringify(Room)}</textarea>
</td>
</tr>
`