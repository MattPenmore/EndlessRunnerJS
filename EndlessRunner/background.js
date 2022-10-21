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
        this.x = -this.game.xhalfWidth;
        this.y = -0.5;
        this.distance = 0;
        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    update(deltaTime)
    {
        if(this.x < -this.width - this.game.xhalfWidth) this.x = -this.game.xhalfWidth;
        this.x -= this.game.speed * this.speedModifier * deltaTime / 1000;

        this.distance += this.game.speed * this.speedModifier * deltaTime / 1000;

        this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
        this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
    }
    draw(context)
    {
        context.drawImage(this.image, this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
        context.drawImage(this.image, this.pixelX + this.game.canvasHeight * this.width, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
    }
}

export class Background
{
    constructor(game)
    {
        this.game = game;
        this.spriteWidth = 2400;
        this.spriteHeight = 720;
        this.height = 1;
        this.width = this.height * this.spriteWidth / this.spriteHeight;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0.06, this.layer2image);
        this.layer3 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0.12, this.layer3image);
        this.layer4 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0.24, this.layer4image);
        this.layer5 = new Layer(this.game, this.spriteWidth, this.spriteHeight, this.height, 0.30, this.layer5image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    update(deltaTime)
    {
        this.backgroundLayers.forEach(layer => {
            layer.update(deltaTime);
        })
    }
    draw(context)
    {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}