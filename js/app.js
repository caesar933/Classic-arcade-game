let score = document.getElementById('score');
let points = 0;
let gemPoints = 0;
let gameLevel = 1;
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

//resets the bugs to their innitial position and increase their movement speed 
    if(this.x > 500){
        this.speed =100 + Math.floor(Math.random() * 120);
        this.x= -110;
    }
    
// checks the collision with the bugs
    if (player.x < this.x + 80 && 
        player.x + 80 > this.x && 
        player.y < this.y + 60 && 
        60 + player.y > this.y){
            player.x = 202;
            player.y = 405;
            score.innerHTML= "Score: 0";
            gems.innerHTML = "Gems: 0";
            level.innerHTML = "Level: 1";
            alert('You touched the bug! Try again!');
        }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.character = 'images/char-boy.png';
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

Player.prototype.update = function (dt) {

}


var OrangeGem = function (x,y){
    this.x = x;
    this.y = y;
    this.gem = 'images/GemOrange.png';
}

OrangeGem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gem), this.x, this.y);
}

//updates the gem position after the collision with the character happen
OrangeGem.prototype.update = function(){

    for(let j=0; j < allGems.length; j++){
            
        if (player.x < this.x + 80 && 
            player.x + 80 > this.x && 
            player.y < this.y + 60 && 
            60 + player.y > this.y){
                gemPoints+=1;
                gems.innerHTML= "Gems: "+gemPoints;
                allGems.splice(j, 1);
        }  
    }
}

var allEnemies = [];
var enemyLoc=[60, 145, 230];
enemyLoc.forEach(locationY => {
    enemy= new Enemy(-110, locationY, 150);
    allEnemies.push(enemy);
});
var player = new Player(202, 405);
var allGems = [];
var gemLoc = [240];
gemLoc.forEach(locationY =>{
    gemOrange = new OrangeGem (100, locationY);
    allGems.push(gemOrange);
})

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 105;
    }

    if (keyPress == 'right' && this.x < 405) {
        this.x += 105;
    }

    if (keyPress == 'down' && this.y < 380) {
        this.y += 85;
    }

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 85;
    }

//resets the player to the innitial position after the water was reached and the gem is repositioned

    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 100);
        points+=100;
        gameLevel +=1;
        score.innerHTML= "Score: "+points;
        level.innerHTML = "Level:"+gameLevel;
        allGems.splice(-1, 1);
        allGems.push(new OrangeGem(Math.floor(Math.random() * 422), Math.floor(Math.random() * 180)));
    }
};
