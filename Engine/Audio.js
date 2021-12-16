class EngineAudio {
    //TODO: Preload audio files into cache on level start.
    constructor(audioAssetsJSON) {
        this.AudioAssets = audioAssetsJSON;
    }

    static PlaySound(SoundName, volume = 1, looping = false)//TODO: Sound library instead of passing file path
    {
        try {
            var filename = AssetDataAccess.GetAudioAsset(SoundName).filename;
            var location = "../Assets/Audio/" + filename;

            var sound = new Howl({
                src: [location]
            });

            var walking = sound.play();//TODO: Rewrite to properly use the package. 
            sound.stereo(1, walking);
            sound.pos(5, 0, 0, walking);

            sound.play();
        } catch (err) {
            //TODO: Error handling & logging
        }

        //TODO: Validation
        //TODO: Move to Audio.play();
        console.log("Audio: " + SoundName);//TODO: Proper logging
    }
}
