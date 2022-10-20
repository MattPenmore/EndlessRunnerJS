class Layer 
{
    constructor(game, spriteWidth, spriteHeight, height,speedModifier, image)
    {
        this.game = game;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.height = height;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = -90;
        this.y = -50;
        this.distance = 0;
    }
    update(deltaTime)
    {
        if(this.x < -this.width - 90) this.x = -90;
        this.x -= this.game.speed * this.speedModifier * deltaTime / 1000;

        this.distance += this.game.speed * this.speedModifier * deltaTime / 1000;
    }
    draw(context, canvas)
    {
        context.drawImage(this.image, this.x / 100 * canvas.height + canvas.width / 2, this.y / 100 * canvas.height + canvas.height / 2, canvas.height * this.width / 100, canvas.height * this.height / 100);
        context.drawImage(this.image, this.x / 100 * canvas.height + canvas.width / 2 + canvas.height * this.width / 100, this.y / 100 * canvas.height + canvas.height / 2, canvas.height * this.width / 100, canvas.height * this.height / 100);
    }
}

export class Background
{
    constructor(game, canvas)
    {
        this.game = game;
        this.spriteWidth = 2400;
        this.spriteHeight = 720;
        this.height = 100;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 6, this.layer2image);
        this.layer3 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 12, this.layer3image);
        this.layer4 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 24, this.layer4image);
        this.layer5 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 30, this.layer5image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    update(deltaTime)
    {
        this.backgroundLayers.forEach(layer => {
            layer.update(deltaTime);
        })
    }
    draw(context, canvas)
    {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context, canvas);
        })
    }
}