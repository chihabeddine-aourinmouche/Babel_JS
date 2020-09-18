class GUI extends Subscriber{
	constructor(canvasID, imageManager){
		super("gui");
		this.canvasID = canvasID;
		this.imageManager = imageManager;
			this.canvasWrap;
				this.canvas;
				this.collectionContainer;
					this.inventory;
					this.collection;
				this.gameMenu;
				this.gameMenuHandle;
		this.infoBox;
		this.cinematic;
		this.credit;
		this.controlPage;
		this.progressBar;
		this.promptBox;
		this.crossHair;
		this.create();
	}

	receiveNotification(notification){
		switch (notification.action) {
			case "sound_loaded":
				this.updateProgressBar(notification.observable.getLoadingProgress());
				break;
		}
	}
	
	create(){
		this.canvasWrap = document.getElementById("canvas_wrap");
			this.canvas = document.getElementById(this.canvasID);
			this.collectionContainer = document.getElementById("collection_container");
				this.inventory = document.getElementById("inventory");
				this.collection = document.getElementById("collection");

			this.gameMenu = new Menu(this.canvasWrap);
			this.gameMenu.create(
				() => {
					if(this.infoBox) this.infoBox.hideBox();
					this.blurDetails();
				},
				() => {this.unBlurDetails();}
			);
			this.gameMenuHandle = this.gameMenu.getMenuButton();
			this.promptBox = new PromptBox(this.canvasWrap);
			this.crossHair = new CrossHair(this.canvasWrap);
	}

	showPromptBox(onSubmitCallback=null){
		this.promptBox.show(onSubmitCallback);
	}

	hidePromptBox(){
		this.promptBox.hide();
	}

	createProgressBar(){
		this.progressBar = div("progress_bar");

		let progress = div("progress");
		this.progressBar.appendChild(progress);
	}

	updateProgressBar(purcent){
		if(this.progressBar) this.progressBar.firstChild.style.transform = `scaleX(calc(${purcent}%))`;
	}

	showProgressBar(parent=this.canvasWrap){
		this.progressBar.style.display = "flex";
		parent.appendChild(this.progressBar);
	}

	hideProgressBar(){
		this.progressBar.style.display = "initial";
		this.progressBar.remove();
	}

	createControlPage(){
		this.controlPage = div("control_page");

		let moveControls = div("control");
		let arrowKeys = img(null, null, "../images/arrow_keys.png", "Arrow Keys");
		arrowKeys.setAttribute("ondragstart", "return false;");
		arrowKeys.setAttribute("ondrop", "return false;");
		let arrowKeysDescription = p(null, null, "Press the arrow keys to move around.");
		moveControls.appendChild(arrowKeys);
		moveControls.appendChild(arrowKeysDescription);

		let look = div("control");
		let mouseMove = img(null, null, "../images/mouse_move.png", "Mouse Move");
		mouseMove.setAttribute("ondragstart", "return false;");
		mouseMove.setAttribute("ondrop", "return false;");
		let mouseMoveDescription = p(null, null, "Move the mouse to look around.");
		look.appendChild(mouseMove);
		look.appendChild(mouseMoveDescription);

		let interact = div("control");
		let mouseClick = img(null, null, "../images/mouse_click.png", "Mouse Click");
		mouseClick.setAttribute("ondragstart", "return false;");
		mouseClick.setAttribute("ondrop", "return false;");
		let mouseClickDescription = p(null, null, "Click the mouse buttons to interact with objects.");
		interact.appendChild(mouseClick);
		interact.appendChild(mouseClickDescription);

		this.controlPage.appendChild(moveControls);
		this.controlPage.appendChild(look);
		this.controlPage.appendChild(interact);
	}

	showControlPage(parent=this.canvasWrap){
		this.controlPage.style.display = "flex";
		parent.appendChild(this.controlPage);
	}

	hideControlPage(){
		this.controlPage.style.display = "initial";
		this.controlPage.remove();
	}

	getGameMenu(){return this.gameMenu;}

	createCredit(){
		this.credit = div("credit");


		let creditSection_1 = div("credit_section");

		let team = this.imageManager.cloneImage("team_viridis");
		creditSection_1.appendChild(team);

		let dev = p(null, null, )
		creditSection_1.appendChild(dev);


		let creditSection_2 = div("credit_section");

		let dedication_1 = this.imageManager.cloneImage("dedication_1");
		creditSection_2.appendChild(dedication_1);


		let creditSection_3 = div("credit_section");

		let sounds = p(null, null, "Thanks to the artists from https://bensound.com/ for providing quality royalty-free content.")
		creditSection_3.appendChild(sounds);


		let creditSection_4 = div("credit_section");

		let videoArtistThanks = p(null, null, "Thanks to the following sound artists for providing quality royalty-free content.")
		creditSection_4.appendChild(videoArtistThanks);

		let video_1_artist = p(null, null, "Phillip from https://pixels.com/")
		creditSection_4.appendChild(video_1_artist);

		let video_3_artist = p(null, null, "Taryn Elliott from https://pexels.com/")
		creditSection_4.appendChild(video_3_artist);


		let creditSection_5 = div("credit_section");

		let melanie = p(null, null, "Mélanie - Thanks to Mélanie for creating some of the 2D images")
		creditSection_5.appendChild(melanie);

		let chihab = p(null, null, "Chihabeddine - 2D/3D content")
		creditSection_5.appendChild(chihab);


		let creditSection_6 = div("credit_section");

		let iconArtistThanks = p(null, null, "Thanks to the following artists for providing quality royalty-free icons.")
		creditSection_6.appendChild(iconArtistThanks);

		let icons_1_and_2_artist = p(null, null, "Smashicons from https://flaticon.com")
		creditSection_6.appendChild(icons_1_and_2_artist);

		let icon_3_artist = p(null, null, "Freepik from https://flaticon.com")
		creditSection_6.appendChild(icon_3_artist);


		this.credit.appendChild(creditSection_1);
		this.credit.appendChild(creditSection_2);
		this.credit.appendChild(creditSection_3);
		this.credit.appendChild(creditSection_4);
		this.credit.appendChild(creditSection_5);
		this.credit.appendChild(creditSection_6);
	}

	showCredit(){
		this.credit.style.display = "flex";
		this.canvasWrap.appendChild(this.credit);
	}

	hideCredit(){
		this.credit.style.display = "initial";
		this.credit.remove();
	}

	createCinematic(filename, loop=true, muted=true){
		this.cinematic = document.createElement("video");
		this.cinematic.className = "cinematic_video";
		this.cinematic.autoplay = true;
		this.cinematic.loop = loop;
		this.cinematic.muted = muted;

		let source = document.createElement("source");
		source.type = "video/mp4";
		source.src = `../videos/${filename}.mp4`;

		this.cinematic.appendChild(source);
	}

	showCinematic(){
		this.cinematic.style.display = "block";
		this.canvasWrap.appendChild(this.cinematic);
	}

	hideCinematic(){
		this.cinematic.style.display = "initial";
		this.cinematic.remove();
	}

	showDetails(){
		this.collectionContainer.style.display = "initial";
		this.gameMenu.showMenuButton();
	}

	hideDetails(){
		this.collectionContainer.style.display = "none";
		this.gameMenu.hideMenuButton();
	}

	emptyInventory(){
		this.inventory.querySelectorAll('*').forEach((n) => {n.remove();});
	}

	reset(){
		this.emptyInventory();
		this.infoBox.hideBox();
	}

	removeInventoryItem(id){
		if(document.getElementById(`item_${id}`)){
			this.inventory.removeChild(document.getElementById(`item_${id}`));
		}
	}

	playAddAnimation(image, callback){
		if(document.getElementById("animation_image")){
			this.canvasWrap.removeChild(document.getElementById("animation_image"));
		}
		image.id = "animation_image";
		this.canvasWrap.appendChild(image);
		this.blurDetails();
		image.addEventListener("animationend", () => {
			image.remove();
			callback();
			this.unBlurDetails();
		});
	}

	addItem(observableInfo){
		let item = document.createElement("li");
		item.className = "item";
		item.id = `item_${observableInfo.id}`;
		
		let destinations = {
			"key": this.inventory,
			"gold": this.collection,
			"diamond": this.collection,
		};

		let messages = {
			"key": "You have just acquired a key.",
			"gold": "You have just acquired a treasure. Go find more!.",
			"diamond": "You have just acquired a treasure. Go find more!.",
		};

		let message = messages[observableInfo.name];
			
		let content = this.imageManager.cloneImage(observableInfo.name);
		content.setAttribute("ondragstart", "return false;");
		content.setAttribute("ondrop", "return false;");

		item.appendChild(content);

		this.playAddAnimation(content.cloneNode(true), () => {
			destinations[observableInfo.name].appendChild(item);
			this.communicate(message);
		});
	}

	communicate(message, imageName=null, onConfirmCallback=null){
		if(this.infoBox){
			this.infoBox.hideBox();
			this.infoBox = null;
		}
		
		this.infoBox = InfoBoxFactory.create(imageName !== null);
		this.infoBox.setParentBox(this.canvasWrap);
		this.infoBox.show(message, () => {
			this.unBlurDetails();
			if(onConfirmCallback) onConfirmCallback();
		}, this.imageManager.cloneImage(imageName));

		if(imageName != null){this.blurDetails();}
	}

	blurDetails(){
		this.canvas.style.filter = "blur(5px)";
		this.collectionContainer.style.filter = "blur(5px)";
		this.promptBox.blur();
		this.crossHair.blur();
	}

	unBlurDetails(){
		this.canvas.style.filter = "blur(0px)";
		this.collectionContainer.style.filter = "blur(0px)";
		this.promptBox.unBlur();
		this.crossHair.unBlur();
	}

	blurCinematic(){
		this.cinematic.style.filter = "blur(5px)";
	}

	unBlurCinematic(){
		this.cinematic.style.filter = "blur(0px)";
	}

	goFullScreen(){
		document.addEventListener("keydown", (event) => {
			if(event.key === "$"){
				this.canvasWrap.requestFullscreen();
			}
		});
	}
}