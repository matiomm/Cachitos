class Player {

    constructor(nick){
        this.nick = nick;
        this.dices = [rollDice(),rollDice(),rollDice(),rollDice(),rollDice()]
    }

    getNick = () => {
        return this.nick;
    };

    getLives = () => {
        let lives = 0;
        for i in this.dices{
            if (this.dices[i]!=null)
                lifes+=1;
        }
        return lives;
    }

    loseLife = () => {
        if (this.getLives()>0){
            this.dices[this.getLives()-1]=null;
        }
    }

    winLife = () => {
        if (0<this.getLives()<5){
            this.dices[this.getLives()]=rollDice();
        }
    }

    rollDices = () => {
        for i in this.dices{
            if (this.dices[i]!=null)
                this.dices[i]==rollDice();
        }
    }
}



function rollDice() {
    return 1 + Math.floor(Math.random()*6)
}