export class FloatingMessage
{
    constructor(value, x, y, targetX, targetY)
    {
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
    }
    update(deltaTime)
    {
        this.x += (this.targetX - this.x) * deltaTime * 0.002;
        this.y += (this.targetY - this.y) * deltaTime * 0.002;
        this.timer += deltaTime;

        if(this.timer > this.lifeTime) this.markedForDeletion = true;
    }
    draw(context, canvas)
    {
        context.save();
        this.fontSize = canvas.height / 25;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = 'white';
        context.fillText(this.value, this.x / 100 * canvas.height + canvas.width / 2, this.y / 100 * canvas.height + canvas.height / 2);
        context.fillStyle = 'black';
        context.fillText(this.value, (this.x - 0.2) / 100 * canvas.height + canvas.width / 2, (this.y - 0.2) / 100 * canvas.height + canvas.height / 2);
        context.restore();
    }
    
}