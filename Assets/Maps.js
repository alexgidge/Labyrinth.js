class Maps {
    static MapsFile = 'maps.json'
    static GetMaps() {
        console.log(this.MapsFile);

        $.getJSON(Maps.MapsFile, function (data) {
            return data;
        });

        $.getJSON(Maps.MapsFile, function (json) {
            console.log(json); // this will show the info it in firebug console
        });
    }
    static GetRandomMap() {
        //TODO: Data persistence methods
        var mapList = Maps.GetMaps();
        if (mapList) {
            var count = mapList.count;
            var x = Math.ceil(Math.floor(Math.random() * 100), count);//100 max maps
            return mapList[x];
        }
    }
}