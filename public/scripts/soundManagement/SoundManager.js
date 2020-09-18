class SoundManager{
    static SOUND_DIRECTORY = "../sounds/";
    static TITLES = {
        "background": {isInterruptible: false, isInterrupter: false, looping: true},
        "activate_activatable": {isInterruptible: false, isInterrupter: true, looping: false},
        "collect_collectable": {isInterruptible: false, isInterrupter: true, looping: false},
        "collect_tool": {isInterruptible: false, isInterrupter: true, looping: false},
        "open_door": {isInterruptible: false, isInterrupter: true, looping: false},
        "unlock_chest": {isInterruptible: false, isInterrupter: true, looping: false},
        "walking": {isInterruptible: true, isInterrupter: true, looping: true}
    };

    constructor(){
        this.library = {
            activate_activatable: null,
            background: null,
            collect_collectable: null,
            collect_tool: null,
            open_door: null,
            unlock_chest: null,
            walking: null,
        };
        this.isMuted = false;
        this.loadingProgress = 0;
    }

    switchSound(){
        switch (this.isMuted){
            case true:
                this.unMute();
                break;
            case false:
                this.mute();
                break;
        }
    }

    mute(){
        for(let sound in this.library){
            this.library[sound].setVolume(0);
        }
        this.isMuted = true;
    }

    unMute(){
        for(let sound in this.library){
            this.library[sound].setVolume(this.library[sound].getInitialVolume());
        }
        this.isMuted = false;
    }

    loadSounds(scene, callback, observer){
        let allReady = 0;
        for(const key in SoundManager.TITLES){
            this.library[key] = new Sound(
                key,
                `${SoundManager.SOUND_DIRECTORY}${key}.mp3`,
                scene, () => {
                    allReady++;
                    this.loadingProgress = (allReady * 100) / lengthOf(SoundManager.TITLES);
                    this.notifyObserver(observer, "sound_loaded");
                    if(allReady === lengthOf(SoundManager.TITLES)){
                        callback();
                    }
                },
                SoundManager.TITLES[key].isInterruptible,
                SoundManager.TITLES[key].isInterrupter,
                SoundManager.TITLES[key].looping
            );
        }
    }

    getLoadingProgress(){return this.loadingProgress;}

    getLibrary(){
        return this.library;
    }

    playSound(sound){
        if(this.library[sound].isInterrupter){
            for(let name in this.library){
                if(this.library[name].isInterruptible){
                    this.library[name].stop();
                }
            }
        }
        this.library[sound].loop = this.library[sound].looping;
        this.library[sound].play();
    }

    pauseSound(sound){
        this.library[sound].pause();
    }

    stopSound(sound){
        this.library[sound].stop();
    }

    isPlayingSound(sound){
        return this.library[sound].isPlaying;
    }

	notifyObserver(observer, action){
		observer.notify({observable: this, action: action});
	}
}