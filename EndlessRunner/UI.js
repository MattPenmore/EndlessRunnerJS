export class UI 
{
    constructor(game, canvas)
    {
        this.game = game;
        this.fontSize = canvas.height / 20;
        this.fontFamily = 'Helvetica';
        this.livesImage = document.getElementById('lives');
    }
    draw(context, canvas)
    {
        context.save();
        this.fontSize = canvas.height / 20;
        context.shadowOffsetX = 0.002 * canvas.height;
        context.shadowOffsetY = 0.002 * canvas.height;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColour;
        //score
        context.fillText('Score: ' + this.game.score, canvas.width / 25, canvas.height / 10);
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time/1000).toFixed(1), canvas.width / 25, canvas.height / 6.25)
        //lives
        for (let i = 0; i < this.game.lives; i++)
        {
            context.drawImage(this.livesImage, canvas.width / 25 + canvas.height * 0.05 * i, canvas.height * 0.19, canvas.height * 0.05, canvas.height * 0.05);
        }       
        //game over messages
        if (this.game.gameOver)
        {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > this.game.winningScore)
            {
                context.fillText('Win', canvas.width / 2, canvas.height / 2);
            }
            else
            {
                context.fillText('Lose', canvas.width / 2, canvas.height / 2);
            }
        }
        context.restore();
    }
}