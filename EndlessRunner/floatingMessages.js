export class FloatingMessage
{
    constructor(value, x, y, targetX, targetY, game)
    {
        this.game = game;
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
        this.lifeTime = 2000;
        this.fontFamily = 'Helvetica';
        this.fontSize = 0;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    update(deltaTime)
    {
        this.x += (this.targetX - this.x) * deltaTime * 0.002;
        this.y += (this.targetY - this.y) * deltaTime * 0.002;
        this.timer += deltaTime;

        if(this.timer > this.lifeTime) this.markedForDeletion = true;

        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    draw(context)
    {
        context.save();
        this.fontSize = context.canvas.height / 25;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = 'white';
        context.fillText(this.value, this.pixelX, this.pixelY);
        context.fillStyle = 'black';
        context.fillText(this.value, this.pixelX - 0.2 * this.game.canvasHeight, this.pixelY - 0.2 * this.game.canvasHeight);
        context.restore();
    }
    
}