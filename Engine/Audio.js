class EngineAudio {
    //TODO: Preload audio files into cache on level start.
    constructor(audioAssetsJSON) {
        this.AudioAssets = audioAssetsJSON;
    }

    static PlaySound(world, soundCharacter, SoundName, volumeMultiplier = 1, looping = false, audioX = 0, audioY = 0, audioZ = 0)//TODO: Sound library instead of passing file path
    {//TODO: Delays
        try {
            var playerPosition = world.GetPlayerEntity().Transform.Position;
            var filename = AssetDataAccess.GetAudioAsset(SoundName)[soundCharacter];
            var location = "../Assets/Audio/" + filename;

            var distance = 1;
            var diffX = (audioX - playerPosition.x) * 2;//TODO: Remove *2
            var diffY = audioZ - 0;//audioY - playerPosition.y;
            var diffZ = (audioY - playerPosition.y) * 2;

            var soundVolume = (1 * volumeMultiplier * distance);//TODO: Distance multiplier based on path finding in addition to the spatial audio

            var sound = new Howl({
                src: [location],
                volume: soundVolume
            });


            var walking = sound.play();//TODO: Rewrite to properly use the package. 

            sound.stereo(soundVolume, walking);//TODO: Why is volume needed twice? I'm just slightly confused but it's working
            sound.pos(diffX, diffY, diffZ, walking);
        } catch (err) {
            //TODO: Error handling & logging
        }

        //TODO: Validation
        //TODO: Move to Audio.play();
        console.log("Audio: " + SoundName);//TODO: Proper logging
    }
}
