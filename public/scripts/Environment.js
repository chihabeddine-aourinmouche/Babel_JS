class Environment{
	constructor(){
		this.lighting;
	}
	
	setLighting(name, direction, scene){
		this.lighting = new B.HemisphericLight(name, new B.Vector3(direction.x, direction.y, direction.z), scene);
	}

	setLensBlur(scene, camera){
		let parameters = {
			edge_blur: 1,
			chromatic_aberration: .5,
			distortion: 1,
			grain_amount: .5,
			dof_focus_distance: 50,
			dof_aperture: .1,			// set this very high for tilt-shift effect
			dof_pentagon: true,
			dof_gain: 0.05,
		};
		let lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, scene, 1.0, camera);
	}
	
	setFog(config, scene){
		scene.fogMode = config.mode;
		scene.fogColor = config.color;
		scene.fogDensity = config.density;
		scene.fogStart = config.start;
		scene.fogEnd = config.end;
		scene.fogEnabled = true;
	}

	fogOff(scene){
		scene.fogEnabled = false;
	}

	dispose(scene){
		this.lighting.dispose();
		this.fogOff(scene);
	}
}