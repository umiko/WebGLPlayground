class DrawableObject{
    constructor(context, vertCode, fragCode, vertBuffer){
        this.shaderProgram = WebGLForFun.initShader(context, vertCode, fragCode);
        this.vertBuffer = vertBuffer;
    }

    draw(context){
        context.useProgram(this.shaderProgram);
        context.enableVertexAttribArray(context.getAttribLocation(this.shaderProgram, "position"));
        context.vertexAttribPointer(context.getAttribLocation(this.shaderProgram, "position"), 2, context.FLOAT, false, 0,0);
        context.drawArrays(context.TRIANGLES, 0,3);
        context.disableVertexAttribArray(context.getAttribLocation(this.shaderProgram, "position"));
    }

    destroy(context){
        context.getAttachedShaders(this.shaderProgram).map(shader => {
            context.detachShader(this.shaderProgram, shader);
            context.deleteShader(shader);
        });
        context.deleteProgram(this.shaderProgram);
        context.deleteBuffer(this.vertBuffer);
    }
}