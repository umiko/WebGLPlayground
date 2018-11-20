'use strict';

class WebGLForFun {

    constructor(){
    }

    static initWebGL(viewportCanvas) {
        //retrieve context
        let context = viewportCanvas.getContext('webgl', {alpha:true, depth:true});
        //check if a context has been retrieved
        if(!context){
            console.log("Acquiring context failed, falling back on experimental-webgl...");
            context = viewportCanvas.getContext('experimental-webgl');
        }
        //if it still does not have a context, give the user a hint
        if(!context){
            alert("lmao get a real browser");
            return false;
        }

        //set initial values
        context.clearColor(0, 0, 0, 1);
        context.clearDepth(1.0);
        context.viewport(0,0, viewportCanvas.width, viewportCanvas.height);
        context.enable(context.DEPTH_TEST);

        //return the prepared context
        return context;
    }
    //create a shader program and return it
    static initShader(context, vertCode, fragCode){
        const shaderProgram =  context.createProgram();

        const compiledVertShader = WebGLForFun.compileShader(context, vertCode, context.VERTEX_SHADER);
        const compiledFragShader = WebGLForFun.compileShader(context, fragCode, context.FRAGMENT_SHADER);

        if(!compiledFragShader || !compiledVertShader){
            console.error("Cannot continue shader program creation. At least one of the shaders did not compile")
        }

        context.attachShader(shaderProgram, compiledVertShader);
        context.attachShader(shaderProgram, compiledFragShader);

        context.linkProgram(shaderProgram);

        if(!context.getProgramParameter(shaderProgram, context.LINK_STATUS)){
            throw "Unable to link shader program!\n" + context.getProgramInfoLog(shaderProgram);
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
            console.error("Compilation of shader unsuccessful.\n" + context.getShaderInfoLog(shader)+"\n"+shaderSource);
            return null;
        }
        return shader;
    }

    static createBuffer(context, bufferType, bufferData, bufferUsage){
        const buffer = context.createBuffer();
        context.bindBuffer(bufferType, buffer);
        context.bufferData(bufferType, bufferData, bufferUsage);
        return buffer;
    }

    //clear the canvas
    static clear(context){
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
    }
}