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

    let myFramework = new WebGLForFun(vertCode,fragCode);
    myFramework.initWebGL();
    myFramework.initShaders();
    myFramework.mainLoop();
}

function fetchFile(path){
    console.log("fetching code");
    return fetch(path)
        .then(res => res.text());
}