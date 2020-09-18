class LevelGenerator{
    static UNLOCKABLE_COLLECTABLE_Y_OFFSET = .3;

    //primers: [{number: x, environmentPosition: e, characterPosition: c, ...}, ...]
    constructor(primers){
        this.primers = primers;
    }

    generateEnvironment(fogConfig=null){
        let environmentConfig = {
            lighting: {
                name: "hemisphericLight1",
                direction: {x: 0, y: 30, z: 5},
            },
        };
        if(fogConfig){
            environmentConfig.fog = {
                mode: fogConfig.mode,
                color: fogConfig.color,
                density: fogConfig.density,
                start: fogConfig.start,
                end: fogConfig.end,
            };
        }
        return environmentConfig;
    }
    
    generateCharacter(position){
        return {
            position: position,
        };
    }

    generatePlatform(directoryNumber, position){
        return {
            type: "",
            action: "",
            name: `platform${directoryNumber}`,
            position: position,
            isVisible: false,
            checkCollisions: true,
        };
    }

    generateActivatable(position, code){
        return {
            type: "activatable",
            action: "interact",
            name: "star",
            code: code,
            position: position,
            isVisible: false,
            checkCollisions: false,
        };
    }

    generateUnlockable(position, code){
        return {
            type: "unlockable",
            action: "interact",
            name: "chest",
            code: code,
            position: position,
            isVisible: false,
            checkCollisions: true,
        };
    }

    generateDoor(position, code){
        return {
            type: "door",
            action: "interact",
            name: "door",
            code: code,
            position: position,
            isVisible: false,
            checkCollisions: true,
        };
    }

    generateTool(position, code){
        return {
            type: "tool",
            action: "collect",
            name: "key",
            code: code,
            position: position,
            isVisible: false,
            checkCollisions: false,
            rotatable: true,
        };
    }

    generateCollectable(position){
        return {
            type: "collectable",
            action: "collect",
            name: "gold",
            position: position,
            isVisible: false,
            checkCollisions: false,
        };
    }

    generateNPC(position){
        return {
            type: "npc",
            action: "talk",
            name: "npc",
            position: position,
            rotation: {x: 0, y: Math.floor(Math.random() * 361), z: 0},
            isvisible: false,
            checkCollisions: false,
        };
    }
    
    generateLevelConfigs(){
        let configs = {};
        for(let primer of this.primers){
            let levelConfig = {};
            levelConfig.levelNumber = primer.levelNumber;
            levelConfig.goals = primer.goals;
            levelConfig.environment = this.generateEnvironment(primer.fogConfig);
            levelConfig.character = this.generateCharacter(primer.characterPosition);
            let meshableObjects = [
                this.generatePlatform(levelConfig.levelNumber, primer.platformPosition)
            ];
            if(primer.unlockablePositions){
                for(let index = 0; index < primer.unlockablePositions.length; index++){
                    let collectablePosition = {};
                    Object.assign(collectablePosition, primer.unlockablePositions[index]);
                    collectablePosition.y = primer.unlockablePositions[index].y + LevelGenerator.UNLOCKABLE_COLLECTABLE_Y_OFFSET;
                    meshableObjects.push(
                        this.generateUnlockable(primer.unlockablePositions[index], `ut${index}`),
                        this.generateTool(primer.toolPositions[index], `ut${index}`),
                        this.generateCollectable(collectablePosition)
                    );
                }
            }
            if(primer.activatablePositions){
                for(let index = 0; index < primer.activatablePositions.length; index++){
                    meshableObjects.push(
                        this.generateActivatable(primer.activatablePositions[index], `at${index}`),
                        this.generateTool(primer.toolPositions[index + primer.unlockablePositions.length], `at${index}`)
                    );
                }
            }
            if(primer.doorPositions){
                for(let index = 0; index < primer.doorPositions.length; index++){
                    meshableObjects.push(
                        this.generateDoor(primer.doorPositions[index], `dt${index}`),
                        this.generateTool(primer.toolPositions[index + primer.unlockablePositions.length + primer.activatablePositions.length], `dt${index}`)
                    );
                }
            }
            if(primer.collectablePositions){
                for(let collectablePosition of primer.collectablePositions){
                    meshableObjects.push(
                        this.generateCollectable(collectablePosition)
                    );
                }
            }
            if(primer.npcPositions){
                for(let npcPosition of primer.npcPositions){
                    meshableObjects.push(
                        this.generateNPC(npcPosition)
                    );
                }
            }
            levelConfig.meshableObjects = meshableObjects;
            configs[levelConfig.levelNumber] = levelConfig;
        }
        return configs;
    }
}