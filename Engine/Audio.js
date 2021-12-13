class EngineAudio {
    constructor(audioAssetsJSON) {
        this.AudioAssets = audioAssetsJSON;
    }

    static PlaySound(SoundFile, volume = 1, looping = false)//TODO: Sound library instead of passing file path
    {
        try {
            var sound = new Howl({
                src: [SoundFile]
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
        console.log("Audio: " + SoundFile);//TODO: Proper logging
    }
}
