class Level{
    constructor(number){
		this.number = number;
		this.environment;
		this.goals;
	}

	getGoals(){return this.goals;}

	setGoals(goals){
		this.goals = goals;
	}

	getNumber(){
		return this.number;
	}

	dispose(objectManager, scene){
		objectManager.disposeAllObjects(scene);
		this.environment.dispose(scene);
		this.goals = null;
	}

	getEnvironment(){
		return this.environment;
	}
	
	setEnvironment(environment){
		this.environment = environment;
	}

	placeCharacter(character, position){
		character.setPosition(position);
		character.updateCamera();
	}
}