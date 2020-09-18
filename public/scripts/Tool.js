class Tool extends Interactive{
	constructor(name, code){
		super(name);
		this.code = code;
		this.type = "tool";
		this.action = "collect";
		this.hasServed = false;
		this.isCollected = false;
	}

	serve(){
		this.hasServed = true;
	}

	getType(){
		return this.type;
	}

	getCode(){
		return this.code;
	}
	
	isCompatible(interactive){
		return interactive.getCode() === this.code;
	}
}