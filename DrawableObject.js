class DrawableObject{

    shaderPrograms = [];
    shaderProgramInUse = 0;


    constructor(context, vertCode, fragCode, vertBuffer){
        this.addShaderProgram(context, vertCode, fragCode);
        this.vertBuffer = vertBuffer;
    }

    addShaderProgram(context, vertCode, fragCode, setActive=false){
        let shaderProgram = WebGLForFun.initShader(context, vertCode,fragCode);
        this.shaderPrograms.add(shaderProgram);
        if(setActive){
            this.shaderProgramInUse = this.shaderPrograms.indexOf(shaderProgram);
        }
    }

    draw(context){
        context.useProgram(this.shaderPrograms[this.shaderProgramInUse]);
        context.enableVertexAttribArray(context.getAttribLocation(this.shaderPrograms[this.shaderProgramInUse], "position"));
        context.vertexAttribPointer(context.getAttribLocation(this.shaderPrograms[this.shaderProgramInUse], "position"), 2, context.FLOAT, false, 0,0);
        context.drawArrays(context.TRIANGLES, 0,3);
        context.disableVertexAttribArray(context.getAttribLocation(this.shaderPrograms[this.shaderProgramInUse], "position"));
    }

    destroy(context){
        this.shaderPrograms.map(shaderProgram => {
            context.getAttachedShaders(shaderProgram).map(shader => {
                context.detachShader(shaderProgram, shader);
                context.deleteShader(shader);
            });
            context.deleteProgram(shaderProgram);
        });
        context.deleteBuffer(this.vertBuffer);
    }
}