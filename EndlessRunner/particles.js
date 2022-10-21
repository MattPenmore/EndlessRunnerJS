class Particle
{
    constructor(game)
    {
        this.game = game;
        this.markedForDeletion = false;
        this.livedTime = 0;
    }
    update(deltaTime)
    {
        this.x -= (this.speedX + this.game.speed / 100) * deltaTime / 16;
        this.y -= this.speedY * deltaTime / 16;
        this.livedTime += deltaTime;
        this.size = this.baseSize * Math.pow((this.lifeTime - this.livedTime)/ (this.lifeTime), 2);
        if (this.livedTime >= this.lifeTime) this.markedForDeletion = true;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
}

export class Dust extends Particle
{
    constructor(game, x, y)
    {
        super(game);
        this.baseSize = (Math.random() + 1)  / 100;
        this.x = x;
        this.y = y;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.speedX = Math.random() * 0.005;
        this.speedY = Math.random() * 0.005;
        this.colour = 'rgba(0,0,0,0.2)';
        this.lifeTime = 1000;
    }
    draw(context)
    {
        context.beginPath();
        context.arc(this.pixelX + this.game.player.width / 2 * this.game.canvasHeight, this.pixelY + this.game.player.height * this.game.canvasHeight, this.size * this.game.canvasHeight, 0, Math.PI * 2);
        context.fillStyle = this.colour;
        context.fill();
    }
}

export class Splash extends Particle
{
    constructor(game, x, y)
    {
        super(game);
        this.image = document.getElementById('fire');
        this.baseSize = (Math.random() * 10 + 10) / 100;
        this.x = x;
        this.y = y;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.speedX = Math.random() * 0.01 - 0.005;
        this.speedY = Math.random() * 0.01 + 0.01;
        this.gravity = 0.0003;
        this.lifeTime = 1000;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.speedY -= this.gravity * deltaTime / 16;
 
    }
    draw(context)
    {
        context.drawImage(this.image, this.pixelX + (this.game.player.width / 2 - this.size / 2) * this.game.canvasHeight, this.pixelY + (this.game.player.height - this.size / 2) * this.game.canvasHeight, this.size * this.game.canvasHeight, this.size * this.game.canvasHeight);
    }
}

export class Fire extends Particle
{
    constructor(game, x, y)
    {
        super(game);
        this.image = document.getElementById('fire');
        this.baseSize = (Math.random() * 10 + 10) / 100;
        this.x = x;
        this.y = y;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        this.speedX = 0.001;
        this.speedY = 0.001;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.lifeTime = 1000;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.angle += this.va * deltaTime / 16;
        this.x += Math.sin(this.angle * 10) * deltaTime / 1600;
 
    }
    draw(context)
    {
        context.save();
        context.translate(this.pixelX + (this.game.player.width / 1.7 - this.size / 2) * this.game.canvasHeight, this.pixelY + (this.game.player.height / 1.7 - this.size / 2) * this.game.canvasHeight);
        context.rotate(this.angle);
        context.drawImage(this.image, 0, 0, this.size * this.game.canvasHeight, this.size * this.game.canvasHeight);
        context.restore();
    }
}