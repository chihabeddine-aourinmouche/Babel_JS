class MeshableFactory{
	static create(name, type, options){
		switch(type){
			case "activatable":
				return new Activatable(name, options.code);
			case "unlockable":
				return new Unlockable(name, options.code);
			case "door":
				return new Door(name, options.code);
			case "tool":
				return new Tool(name, options.code);
			case "collectable":
				return new Collectable(name);
			case "npc":
				return new NPC(name);
			default:
				return new Meshable(name);
		}
	}
}