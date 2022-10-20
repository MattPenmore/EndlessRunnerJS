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
        this.x -= (this.speedX + this.game.speed) * deltaTime / 16;
        this.y -= this.speedY * deltaTime / 16;
        this.livedTime += deltaTime;
        this.size = this.baseSize * Math.pow((this.lifeTime - this.livedTime)/ (this.lifeTime), 2);
        if (this.livedTime >= this.lifeTime) this.markedForDeletion = true;

    }
    draw()
    {

    }
}

export class Dust extends Particle
{
    constructor(game, x, y)
    {
        super(game);
        this.baseSize = Math.random() * 1 + 1;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 0.5;
        this.speedY = Math.random() * 0.5;
        this.colour = 'rgba(0,0,0,0.2)';
        this.lifeTime = 1000;
    }
    draw(context, canvas)
    {
        context.beginPath();
        context.arc((this.x + this.game.player.width / 2) / 100 * canvas.height + canvas.width / 2, (this.y + this.game.player.height) / 100 * canvas.height + canvas.height / 2, this.size * canvas.height / 100, 0, Math.PI * 2);
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
        this.baseSize = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 + 1;
        this.gravity = 0.03;
        this.lifeTime = 1000;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.speedY -= this.gravity * deltaTime / 16;
 
    }
    draw(context, canvas)
    {
        context.drawImage(this.image, (this.x + this.game.player.width / 2 - this.size / 2) / 100 * canvas.height + canvas.width / 2, (this.y + this.game.player.height - this.size / 2) / 100 * canvas.height + canvas.height / 2, canvas.height * this.size / 100,  canvas.height * this.size / 100);
    }
}

export class Fire extends Particle
{
    constructor(game, x, y)
    {
        super(game);
        this.image = document.getElementById('fire');
        this.baseSize = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = 0.1;
        this.speedY = 0.1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.lifeTime = 1000;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.angle += this.va * deltaTime / 16;
        this.x += Math.sin(this.angle * 10) * deltaTime / 16;
 
    }
    draw(context, canvas)
    {
        context.save();
        context.translate((this.x + this.game.player.width / 1.7 - this.size / 2) / 100 * canvas.height + canvas.width / 2, (this.y + this.game.player.height / 1.7 - this.size / 2) / 100 * canvas.height + canvas.height / 2);
        context.rotate(this.angle);
        context.drawImage(this.image, 0, 0, canvas.height * this.size / 100,  canvas.height * this.size / 100);
        context.restore();
    }
}