class ImageManager{
    static NAMES = {
        "key": "../images/key.png",
        "gold": "../images/gold.png",
        "menu_button": "../images/menu_button.png",
        "chest": "../images/chest.png",
        "door": "../images/door.png",
        "team_viridis": "../images/team_viridis.png",
        "dedication_1": "../images/dedication_1.png",
        "arrow_keys": "../images/arrow_keys.png",
        "mouse_click": "../images/mouse_click.png",
        "mouse_move": "../images/mouse_move.png",
        "crosshair": "/images/crosshair.png",
    };

    constructor(){
        this.library = {
            key: null,
            gold: null,
            chest: null,
            door: null,
            menu_button: null,
            team_viridis: null,
            dedication1: null,
            crosshair: null,
        };
    }

    loadImages(callback=null){
        let allReady = 0;
        for(let name in ImageManager.NAMES){
            this.library[name] = new Image();
            this.library[name].src = ImageManager.NAMES[name];
            this.library[name].alt = name;
            this.library[name].setAttribute("ondragstart", "return false;");
            this.library[name].setAttribute("ondrop", "return false;");

            this.library[name].onload = () => {
                allReady++;
                if(allReady === lengthOf(ImageManager.NAMES)){
                    callback();
                }
            };
        }
    }

    getLibrary(){
        return this.library;
    }

    getImage(name){
        return this.library[name];
    }

    cloneImage(name){
        if(name === null){
            return null;
        } else{
            let clone = this.getImage(name).cloneNode(true);
            return clone;
        }
    }
}
