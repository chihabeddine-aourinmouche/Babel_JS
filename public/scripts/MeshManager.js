class MeshManager{
    static MESH_DIRECTORY = "../meshes/";
    static NAMES = [
        "platform1",
        "platform2",
        "star",
        "chest",
        "chest_replacement",
        "door",
        "door_replacement",
        "key",
        "gold",
        "npc",
    ];

    constructor(){
        this.library = {
            platform1: null,
            platform2: null,
            star: null,
            chest: null,
            chest_replacement: null,
            door: null,
            door_replacement: null,
            key: null,
            gold: null,
            npc: null,
        };
        this.loadingProgress = 0;
    }

    loadMeshes(scene, callback, observer){
        let allReady = 0;
        for(let name of MeshManager.NAMES){
            B.SceneLoader.ImportMesh("", MeshManager.MESH_DIRECTORY, `${name}.babylon`, scene, (newMeshes) => {
                newMeshes[0].isVisible = false;
                newMeshes[0].checkCollisions = false;

                //OPTIMISATION (BASICALLY DISABLING MESH)
                // AND KEEPING IT ONLY AS PARENT TO CREATE INSTANCES
                newMeshes[0].setEnabled(false);
                newMeshes[0].isPickable = false;
                newMeshes[0].isBlocker = false;
                newMeshes[0].isVertexBufferUpdatable = false;
                newMeshes[0].isOccluded = true;
                newMeshes[0].material.freeze();
                newMeshes[0].freezeWorldMatrix();
                newMeshes[0].doNotSyncBoundingInfo = true;
                newMeshes[0].convertToUnIndexedMesh();
                
                this.library[name] = newMeshes[0];
                
                allReady++;
                this.loadingProgress = (allReady * 100) / MeshManager.NAMES.length;
                
                this.notifyObserver(observer, "mesh_loaded");
                if(allReady === MeshManager.NAMES.length){
                    callback();
                }
             });
        }
    }

    getLoadingProgress(){return this.loadingProgress;}

    getLibrary(){
        return this.library;
    }

    getMeshByName(name){
        return this.library[name];
    }

    getReplacementMeshByName(name){
        return this.library[`${name}_replacement`];
    }

	notifyObserver(observer, action){
		observer.notify({observable: this, action: action});
	}
}