class Sound extends B.Sound{
    constructor(name, url, scene,  callback, isInterruptible, isInterrupter, looping){
        super(name, url, scene, callback);
        this.isInterruptible = isInterruptible;
        this.interruter = isInterrupter;
        this.looping = looping;
        this.initialVolume = this.getVolume();
    }

    getInitialVolume(){return this.initialVolume;}
}