class Unlockable extends MeshReplacing{
	constructor(name, code){
		super(name, code);
		this.type = "unlockable";
		this.onMissingCodeMessage = "unlock";
	}

	getType(){
		return this.type;
	}
}