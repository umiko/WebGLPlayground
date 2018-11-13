'use strict';

async function main() {
    let vertCode = "";
    let fragCode = "";

    await Promise.all([
        fetchFile("./Shaders/shader.vert")
            .then(result => {vertCode = result;}),
        fetchFile("./Shaders/shader.frag")
            .then(result => {fragCode = result;})
    ]);

    //let myFramework = new WebGLForFun(vertCode,fragCode);
    let context = WebGLForFun.initWebGL(document.getElementById('sandbox'));
    let shaderProgram = WebGLForFun.initShader(context, vertCode, fragCode);
    let buffer = WebGLForFun.createBuffer(context, context.ARRAY_BUFFER, new Float32Array([0.0, 0.0]), context.STATIC_DRAW, shaderProgram);

    let posAttribLocation = context.getAttribLocation(shaderProgram, "position");

    context.colorMask(true,true,true,true);
    context.depthMask(true);

    context.clearColor(0.0,0.0,0.0,1.0);
    context.clearDepth(1.0);
    context.enable(context.DEPTH_TEST);
    context.depthFunc(context.LEQUAL);
    context.viewport(0,0, 400,400);
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    context.useProgram(shaderProgram);
    context.enableVertexAttribArray(posAttribLocation);
    context.vertexAttribPointer(posAttribLocation, 2, context.FLOAT, false, 0,0);
    context.drawArrays(context.POINTS, 0,1);
    context.disableVertexAttribArray(posAttribLocation);
    context.deleteBuffer(buffer);

    WebGLForFun.gracefulExit(context, shaderProgram);
}

function fetchFile(path){
    console.log("fetching code");
    return fetch(path)
        .then(res => res.text());
}