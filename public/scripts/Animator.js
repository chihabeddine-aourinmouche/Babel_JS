class Animator{
    constructor(scene){
        this.scene = scene;
    }
    
    rotate(meshes, axis, speed){
        let _axis;
        switch (axis) {
            case "x":
                _axis = B.Axis.X;
                break;
            case "y":
                _axis = B.Axis.Y;
                break;
            case "z":
                _axis = B.Axis.Z;
                break;
            default:
                _axis = B.Axis.Y;
                break;
        }
        for(let mesh of meshes){
            this.scene.registerBeforeRender(() => {
                mesh.rotate(_axis, speed, B.Space.WORLD);
            });
        }
    }
}