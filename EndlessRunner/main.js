/** @type {HTMLCanvasElement} */

import {Player} from './Player.js';
import {InputHandler} from './input.js';
import {Background} from './background.js';
import {FlyingEnemy, GroundEnemy, ClimbingEnemy} from './enemies.js';
import {UI} from './UI.js';

function positionCanvas(){
    
    ctx.canvas.height = window.innerHeight * 0.95;
    ctx.canvas.width  = ctx.canvas.height * 1.8;
    canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + 'px';
    canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + 'px';   
}

const canvas = document.getElementById("myCanvas");
canvas.style.position = 'absolute';
const ctx = canvas.getContext("2d");

// attach position canvas method to window resize event
window.addEventListener('resize', positionCanvas);
// call it for the first time
positionCanvas();

window.addEventListener('load', function(){
    class Game {
        constructor()
        {
            this.groundMargin = 16;
            this.speed = 0;
            this.maxSpeed = 1;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this, canvas);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.enemyTimerFlying = 0;
            this.enemyIntervalFlying = 3000;
            this.enemyDistanceStatic = 100;
            this.debug = false;
            this.score = 0;
            this.winningScore = 5;
            this.fontColour = 'black';
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.maxParticles = 200;
            
        }
        update(deltaTime)
        {
            if(!game.gameOver)
            {
                this.time += deltaTime;
                if (this.time > this.maxTime) this.gameOver = true;
                this.background.update(deltaTime);
                this.player.update(this.input.keys, deltaTime);
                //handle enemies
                //Timer different dependant on game speed to keep average distance between enemies relatively constant
                if(this.enemyTimerFlying > this.enemyIntervalFlying - Math.sqrt(this.speed) * 1500)
                {
                    this.addEnemy(FlyingEnemy);
                    this.enemyTimerFlying = 0;
                }
                else
                {
                    this.enemyTimerFlying += deltaTime;
                }
                //Add a spider or plant every set distance
                if(this.enemyDistanceStatic < this.background.layer5.distance)
                {
                    if(Math.random() < 0.5) this.addEnemy(GroundEnemy);
                    else this.addEnemy(ClimbingEnemy);
                    this.background.layer5.distance = 0;
                }
    
                this.enemies.forEach( enemy => {
                    enemy.update(deltaTime);
                });
                //handle messages
                this.floatingMessages.forEach( message => {
                    message.update(deltaTime);
                });                   
                //handle particles
                this.particles.forEach((particle, index) => {
                    particle.update(deltaTime);
                });
                if(this.particles.length > this.maxParticles)
                {
                    this.particles.length = this.maxParticles;
                }
                //handle collision sprites
                this.collisions.forEach((collision, index) => {
                    collision.update(deltaTime)
                })
                this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
                this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
                this.particles = this.particles.filter(particle => !particle.markedForDeletion);
                this.collisions = this.collisions.filter(collision => !collision.markedForDeletion); 
            }
        }
        draw(context)
        {
            this.background.draw(context, canvas);
            this.player.draw(context, canvas);
            this.enemies.forEach( enemy => {
                enemy.draw(context, canvas);
            })
            this.particles.forEach((particle, index) => {
                particle.draw(context, canvas);
                
            });
            this.collisions.forEach((collision, index) => {
                collision.draw(context, canvas);
            });
            this.floatingMessages.forEach( message => {
                message.draw(context, canvas);
            }); 
            this.UI.draw(context,canvas);
        }
        addEnemy(type)
        {
            this.enemies.push(new type(this));
        }
    }

    const game = new Game();
    let lastTime = 0;
    function animate(timeStamp)
    {
        let deltaTime = timeStamp - lastTime;
        if(deltaTime > 200) deltaTime = 0;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});