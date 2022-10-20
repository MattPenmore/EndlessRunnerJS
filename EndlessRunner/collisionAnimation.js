export class CollisionAnimation
{
    constructor(game, x, y)
    {
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.height = 18 * this.sizeModifier;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime)
    {
        this.x -= this.game.speed * deltaTime / 16;

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
        
    }
    draw(context,canvas)
    {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x / 100 * canvas.height + canvas.width / 2, this.y / 100 * canvas.height + canvas.height / 2, canvas.height * this.width / 100, canvas.height * this.height / 100);
    }
}