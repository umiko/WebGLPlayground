'use strict';

class WebGLForFun {

    constructor(vertCode, fragCode){
        this.vertCode = vertCode;
        this.fragCode = fragCode;
    }

    mainLoop(){
        //update and render loop
        this.gracefulExit();
    }

    initWebGL() {
        console.log("initWebGL");

        this.viewportCanvas = document.getElementById('sandbox');
        this.context = this.viewportCanvas.getContext('webgl', {alpha:true, depth:true});

        this.context.clearColor(0, 0, 0, 1);
        this.context.clearDepth(1.0);
        this.context.viewport(0,0, this.viewportCanvas.width, this.viewportCanvas.height);
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
        this.context.enable(this.context.DEPTH_TEST);
    }

    initShaders(){
        console.log("initshaders");
        console.log(this);
        this.shaderProgram =  this.context.createProgram();

        let compiledVertShader = this.compileShader(this.vertCode, this.context.VERTEX_SHADER);
        let compiledFragShader = this.compileShader(this.fragCode, this.context.FRAGMENT_SHADER);

        this.context.attachShader(this.shaderProgram, compiledVertShader);
        this.context.attachShader(this.shaderProgram, compiledFragShader);

        this.context.linkProgram(this.shaderProgram);

        if(!this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)){
            throw "Unable to link!\n" + this.context.getProgramInfoLog(this.shaderProgram);
        }

        this.context.useProgram(this.shaderProgram);
    }



    //Compiles YOUR shader code and throws an error if you fucked up
    compileShader(shaderSource, shaderType) {
        console.log(this);

        let shader = this.context.createShader(shaderType);
         this.context.shaderSource(shader, shaderSource);
         this.context.compileShader(shader);
         if(!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)){
             console.log(shaderSource);
             throw "Compilation of shader unsuccessful.\n" + this.context.getShaderInfoLog(shader);
         }
         console.log( "Shader compiled!");
         return shader;
    }

    gracefulExit() {
        this.context.getAttachedShaders(this.shaderProgram).forEach(shader => {
            this.context.detachShader(this.shaderProgram, shader);
            this.context.deleteShader(shader);
        });
        this.context.deleteProgram(this.shaderProgram);
        console.log("Cleaned up your mess.");
    }
}