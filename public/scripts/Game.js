// /*POUR FACILITER L'APPEL AU DEBUGGEUR COMME EN C++...*/ let DEBUG = true;

class Game extends Subscriber{
    constructor(subscriberID, levelConfigPrimer, canvasID="canvas"){
		super(subscriberID);
		this.canvas = document.getElementById(canvasID);
		this.engine = new B.Engine(this.canvas, true, null, true);
		this.scene;
		this.createScene();
		this.glowLayer = new B.GlowLayer("glowLayer", this.scene);
		this.levelConfigs = new LevelGenerator(levelConfigPrimer).generateLevelConfigs();
		this.level;
		this.currentLevelNumber;
		this.interactiveObserver = new InteractiveObserver();
		this.subscribeToObserver(this.interactiveObserver);
		this.objectManager = new ObjectManager();
		this.character = new Character(this.objectManager);
		this.character.setCamera(this.scene, this.canvas);
		this.animator = new Animator(this.scene);
		this.soundManager = new SoundManager();
		this.meshManager = new MeshManager();
		this.imageManager = new ImageManager();
		this.gui = new GUI(canvasID, this.imageManager);
		this.gui.subscribeToObserver(this.interactiveObserver);
	}

	createScene(){
		this.scene = new B.Scene(this.engine);
		this.scene.autoClear = true;
		this.scene.clearColor = new B.Color3.FromHexString("#77AAFF");
		this.scene.gravity = new B.Vector3(0, -.1, 0);
		this.scene.collisionsEnabled = true;
		this.scene.blockMaterialDirtyMechanism = true;
	}

	loadIntroScreen(){
		this.gui.hideDetails();
		this.gui.createCinematic("Desert_1");
		this.gui.showCinematic();
		this.gui.createControlPage();
		this.gui.showControlPage();
		this.gui.createProgressBar();
		this.gui.showProgressBar();
		this.gui.showDetails();
		this.soundManager.loadSounds(this.scene, () => {
			//WHEN ALL SOUNDS ARE SUCCESSFULLY LOADED DO THE FOLLOWING
			this.meshManager.loadMeshes(this.scene, () => {
				//WHEN ALL MESHES ARE LOADED DO THE FOLLOWING
				this.imageManager.loadImages(() => {
					//WHEN ALL IMAGES ARE LOADED DO THE FOLLOWING
					this.gui.hideProgressBar();
					this.gui.communicate("Press the button to start the game", null, () => {
						this.gui.hideControlPage();
						this.gui.hideCinematic();
						this.gui.showDetails();
						this.gui.crossHair.create(this.imageManager);
						this.scene.registerBeforeRender(() => {
							this.character.rayOnInteractive(this.scene) ? this.gui.crossHair.tingle() : this.gui.crossHair.unTingle();
						});
						this.start();
					});
				});
			}, this.interactiveObserver);
		}, this.interactiveObserver);
	}

	getScene(){
		return this.scene;
	}

	start(){
		this.soundManager.stopSound("background");
		this.loadLevel(1);
		this.soundManager.playSound("background");
	}

	loadLevel(configIndex){
		if(this.soundManager.isPlayingSound("activate_activatable")){
			this.soundManager.stopSound("activate_activatable");
		}
		let levelConfig = this.levelConfigs[configIndex];
		this.level = new Level(levelConfig.levelNumber);
		this.currentLevelNumber = this.level.getNumber();

		this.level.setGoals(levelConfig.goals);

		this.gui.getGameMenu().setUpButtons(this.level.getGoals(), () => {this.soundManager.switchSound()});

		this.character.setPosition(levelConfig.character.position);

		this.level.setEnvironment(new Environment());
		this.level.getEnvironment().setLighting(levelConfig.environment.lighting.name, levelConfig.environment.lighting.direction);
		this.level.getEnvironment().setFog(levelConfig.environment.fog, this.scene);

		for(let index in levelConfig.meshableObjects){
			let meshableObjectConfig = levelConfig.meshableObjects[index];
			let meshableObject = MeshableFactory.create(meshableObjectConfig.name, meshableObjectConfig.type, {code: meshableObjectConfig.code});

			if(meshableObject){
				meshableObject.setMesh(meshableObjectConfig, this.scene, this.meshManager.getMeshByName(meshableObject.getName()), () => {
					this.objectManager.storeObject(meshableObject);
				}, this.interactiveObserver, this.character, this.animator);
			}
		}

		window.addEventListener("keydown", (event) => {
			if([37, 38, 39, 40, 68, 81, 83, 90].includes(event.keyCode)){
				if(!this.soundManager.isPlayingSound("walking")){
					this.soundManager.playSound("walking");
				}
			}
		});

		window.addEventListener("keyup", (event) => {
			if([37, 38, 39, 40, 68, 81, 83, 90].includes(event.keyCode)){
				if(this.soundManager.isPlayingSound("walking")){
					this.soundManager.stopSound("walking");
				}
			}
		});

		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////// //DELETE THESE LINES LATER ////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		try {if(DEBUG) this.debug();} catch(error){}
		let text = this.character.getCamera().globalPosition;
		copyPosition("c", text);
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////
	}

	loadCreditScreen(){
		this.scene.dispose();
		this.gui.hideDetails();
		this.gui.createCinematic("Desert_3");
		this.gui.showCinematic();
		this.gui.blurCinematic();
		this.gui.createCredit();
		this.gui.showCredit();
	}

	getCurrentLevel(){
		return this.level;
	}

	receiveNotification(notification){
		switch (notification.action) {
			case "interact":
				super.receiveNotification(notification, () => {
					switch(notification.observable.getType()){
						case "unlockable":
						case "door":
						case "activatable":
							let tool = this.character.getToolForInteractive(notification.observable);
							if(tool){
								notification.observable.reactToTool(tool, () => {
									this.gui.removeInventoryItem(tool.getId());
									this.character.removeTool(tool);
									switch (notification.observable.getType()) {
										case "activatable":
											this.soundManager.playSound("activate_activatable");
												this.gui.hideDetails();
												if(this.currentLevelNumber < lengthOf(this.levelConfigs)){
													this.character.unlockPointer();
													this.gui.communicate("Level Completed. You are now one huge step closer to the destination!", null, () => {
														this.gui.showDetails();
														this.levelUp();
													});
												} else{
													this.character.unlockPointer();
													this.gui.communicate("All levels Completed! We thank you for playing this demo, and happily announce that more will come up soon.", null, () => {
														if(this.currentLevelNumber < lengthOf(this.levelConfigs)){
															this.levelUp();
														} else{
															this.loadCreditScreen();
														}
													});
												}
											break;
										case "unlockable":
										case "door":
											this.soundManager.playSound(`${notification.observable.onMissingCodeMessage}_${notification.observable.getName()}`);
											this.character.unlockPointer();
											this.gui.communicate("You have just unlocked a treasure chest.", notification.observable.getName(), () => {});
											notification.observable.replaceMesh(this.scene, this.meshManager.getReplacementMeshByName(notification.observable.getName()), this.interactiveObserver, this.character, this.objectManager);
											break;
									}
									tool.serve();
									this.objectManager.disposeObjectById(tool.getId(), this.scene);
								});
							} else if(!notification.observable.isOpened()){
								this.character.unlockPointer();
								this.gui.communicate(`You do not have the tool to ${notification.observable.onMissingCodeMessage} this ${notification.observable.getName()}.`);
							}
							break;
						case "npc":
							this.gui.showPromptBox((message) => {
								this.character.unlockPointer();
								this.gui.communicate(notification.observable.respond(message), "key", () => {});
							});
							break;
					}
				});
				break;
			case "collect":
				this.character.collect(notification.observable);
				this.gui.addItem({id: notification.observable.getId(), name: notification.observable.getName()});
				notification.observable.hide(this.scene);
				this.character.unlockPointer();
				switch (notification.observable.getName()){
					case "gold":
						this.soundManager.playSound("collect_collectable");
						this.objectManager.disposeObjectById(notification.observable.getId(), this.scene);
						break;
					case "key":
						this.soundManager.playSound("collect_tool");
						break;
				}
				break;
		}
	}

	levelUp(){
		this.gui.reset();
		this.level.dispose(this.objectManager, this.scene);
		this.loadLevel(++this.currentLevelNumber);
	}

	restartLevel(){
		this.gui.reset();
		this.level.dispose(this.objectManager, this.scene);
		this.loadLevel(this.currentLevelNumber);
	}

	debug(){
		this.scene.debugLayer.show();
	}
}

window.addEventListener("DOMContentLoaded", () => {
	let levelConfigPrimer = [
		{
			levelNumber: 1,
			goals: [
				{
					title: "Gather Treasures", tip: "Throughout the city, you will stumble upon shiny gold or diamonds. You are free to get them.",
				},
				{
					title: "Treasure Chests", tip: "Some treasures are locked inside chests. You need to have the right key for each chest in order to unlock it and get the treasure out."
				},
				{
					title: "Activate Star", tip: "In order to level up, you need to activate a star. To do so, you need to find the right key.",
				}
			],
			fogConfig: {
				mode: B.Scene.FOGMODE_LINEAR,
				color: new B.Color3(1.0, 0.9, 0.5),
				density: 10,
				start: 1.0,
				end: 60.0,
			},
			characterPosition: {x: -4, y: 2, z: 0},
			platformPosition: {x: 0, y: 0, z: 0},
			unlockablePositions: [{x: 0.88, y: 5.2, z: 22.42}, {x: 36.63, y: 0.01, z: 24.91}, {x: -55.52, y: 0.01, z: 34.8}],
			activatablePositions: [{x: -101.79, y: 0.01, z: 27.21}],
			doorPositions: [],
			toolPositions: [{x: -33.31, y: 0.01, z: 55.51}, {x: -18.17, y: 5.2, z: 41.77}, {x: -78.88, y: 0.01, z: 25.85}, {x: 27.09, y: 0.01, z: -6.44}],
			collectablePositions: [{x: 16.01, y: 0.01, z: 7.68}, {x: 18.59, y: 0.01, z: 7.71}, {x: 18.01, y: 0.01, z: 16.93}, {x: -3.26, y: 0.01, z: 15.5}, {x: -17.92, y: 0.01, z: 4.35}],
			npcPositions: [{x: 13.01, y: 0.01, z: 6.68}, {x: -12.58, y: 0.0, z: 5.58}, {x: -37.15, y: 0.0, z: 17.64}, {x: -85.22, y: 0.0, z: 38.06}],
		},
		{
			levelNumber: 2,
			goals: [
				{
					title: "Solve Maze", tip: "Find your way out of the underground maze prison and get to the outside world again to conquer Babylon.",
				},
				{
					title: "Gather Treasures", tip: "Throughout the city, you will stumble upon shiny gold or diamonds. You are free to get them.",
				},
				{
					title: "Treasure Chests", tip: "Some treasures are locked inside chests. You need to find the right key for each chest in order to unlock it and get the treasure out."
				},
				{
					title: "Activate Star", tip: "In order to level up, you need to activate a star. To do so, you need to have the right key.",
				}
			],
			fogConfig: {
				mode: B.Scene.FOGMODE_LINEAR,
				color: new B.Color3(1.0, 0.5, 0.9),
				density: 10,
				start: 1.0,
				end: 60.0,
			},
			characterPosition: {x: -43.63, y: 2.15, z: 15.22},
			platformPosition: {x: 0, y: .15, z: 0},
			unlockablePositions: [{x: -41.82, y: .15, z: -26.29}, {x: -40.22, y: .15, z: 22.39}, {x: 14.9, y: .15, z: -12.46}],
			activatablePositions: [{x: 49.3, y: .15, z: 22.17}, ],
			doorPositions: [],
			toolPositions: [{x: -31.6, y: .15, z: -25.69}, {x: -6.16, y: .15, z: 0.62}, {x: 13.64, y: .15, z: 22.81}, {x: -23.58, y: .15, z: 19.27}],
			collectablePositions: [{x: -19.03, y: .15, z: -3.62}, {x: -13.25, y: .15, z: -11.79}],
		},
	];

	let game = new Game("game", levelConfigPrimer);

	game.loadIntroScreen();

	game.engine.runRenderLoop(() => {
		game.getScene().render();
	});
});
