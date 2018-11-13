'use strict';

async function main() {
    let vertCode = "";
    let fragCode = "";

    let objects = [];

    await Promise.all([
        fetchFile("./Shaders/shader.vert")
            .then(result => {vertCode = result;}),
        fetchFile("./Shaders/shader.frag")
            .then(result => {fragCode = result;})
    ]);

    let context = WebGLForFun.initWebGL(document.getElementById('sandbox'));

    const bufferRoof = WebGLForFun.createBuffer(context, context.ARRAY_BUFFER, new Float32Array([-0.5, 0.0, 0.5,0.0, 0.0,0.5]), context.STATIC_DRAW);
    objects.push(new DrawableObject(context, vertCode, fragCode, bufferRoof));
    const bufferHouse = WebGLForFun.createBuffer(context, context.ARRAY_BUFFER, new Float32Array([-0.4, -0.4,0.4,0.0, -0.4, 0.0]), context.STATIC_DRAW);
    objects.push(new DrawableObject(context, vertCode,fragCode, bufferHouse));

    WebGLForFun.clear(context);

    objects.map(drawableObject => drawableObject.draw(context));

    objects.map(drawableObject => drawableObject.destroy(context));
}

function fetchFile(path){
    console.log("fetching code");
    return fetch(path)
        .then(res => res.text());
}