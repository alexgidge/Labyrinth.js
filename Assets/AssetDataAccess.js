class AssetDataAccess {
    static async GetJSONFileData(filename) {
        var data = await fetch('../Assets/' + filename, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
        return data;
    }
}