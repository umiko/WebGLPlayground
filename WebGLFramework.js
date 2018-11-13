'use strict';

class WebGLForFun {

    constructor(){
    }

    static initWebGL(viewportCanvas) {
        console.log("initWebGL");

        const context = viewportCanvas.getContext('webgl', {alpha:true, depth:true});

        context.clearColor(0, 0, 0, 1);
        context.clearDepth(1.0);
        context.viewport(0,0, viewportCanvas.width, viewportCanvas.height);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
        context.enable(context.DEPTH_TEST);

        return context;
    }

    static initShader(context, vertCode, fragCode){
        console.log("initshaders");
        //console.log(this);
        const shaderProgram =  context.createProgram();

        const compiledVertShader = WebGLForFun.compileShader(context, vertCode, context.VERTEX_SHADER);
        const compiledFragShader = WebGLForFun.compileShader(context, fragCode, context.FRAGMENT_SHADER);

        context.attachShader(shaderProgram, compiledVertShader);
        context.attachShader(shaderProgram, compiledFragShader);

        context.linkProgram(shaderProgram);

        if(!context.getProgramParameter(shaderProgram, context.LINK_STATUS)){
            throw "Unable to link!\n" + context.getProgramInfoLog(shaderProgram);
        }

        context.useProgram(shaderProgram);

        return shaderProgram;
    }

    //Compiles YOUR shader code and throws an error if you fucked up
    static compileShader(context, shaderSource, shaderType) {
        let shader = context.createShader(shaderType);
        context.shaderSource(shader, shaderSource);
        context.compileShader(shader);
        if(!context.getShaderParameter(shader, context.COMPILE_STATUS)){
            console.log(shaderSource);
            throw "Compilation of shader unsuccessful.\n" + context.getShaderInfoLog(shader);
        }
        console.log("Shader compiled!");
        return shader;
    }

    static gracefulExit(context, shaderProgram) {
        context.getAttachedShaders(shaderProgram).map(shader => {
            context.detachShader(shaderProgram, shader);
            context.deleteShader(shader);
        });
        context.deleteProgram(shaderProgram);
        console.log("Cleaned up your mess.");
    }
}