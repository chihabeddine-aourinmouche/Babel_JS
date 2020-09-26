/**
 * Cette classe correspond au personnage jouable.
*/
class Character{
	maxSpeed = .4;
	minSpeed = .1;
	closeEnoughTreshHold = 8;

	/**
	 * Le constructeur de la classe.
	 * @param {Object} position : Un triplet {x: Number, y: Number, z: Number}.
	 * @param {Number} speed : Un float > 0.
	*/
    constructor(objectManager, position={x: 0, y: 0, z: 0}){
        this.position = position;
		this.speed = .2;
		this.inventory = {};
		this.collection = [];
		this.camera = null;
		this.angularSensibility = 3.8;
		this.controlEnabled = false;
		this.itemPicked = null;
		this.objectManager = objectManager;
	}

	/**
	 * Mettre l'objet dans la collection du joueur.
	 * @param {Object} item : Un object de type CollectableObject.
	 * @param {Object} scene : La scene sur laquelle la mesh correspondante à l'objet a lieu.
	*/
	collect(item){
		switch (item.getType()) {
			case "tool":
				this.inventory[item.getCode()] = item;
				break;
			case "collectable":
				this.collection.push(item);
				break;
		}
	}
	
	getCamera(){
		return this.camera;
	}

	/**
	 * Initialiser la camera.
	 * @param {Object} scene : La scene où la camera sera initialisée.
	 * @param {Object} canvas : Le canvas transferant les evenement à la camera.
	*/
	setCamera(scene, canvas){
		this.camera = new B.FreeCamera("FreeCamera", new B.Vector3(
			this.position.x,
			this.position.y,
			this.position.z
		), scene);
		this.camera.minZ = .01;
		this.camera.attachControl(canvas);
		scene.activeCameras.length > 0 ? scene.activeCameras[0] = this.camera : scene.activeCameras.push(this.camera);
		this.camera.speed = this.speed;
		this.camera.checkCollisions = true;
		this.camera.applyGravity = true;
		this.camera.setTarget(new B.Vector3(0, 0, 0));
		this.camera.angularSensibility = this.angularSensibility*1000;
		//On lock le curseur de la souris dans la scène
		this.initPointerLock(scene);
		this.initMoveInput(scene);

	}

	placeCamera(){
		this.camera.position = new B.Vector3(this.position.x, this.position.y, this.position.z);
	}

	speedUp(){
		if(this.speed < this.maxSpeed){
			this.speed += .1;
		}
		this.camera.speed = this.speed;
	}
	
	slowDown(){
		if(this.speed > this.minSpeed){
			this.speed -= .1;
		}
		this.camera.speed = this.speed;
	}

	/**
	 * @param {Object} position : Un triplet {x: Number, y: Number, z: Number}.
	*/
	setPosition(position){
		this.position = position;
		this.placeCamera();
	}

	isCloseEnoughToObject(position){
		return B.Vector3.Distance(this.camera.globalPosition, position) <= this.closeEnoughTreshHold;
	}

	emptyInventory(){
		for(let index in this.inventory){
			delete this.inventory[index];
		}
	}

	getToolForInteractive(interactive){
		return this.inventory[interactive.getCode()];
	}

	/**
	 * Enlever un element donné de la poche du joueur.
	 * @param {Object} tool : L'objet activateur de type InventoryElement.
	*/
	removeTool(tool){
		delete this.inventory[tool.getCode()];
	}

	/**
	 * Met en place les touches utilisé pour faire interagir le joueur
	 */
	initMoveInput(scene){
		// On bind le déplacement sur les touches ZQSD
		this.camera.keysUp.push(90);
		this.camera.keysDown.push(83)
		this.camera.keysLeft.push(81);
		this.camera.keysRight.push(68);

		let _this = this;
		window.addEventListener("keyup", function(evt) {
			switch(evt.keyCode){
				case 170:
				case 220:
					_this.canPickItem(scene);
			}
		}, false);
	}


	initPointerLock(scene){
		let _this = this;

		// Requete pour la capture du pointeur
		var canvas = scene.getEngine().getRenderingCanvas();
		canvas.addEventListener("click", function(evt) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}, false);

		// Evenement pour changer le paramètre de rotation
		var pointerlockchange = function (event) {
			_this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
			if (!_this.controlEnabled) {
				_this.rotEngaged = false;
			} else {
				_this.rotEngaged = true;
			}
		};

		// Event pour changer l'état du pointeur, sous tout les types de navigateur
		document.addEventListener("pointerlockchange", pointerlockchange, false);
		document.addEventListener("mspointerlockchange", pointerlockchange, false);
		document.addEventListener("mozpointerlockchange", pointerlockchange, false);
		document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
	}

	unlockPointer(){
		document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
		document.exitPointerLock();
	}


	degToRad(deg)
	{
		return (Math.PI*deg)/180
	}

	rayOnInteractive(scene){
		let origin  = new BABYLON.Vector3(this.camera.position.x,this.camera.position.y,this.camera.position.z)
		let forward = new BABYLON.Vector3(0,0,1);
		forward = this.vecToLocal(forward, this.camera);
		let direction = forward.subtract(origin);
		direction = BABYLON.Vector3.Normalize(direction);

		let ray = new BABYLON.Ray(origin, direction, this.closeEnoughTreshHold);

		let pickInfo = scene.pickWithRay(ray);

		if(pickInfo.hit){
			let pickedMesh = pickInfo.pickedMesh;
			let pickedMeshUid = pickedMesh.uniqueId;
			let pickedObject = this.objectManager.getObjectById(pickedMeshUid);
			if(pickedObject.hasOwnProperty("type")){
				if(["activatable", "unlockable", "door", "tool", "collectable", "npc"].includes(pickedObject.getType())){
					return true;
				}
			}
		}
		return false;
	}

	canPickItem(scene){
		let origin  = new BABYLON.Vector3(this.camera.position.x,this.camera.position.y,this.camera.position.z)
		let forward = new BABYLON.Vector3(0,0,1);
		forward = this.vecToLocal(forward, this.camera);
		let direction = forward.subtract(origin);
		direction = BABYLON.Vector3.Normalize(direction);

		let ray = new BABYLON.Ray(origin, direction, this.closeEnoughTreshHold);

		let pickInfo = scene.pickWithRay(ray);

		//Pour afficher les rayon tirés ^^
		/*let rayHelper = new BABYLON.RayHelper(ray);
		rayHelper.show(scene);*/
		this.itemPicked = pickInfo.pickedMesh;
	}


	vecToLocal(vector, mesh){
		var m = mesh.getWorldMatrix();
		var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;
	}
}