/**
 * Cette classe correspond aux objets que le joueur peut collectionner.
*/
class Collectable extends Interactive{
    /**
     * Le constructeur de la classe.
     * @param {String} name : Le nom de l'objet.
    */
    constructor(name){
        super(name);
		this.type = "collectable";
        this.action = "collect";
        this.isCollected = false;
    }

	getType(){
		return this.type;
	}
}