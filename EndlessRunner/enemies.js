class Enemy
{
    constructor()
    {
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
        this.x -= (this.speedX + this.game.speed * 30) * deltaTime / 1000;
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
    }
    draw(context, canvas)
    {
        if (this.game.debug) context.strokeRect(this.x / 100 * canvas.height + canvas.width / 2, this.y / 100 * canvas.height + canvas.height / 2, canvas.height * this.width / 100, canvas.height * this.height / 100);
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x / 100 * canvas.height + canvas.width / 2, this.y / 100 * canvas.height + canvas.height / 2, canvas.height * this.width / 100, canvas.height * this.height / 100);
    }
}

export class FlyingEnemy extends Enemy
{
    constructor(game)
    {
        super();
        this.game = game;
        this.height = 9;
        this.spriteWidth = 60;
        this.spriteHeight = 44;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = 90 + Math.random() * 50;
        this.y = Math.random() * 50 - 50;
        this.speedX = Math.random() * 10 + 10;
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
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy
{
    constructor(game)
    {
        super();
        this.game = game;
        this.height = 18;
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = 90;
        this.y = 50 - this.height - this.game.groundMargin;
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
        this.game = game;
        this.height = 30;
        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.x = 90 + Math.random() * 50;
        this.y = Math.random() * 50 - 50;
        this.image = document.getElementById('enemy_spider_big');
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 10 : -10;
        this.maxFrame = 5;       
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        if((this.y > 50 - this.height - this.game.groundMargin) || this.y < -50) this.speedY *= -1;
    }
    draw(context, canvas)
    {
        super.draw(context,canvas);
        context.beginPath();
        context.moveTo((this.x + this.width / 2) / 100 * canvas.height + canvas.width / 2,0);
        context.lineTo((this.x + this.width / 2) / 100 * canvas.height + canvas.width / 2, (this.y + this.height / 3) / 100 * canvas.height + canvas.height / 2);
        context.stroke();
    }
}