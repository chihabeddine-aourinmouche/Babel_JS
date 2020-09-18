class Menu{
	static GAME_MENU_CLASS_NAME = "game_menu";
	static GAME_MENU_BUTTON_SIDE_CLASS_NAME = "game_menu_button_side";
	static GAME_MENU_PAGE_SIDE_CLASS_NAME = "game_menu_page_side";
	static GAME_MENU_BUTTON_CLASS_NAME = "game_menu_button";

	constructor(parentBox=null){
		this.parentBox = parentBox;
		this.buttonSide;
		this.pageSide;
		this.menuButton;
		this.box;
		this.goals;
		this.controls;
		this.soundSwitch;
		this.isDisplayed = false;
		this.shownPage = {
			"goals": false,
			"controls": false,
		};
	}

	getParentBox(){return this.parentBox;}
	setParentBox(parentBox){this.parentBox = parentBox;}

	getMenuButton(){return this.menuButton;}
	setMenuButton(menuButton){this.menuButton = menuButton;}

	create(onShowCallback=null, onHideCallback=null){
		this.box = div(Menu.GAME_MENU_CLASS_NAME);

		this.buttonSide = div(Menu.GAME_MENU_BUTTON_SIDE_CLASS_NAME);
		this.pageSide = div(Menu.GAME_MENU_PAGE_SIDE_CLASS_NAME);

		this.goals = p(Menu.GAME_MENU_BUTTON_CLASS_NAME, null, "GOALS");
		this.controls = p(Menu.GAME_MENU_BUTTON_CLASS_NAME + " inactive_game_menu_button", null, "CONTROLS");
		this.soundSwitch = p(Menu.GAME_MENU_BUTTON_CLASS_NAME, null, "SOUND ON/OFF");

		this.buttonSide.appendChild(this.goals);
		this.buttonSide.appendChild(this.controls);
		this.buttonSide.appendChild(this.soundSwitch);

		this.box.appendChild(this.buttonSide);
		this.box.appendChild(this.pageSide);
		
		this.parentBox.appendChild(this.box);

		this.createMenuButton(onShowCallback, onHideCallback);
	}
	
	createMenuButton(onShowCallback=null, onHideCallback=null){
		this.menuButton = div();
		this.menuButton.className = "round_button game_button game_menu_handle";

		this.menuButton.addEventListener("click", () => {
			if(!this.isDisplayed){
				this.show(onShowCallback);
			} else{
				this.hideBox(onHideCallback);
			}
		});
		this.parentBox.appendChild(this.menuButton);
	}
	
	show(onShowCallback=null){
		this.hidePageSide();
		this.box.style.display = "flex";
		this.isDisplayed = true;
		if(onShowCallback) onShowCallback();
	}

	hideBox(onHideCallback=null){
		this.hidePageSide();
		this.box.style.display = "none";
		this.isDisplayed = false;
		if(onHideCallback) onHideCallback();
	}

	showMenuButton(){this.menuButton.style.display = "initial";}

	hideMenuButton(){this.menuButton.style.display = "none";}

	showPageSide(){
		this.pageSide = div(Menu.GAME_MENU_PAGE_SIDE_CLASS_NAME);
		this.box.appendChild(this.pageSide);
	}

	hidePageSide(){
		for(let name in this.shownPage){
			this.shownPage[name] = false;
		}
		if(this.pageSide){
			this.pageSide.remove();
		}
	}

	setUpButtons(levelGoals, switchSound){
		this.goals.addEventListener("click", () => {this.showHideGoalPage(levelGoals);});
		this.controls.addEventListener("click", () => {this.showControls();});
		this.soundSwitch.addEventListener("click", () => {switchSound();});
	}

	showHideGoalPage(levelGoals){
		if(!this.shownPage["goals"]){
			this.hidePageSide();
			this.showPageSide();
			this.shownPage["goals"] = true;
			for(let levelGoal of levelGoals){
				let goal = p(null, null, `${levelGoal.title}: ${levelGoal.tip}`);
				this.pageSide.appendChild(goal);
			}
		} else{
			this.hidePageSide();
		}
	}

	showControls(){}
}