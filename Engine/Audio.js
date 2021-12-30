class EngineAudio {
    async PlaySound(world, SoundEntity, SoundEntitySubType, SoundName, looping = false, audioX = 0, audioY = 0, audioZ = 0)//TODO: Sound library instead of passing file path
    {//TODO: Delays
        try {
            var playerPosition = (0, 0);
            if (world) {
                playerPosition = world.GetPlayerEntity().Transform.Position;
            }
            var soundMeta = await SoundService.GetAudioAsset(SoundEntity, SoundEntitySubType, SoundName);
            var location = "../Assets/Audio/" + soundMeta.FileName;

            var distance = 1;
            var diffX = (audioX - playerPosition.x) * 2;//TODO: Remove *2
            var diffY = audioZ - 0;//audioY - playerPosition.y;
            var diffZ = (audioY - playerPosition.y) * 2;//TODO: Set to 0 if above character earRange
            if (!soundMeta.Volume) {
                soundMeta.Volume = 1;//Default for non-specified audio
            }

            var soundVolume = (1 * soundMeta.Volume * distance);//TODO: Distance multiplier based on path finding in addition to the spatial audio

            //TODO: Rewrite and wrap howl implementation
            var sound = new Howl({
                src: [location],
                volume: soundVolume
            });//TODO: Sounds by groups & subgroups

            var walking = sound.play();

            sound.stereo(soundVolume, walking);//TODO: Why is volume needed twice? I'm just slightly confused but it's working
            sound.pos(diffX, diffY, diffZ, walking);
        } catch (err) {
            //TODO: Error handling & logging
            console.log("ERROR - Audio: " + SoundName + " \n-----error-----\n" + err);//TODO: Proper logging
        }
    }
}
