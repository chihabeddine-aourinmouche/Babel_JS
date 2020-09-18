/**
 * Cette classe hérite de la classe InventoryElementTarget. Elle correspond aux objets qui sont sont initialement inactif mais qui on un effet sur la logique du jeu lors de leur activation par le joueur en utilisant un objet du type ActivatorInventoryElement.
 */
class Activatable extends Closed{
	
	/**
	 * Le constructeur de la classe.
	 * @param {String} name : Le nom de l'objet.
	 * @param {String} type : Le type de l'objet.
	 * @param {Boolean} activated : l'état de l'objet.
	*/
	constructor(name, code){
		super(name, code);
		this.type = "activatable";
		this.onMissingCodeMessage = "activate";

	}

	getType(){
		return this.type;
	}
}