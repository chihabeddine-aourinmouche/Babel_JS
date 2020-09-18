class ObjectManager{
    constructor(){
        this.objects = {};
    }

    getObjects(){
        return this.objects;
    }
    
    storeObject(object){
        this.objects[object.getId()] = object;
    }

    getObjectById(id){
        return this.objects[id];
    }

    disposeObjectById(id, scene){
        this.objects[id].disposeMesh(scene);
        recursive_delete(this.objects[id]);
        delete this.objects[id];
    }
    
    
    disposeAllObjects(scene){
        for(let id in this.objects){
            if(!this.objects[id].hasOwnProperty("type")){
                this.disposeObjectById(id, scene);
            } else {
                if(this.objects[id].getType() === "unlockable" || this.objects[id].getType() === "activatable"){
                    this.disposeObjectById(id, scene);
                } else{
                    if(this.objects[id].hasOwnProperty("isCollected")){
                        if(!this.objects[id].isCollected){
                            this.disposeObjectById(id, scene);
                        } else{
                            if(this.objects[id].hasOwnProperty("hasServed")){
                                if(!this.objects[id].hasServed){
                                    this.disposeObjectById(id, scene);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /*
    if(this.objects[id].hasOwnProperty("type") 
                && this.objects[id].getType() === "tool" 
                && (!this.objects[id].isCollected 
                    || (this.objects[id].isCollected && !this.objects[id].hasServed))){
                        this.disposeObjectById(id, scene);
            }
            if(this.objects[id].hasOwnProperty("type"
                && this.objects[id].getType() === "collectable"
                && !this.objects[id].isCollected)){
                    this.disposeObjectById(id, scene);
            }
    */

    updateObjectById(oldId, object){
        delete this.objects[oldId];
        this.objects[object.getId()] = object;
    }

    reset(scene){
        for(let id in this.objects){
            this.objects[id].disposeMesh(scene);
            recursive_delete(this.objects[id]);
            delete this.objects[id];
        }
    }
}