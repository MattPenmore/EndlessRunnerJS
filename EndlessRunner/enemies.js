class Enemy
{
    constructor(game)
    {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime)
    {
        //movement
        this.x -= (this.speedX + this.game.speed * 0.3) * deltaTime / 1000;
        this.y += this.speedY * deltaTime / 1000;
        if(this.frameTimer > this.frameInterval)
        {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
             else this.frameX = 0;
        }
        else
        {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if ((this.x + this.width) < -90) this.markedForDeletion = true;

        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    draw(context)
    {
        if (this.game.debug) context.strokeRect(this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
    }
}

export class FlyingEnemy extends Enemy
{
    constructor(game)
    {
        super(game);    
        this.height = 9 / 100;
        this.spriteWidth = 60;
        this.spriteHeight = 44;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = Math.random() * this.game.xhalfWidth / 2 + this.game.xhalfWidth;
        this.y = Math.random() * 0.5 - 0.5;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.speedX = Math.random() * 0.1 + 0.1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.angle += this.va * deltaTime / 16;
        this.y += Math.sin(this.angle) / 100;
    }
}

export class GroundEnemy extends Enemy
{
    constructor(game)
    {
        super(game);
        this.height = 18 / 100;
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = this.game.xhalfWidth;
        this.y = 0.5 - this.height - this.game.groundMargin;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.image = document.getElementById('enemy_plant');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}

export class ClimbingEnemy extends Enemy
{
    constructor(game)
    {
        super(game);
        this.height = 30 / 100;
        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = this.game.xhalfWidth + Math.random() * this.game.xhalfWidth / 2;
        this.y = Math.random() * 0.5 - 0.5;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.image = document.getElementById('enemy_spider_big');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 0.1 : -0.1;
        this.maxFrame = 5;       
        
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        if((this.y > 0.5 - this.height - this.game.groundMargin) || this.y < -0.5) this.speedY *= -1;
    }
    draw(context)
    {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.pixelX + this.width / 2 * this.game.canvasHeight,0);
        context.lineTo(this.pixelX + this.width / 2 * this.game.canvasHeight, this.pixelY + this.height / 3 * this.game.canvasHeight);
        context.stroke();
    }
}