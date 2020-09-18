class MeshReplacing extends Closed{
    constructor(name, code){
		super(name, code);
		this.config = {};
	}

	setMesh(config, scene, mesh, callback=null, observer=null, character=null){
		Object.assign(this.config, config);
		super.setMesh(config, scene, mesh, () => {
			this.interact(scene, observer, character);
			//last added
			if(callback !== null){
				callback();
			}
		}, observer, character);
	}

    replaceMesh(scene, mesh, observer, character, objectManager){
		let oldId = this.id;
		this.disposeMesh(scene);
		this.setMesh(this.config, scene, mesh, () => {}, observer, character);
		objectManager.updateObjectById(oldId, this);
    }
}