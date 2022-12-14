import {Sitting, Running, Jumping, Falling, Rolling, Diving, Hit} from './playerStates.js';
import {CollisionAnimation} from './collisionAnimation.js';
import {FloatingMessage} from './floatingMessages.js';

export class Player 
{
        constructor(game)
        {
            this.game = game;
            this.height = 9 / 50;
            this.spriteWidth = 100;
            this.spriteHeight = 91.3;
            this.width = this.height * this.spriteWidth / this.spriteHeight;
            this.x = -this.game.xhalfWidth;
            this.y = 0.5 - this.height - this.game.groundMargin;
            this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
            this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
            this.vy = 0;
            this.weight = 0.12;
            this.image = document.getElementById('player');
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 6;
            this.fps = 20;
            this.frameInterval = 1000/this.fps;
            this.frameTimer = 0;
            this.speed = 0;
            this.maxSpeed = 0.4;
            this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];   
            this.currentState = null;
        }
        update(input, deltaTime)
        {      
            this.checkCollision();
            this.currentState.handleInput(input, deltaTime);
            //horizontal movement
            this.x += this.speed * deltaTime / 1000;
            if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
            else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = - this.maxSpeed;
            else this.speed = 0;           
            //vertical movement
            this.y += this.vy * deltaTime / 1000;
            if(!this.onGround()) this.vy += this.weight * deltaTime / 16;
            else this.vy = 0;
            //Boundaries
            if(this.x < -this.game.xhalfWidth) this.x = -this.game.xhalfWidth;
            if(this.x > this.game.xhalfWidth - this.width) this.x = this.game.xhalfWidth - this.width;
            if(this.y > 0.5 - this.height - this.game.groundMargin) this.y = 0.5 - this.height - this.game.groundMargin;
            // sprite animation
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
            this.pixelX = this.x * this.game.canvasHeight + this.game.xCenter;
            this.pixelY = this.y * this.game.canvasHeight + this.game.yCenter;
        }
        draw(context)
        {
            if (this.game.debug) context.strokeRect(this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.pixelX, this.pixelY, this.width * this.game.canvasHeight, this.height * this.game.canvasHeight);           
        }
        onGround()
        {
            return this.y >= 0.5 - this.height - this.game.groundMargin;
        }
        setState(state, speed){
            this.currentState = this.states[state];
            this.game.speed = this.game.maxSpeed * speed;
            this.currentState.enter();
        }
        checkCollision()
        {
            this.game.enemies.forEach(enemy => {
                if (enemy.x < this.x + this.width &&
                    enemy.x + enemy.width > this.x &&
                    enemy.y < this.y + this.height &&
                    enemy.y + enemy.height > this.y)
                {
                    //collision detected
                    enemy.markedForDeletion = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    if (this.currentState === this.states[4] || this.currentState === this.states[5])
                    {
                        this.game.score++;
                        this.game.floatingMessages.push(new FloatingMessage('+1', this.x, this.y, -60, -40, this.game));
                    }
                    else
                    {
                        this.setState(6, 0);
                        this.game.lives--;
                        if (this.game.lives <= 0) this.game.gameOver = true;
                    }
                }
            });
        }
}