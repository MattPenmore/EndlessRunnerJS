import {Dust, Splash, Fire} from './particles.js';

let jumpVelocity = 3;

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6

}

class State {
    constructor(state, game)
    {
        this.state = state;
        this.game = game;
        this.animTime = 16;
        this.timeToAnim = 0;
    }
}

export class Sitting extends State
{
    constructor(game)
    {
        super('SITTING', game);
    }
    enter()
    {
        this.game.player.maxFrame = 4;
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
    }
    handleInput(input, deltaTime)
    {
        if(input.includes('ArrowLeft') || input.includes('ArrowRight'))
        {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (input.includes('Enter'))
        {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State
{
    constructor(game)
    {
        super('RUNNING', game);
    }
    enter()
    {
        this.game.player.maxFrame = 8;
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
    }
    handleInput(input, deltaTime)
    {
        this.timeToAnim -= deltaTime;
        if(this.timeToAnim <= 0)
        {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x, this.game.player.y));
            this.timeToAnim = this.animTime;
        }

        if(input.includes('ArrowDown') && !(input.includes('ArrowLeft') || input.includes('ArrowRight')))
        {
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.includes('ArrowUp'))
        {
            this.game.player.setState(states.JUMPING, 1);
        }
        else if (input.includes('Enter'))
        {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State
{
    constructor(game)
    {
        super('JUMPING', game);
    }
    enter()
    {
        if(this.game.player.onGround()) this.game.player.vy -= jumpVelocity;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
    }
    handleInput(input, deltaTime)
    {
        if (this.game.player.vy > this.game.player.weight)
        {
            this.game.player.setState(states.FALLING, 1);
        }
        else if (input.includes('Enter'))
        {
            this.game.player.setState(states.ROLLING, 2);
        }
        else if (input.includes('ArrowDown'))
        {
            this.game.player.setState(states.DIVING, this.game.speed / this.game.maxSpeed);
        }
    }
}

export class Falling extends State
{
    constructor(game)
    {
        super('FALLING', game);
    }
    enter()
    {
        if(this.game.player.onGround()) this.game.player.vy -= 4;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
    }
    handleInput(input, deltaTime)
    {
        if (this.game.player.onGround())
        {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (input.includes('ArrowDown'))
        {
            this.game.player.setState(states.DIVING, this.game.speed / this.game.maxSpeed);
        }
    }
}

export class Rolling extends State
{
    constructor(game)
    {
        super('ROLLING', game);
    }
    enter()
    {
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
    }
    handleInput(input, deltaTime)
    {
        this.timeToAnim -= deltaTime;
        if(this.timeToAnim <= 0)
        {
            this.game.particles.unshift(new Fire(this.game, this.game.player.x, this.game.player.y));
            this.timeToAnim = this.animTime;
        }
        
        if (!input.includes('Enter') && this.game.player.onGround())
        {
            this.game.player.setState(states.RUNNING, 1);
        }
        else if (!input.includes('Enter') && !this.game.player.onGround())
        {
            this.game.player.setState(states.FALLING, 1);
        }
        else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround())
        {
            this.game.player.vy -= jumpVelocity;
        }
        else if (input.includes('ArrowDown') && !this.game.player.onGround())
        {
            this.game.player.setState(states.DIVING, this.game.speed / this.game.maxSpeed);
        }
    }
}

export class Diving extends State
{
    constructor(game)
    {
        super('DIVING', game);
    }
    enter()
    {
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.vy = 1.50;
    }
    handleInput(input, deltaTime)
    {
        this.timeToAnim -= deltaTime;
        if(this.timeToAnim <= 0)
        {
            this.game.particles.unshift(new Fire(this.game, this.game.player.x, this.game.player.y));
            this.timeToAnim = this.animTime;
        }

        if (this.game.player.onGround())
        {
            if(input.includes('Enter'))
            {
                this.game.player.setState(states.ROLLING, 2);
            }
            else
            {
            this.game.player.setState(states.RUNNING, 1);
            }
            for(let i = 0; i < 100 ; i++)
            {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x, this.game.player.y));
            }
        }
        
    }
}

export class Hit extends State
{
    constructor(game)
    {
        super('HIT', game);
    }
    enter()
    {
        this.game.player.maxFrame = 10;
        this.game.player.frameX = 0;
        this.game.player.frameY = 4;
    }
    handleInput(input)
    {
        if(this.game.player.frameX >= this.game.player.maxFrame)
        {
            if(this.game.player.onGround())
            {
                this.game.player.setState(states.RUNNING, 1);
            }
            else
            {
                this.game.player.setState(states.FALLING, 1);
            }
        }
    }
}