export class CollisionAnimation
{
    constructor(game, x, y)
    {
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.height = 0.18 * this.sizeModifier;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    update(deltaTime)
    {
        this.x -= this.game.speed * 0.01 * deltaTime / 16;

        if(this.frameTimer > this.frameInterval)
        {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.markedForDeletion = true;
        }
        else
        {
            this.frameTimer += deltaTime;
        }

        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;     
    }
    draw(context)
    {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
    }
}