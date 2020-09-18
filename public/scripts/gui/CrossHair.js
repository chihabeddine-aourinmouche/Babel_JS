class CrossHair{
	constructor(parent=null){
		this.parent = parent;
		this.icon = null;
		this.tingling = false;
	}

	create(imageManager){
		this.icon = imageManager.cloneImage("crosshair");
		this.icon.className = "crosshair";
		this.parent.appendChild(this.icon);
		keyUp(window, "b", () => {
			this.tingling ? this.unTingle() : this.tingle();
		});
	}

	show(){
		this.icon.style.display = "initial";
	}

	hide(){
		this.icon.style.display = "none";
	}

	tingle(){
		this.icon.className = "crosshair tingling_crosshair";
		this.tingling = true;
	}

	unTingle(){
		this.icon.className = "crosshair untingling_crosshair";
		this.tingling = false;
	}

	blur(){
		if(this.icon){
			this.icon.style.filter = "blur(5px)";
		}
	}
	
	unBlur(){
		if(this.icon){
			this.icon.style.filter = "blur(0px)";
		}
	}
}