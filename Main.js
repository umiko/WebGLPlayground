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

    let context = WebGLForFun.initWebGL(document.getElementById('sandbox'));
    let shaderProgram = WebGLForFun.initShader(context, vertCode, fragCode);
    let buffer = WebGLForFun.createBuffer(context, context.ARRAY_BUFFER, new Float32Array([0.0, 0.0]), context.STATIC_DRAW);

    let posAttribLocation = context.getAttribLocation(shaderProgram, "position");

    WebGLForFun.clear(context);
    context.useProgram(shaderProgram);
    context.enableVertexAttribArray(posAttribLocation);
    context.vertexAttribPointer(posAttribLocation, 2, context.FLOAT, false, 0,0);
    context.drawArrays(context.POINTS, 0,1);
    context.disableVertexAttribArray(posAttribLocation);
    context.deleteBuffer(buffer);
    //put shaderprogram and buffer in its own object

    WebGLForFun.gracefulExit(context, shaderProgram);
}

function fetchFile(path){
    console.log("fetching code");
    return fetch(path)
        .then(res => res.text());
}