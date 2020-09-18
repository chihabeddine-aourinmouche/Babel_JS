/*
La vie est trop courte pour taper "console.truc(machin)" à chaque fois.
*/
print = console.log;
dir = console.dir;
group = console.group;
groupEnd = console.groupEnd;

function groupPrint(groupTitle=null, toPrint=null){
    group(groupTitle);
    print(toPrint);
    groupEnd();
}

function keyUp(element, key, callback){
    element.addEventListener("keyup", (e) => {
        if(e.key === key){callback();}
    });
}

function div(className=null, id=null){
    let dv = document.createElement("div");
    if(className) dv.className = className;
    if(id) dv.id = id;
    return dv;
}

function img(className=null, id=null, src=null, alt=null){
    let mg = document.createElement("img");
    if(className) mg.className = className;
    if(id) mg.id = id;
    if(src) mg.src = src;
    if(alt) mg.alt = alt;
    return mg;
}

function p(className=null, id=null, innerHTML=null){
    let pe = document.createElement("p");
    if(className) pe.className = className;
    if(id) pe.id = id;
    if(innerHTML) pe.innerHTML = innerHTML;
    return pe;
}

function input(className=null, id=null, placeHolder=null){
    let i = document.createElement("input");
    if(className) i.className = className;
    if(id) i.id = id;
    if(placeHolder) i.placeholder = placeHolder;
    return i;
}

//for debugging
o = () => print("OK");

/*
La configuration du clavier n'est pas assez ergonomique pour taper "BABYLON.machin" à chaque fois.
*/
B = BABYLON;

let copyPosition = (key, text) => {
    window.addEventListener("keyup", (event) => {
        if(event.key === key){
            let ta = document.createElement("textarea");
            value = `{x: ${Number(text.x.toFixed(2))}, y: ${Number(text.y.toFixed(2))}, z: ${Number(text.z.toFixed(2))}}`;
            ta.value = value;

            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
    });
};

function lengthOf(disctionary){
    return Object.keys(disctionary).length;
}

function recursive_delete(obj) {
	for(prop in obj) {
		if(typeof obj[prop] === 'object'){
			recursive_delete(obj[prop]);
		} else{
			delete obj[prop];
		}
	}
}