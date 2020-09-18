class NPC extends Interactive{
	constructor(name){
		super(name);
		this.type = "npc";
		this.action = "interact";
		this.agentParams = {
			radius: 0.1,
			height: 0.2,
			maxAcceleration: 4.0,
			maxSpeed: 1.0,
			collisionQueryRange: 0.5,
			pathOptimizationRange: 0.0,
			separationWeight: 1.0,
		};
		this.maxAgentRadius = .1;
		this.agentIndex;
		this.responses = {
			"key": "You can find keys all around the city. Sometimes, keys are hidden on top of buildings.",
			"gold": "Gold can be found anywhere around, but sometimes it's locked inside a chest. You'll have to find the right key to open it.",
			"treasure": "Treasure can be found anywhere around, but sometimes it's locked inside a chest. You'll have to find the right key to open it.",
			"chest": "Chests are used to hide treasure. You need the right key to open them. Each chest has its own key of course.",
			"level": "To finish the level, you need to activate the star. It looks like a shiny pentagonal portal. It needs a key though, which you have to find.",
			"pentagon": "The pentagonal sheped thingy is a portal that can be activated with a key. It lets you go to other areas around."
		};
		this.randomResponses = [
			"Hello, sir. You look somewhat familiar.",
			"Hello. I hope you're enjoying our city.",
			"Our city is beautiful, isn't it!",
		];
		this.previousRandomResponse;
	}

	getType(){return this.type;}
	getAgentParams(){return this.agentParams;}
	getMaxAgentRadius(){return this.maxAgentRadius;}

	setAgentIndex(agentIndex){this.agentIndex = agentIndex;}

	respond(message){
		for(let key in this.responses){
			if(message.includes(key)){
				return this.responses[key];
			}
		}
		return this.randomRespond();
	}

	randomRespond(){
		if(!this.previousRandomResponse){
			this.previousRandomResponse = this.randomResponses[Math.floor(Math.random() * (this.randomResponses.length))];
		} else{
			let tempNewRandomResponses = this.randomResponses.filter((randomResponse) => {
				if(randomResponse != this.previousRandomResponse){
					return randomResponse;
				}
			});
			this.previousRandomResponse = tempNewRandomResponses[Math.floor(Math.random() * (tempNewRandomResponses.length))];
		}
		return this.previousRandomResponse;
	}

	interact(scene, observer, character){
		super.interact(scene, observer, character, (mesh) => {
			mesh.setDirection(new B.Vector3(
				character.getCamera().position.x - mesh.position.x,
				0,
				character.getCamera().position.z - mesh.position.z
			));

			//FOLLOW THE PLAYER
			// this.move(mesh, "x", mesh.position.x, character.getCamera().position.x, 10, scene);
			// this.move(mesh, "z", mesh.position.z, character.getCamera().position.z, 10, scene);
		});
	}

	move(what, axis, fromWhere, toWhere, howFast, scene){
		let animation = new BABYLON.Animation("move", `position.${axis}`, howFast, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		let frames = [];
		frames.push({
			frame: 0,
			value: fromWhere,
		});

		frames.push({
			frame: howFast,
			value: toWhere,
		});
		animation.setKeys(frames);
		scene.beginDirectAnimation(what, [animation], 0, 2 * howFast, true);
	}
}