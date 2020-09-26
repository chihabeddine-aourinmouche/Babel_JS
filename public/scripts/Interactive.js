class Interactive extends Meshable{
	constructor(name){
		super(name);
		this.action;
	}

	interact(scene, observer, character, callback=null){
		let _this = this;
		window.addEventListener("keyup", function(evt) {
			switch(evt.keyCode){
				case 170:
				case 220:
					if(scene.getMeshByUniqueID(_this.id) === character.itemPicked){
						_this.notifyObserver(observer, _this.action);
						character.itemPicked = null;

						if(callback) callback(scene.getMeshByUniqueID(_this.id));
					}
			}
		}, false);
	}

	setMesh(config, scene, mesh, callback=null, observer=null, character=null, animator=null){
		super.setMesh(config, scene, mesh, () => {
			this.interact(scene, observer, character);
			if(config.rotatable){
				animator.rotate(
					scene.meshes.filter((meshInstance) => {
						return meshInstance.uniqueId === this.getId();
					}),
					"y", .01
				);
			}
			//last added
			if(callback !== null){
				callback();
			}
		});
	}

	notifyObserver(observer, action){
		observer.notify({observable: this, action: action});
	}
}