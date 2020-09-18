class Closed extends Interactive{
	constructor(name, code){
		super(name);
		this.code = code;
		this.closed = true;
		this.action = "interact";
	}

	getCode(){
		return this.code;
	}

	isOpened(){
		return !this.closed;
	}
	
	open(){
		this.closed = false;
	}

	/**
	 * Cette méthode surcharge la méthode reactToInventoryElement de la classe InventoryElementTarget. Elle correspond au mécanisme mis en place par l'objet lors de son activation.
	 * @param {Object} tool : L'objet activateur de type ActivatorInventoryElement.
	*/
	reactToTool(tool, callback){
		if(tool.isCompatible(this)){
			this.open();
			callback();
		}
	}
}