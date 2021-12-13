class EngineAudio {


    static PlaySound(SoundFile, volume = 1, looping = false)//TODO: Sound library instead of passing file path
    {
        //TODO: Validation
        //TODO: Move to Audio.play();
        console.log("Audio: " + SoundFile);
    }

    static PlayMoveSound()//TODO: Remove
    {
        var sound = new Howl({
            src: ['../Assets/Audio/zapsplat_foley_footsteps_football_boots_running_on_grass_75689(Short).mp3']
        });

        var walking = sound.play();
        sound.stereo(1, walking);
        sound.pos(5, 0, 0, walking);

        sound.play();
    }
}
