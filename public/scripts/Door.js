class Door extends MeshReplacing{
	constructor(name, code){
		super(name, code);
		this.type = "door";
		this.onMissingCodeMessage = "open";
	}

	getType(){
		return this.type;
	}
}