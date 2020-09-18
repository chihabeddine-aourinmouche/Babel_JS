class Meshable{
    constructor(name){
        this.name = name;
        this.id;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    setMesh(config, scene, mesh, callback=null){
       let newMesh = mesh.createInstance("newMeshInstance");
       this.id = newMesh.uniqueId;
       newMesh.name = `${config.name}_${this.id}`;
       newMesh.position = new B.Vector3(config.position.x, config.position.y, config.position.z);
       
       newMesh.material.freeze();
       // if(!config.rotatable) newMesh.freezeWorldMatrix();

       if(callback){
           callback();
        }

        if(config.rotation){
            newMesh.rotate(B.Axis.Y, config.rotation.y, B.Space.WORLD);
        }
        
        config.checkCollisions ? this.collideOn(scene) : this.collideOff(scene);
    }

    disposeMesh(scene){
        scene.getMeshByUniqueID(this.id).dispose();
    }

    show(scene){
        scene.getMeshByUniqueID(this.id).isVisible = true;
    }

    hide(scene){
        scene.getMeshByUniqueID(this.id).isVisible = false;
    }
    
    collideOn(scene){
        scene.getMeshByUniqueID(this.id).checkCollisions = true;
    }
    
    collideOff(scene){
        scene.getMeshByUniqueID(this.id).checkCollisions = false;
    }
}