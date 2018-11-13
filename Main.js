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
    WebGLForFun.gracefulExit(context, shaderProgram);
}

function fetchFile(path){
    console.log("fetching code");
    return fetch(path)
        .then(res => res.text());
}