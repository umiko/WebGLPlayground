class DrawableObject{
    shaderProgram;
    vertBuffer;
    indexBuffer;
    normalBuffer;
    colorBuffer;
    texcoordBuffer;

    constructor(){

    }

    draw(context){
        context.useProgram(this.shaderProgram);

    }

    destroy(context){
        context.getAttachedShaders(this.shaderProgram).map(shader => {
            context.detachShader(this.shaderProgram, shader);
            context.deleteShader(shader);
        });
        context.deleteProgram(this.shaderProgram);
    }
}