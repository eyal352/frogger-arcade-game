// Enemies our player must avoid
var Enemy = function() {

  // Set the enemy's inital location and speed
  this.x = 0;
  this.y = Enemy.randomNumber([60,140,220]);
  this.speed = Enemy.randomNumber([50,100,200,300]);

  // The image/sprite for our enemies
  this.sprite = 'images/enemy-bug.png';
};


Enemy.randomNumber = function(possibleValues){
    var randomStartingPosition = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomStartingPosition];
};

  
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplying movement by the dt parameter, ensuring the game runs at the same speed for all computers.
  this.x += (this.speed)*dt;
    // Once the enemy moves off the screen, it will respawn
  if(this.x > 500){
    this.x = 0;
    this.y = Enemy.randomNumber([60,140,220]);
    this.speed = Enemy.randomNumber([75,100,200,300,400]);
    //console.log(this);
  }
};

// Drawing the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Placing the player object in a variable called Player
var Player = function() {
  // players initial location
    this.x = 200;
    this.y = 400;
  //character image
  this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function() {
  //update the player position and check collision
  allEnemies.forEach(function(enemy){
    if(enemy.x >= player.x - 50 && enemy.x <= player.x + 60) {
      if (enemy.y >= player.y -20 && enemy.y <= player.y + 20){
        // upon collision, player and score are reset
        player.reset();
        score = 0;
    }}
  })

  // Display current score and message
  function showScore(s) {
    var currentScore = document.getElementById('score');
    currentScore.innerHTML = s;

    var playerMessage = document.getElementById('message');

    if(s >= 3 && s <= 4){
      playerMessage.innerHTML = "Doing Great!"}
      else if(s >= 5){
        playerMessage.innerHTML = "You're Killing it!"}
        else {playerMessage.innerHTML = ""}
  }
  showScore(score);
  };


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // Handle movement and borders
  if(key === 'left'){
    if(this.x <= 0){
      this.x = 0;
    } else {this.x -= 100;}
  }
  if(key === 'right'){
    if(this.x >= 380){
      this.x = 400;
    } else {this.x += 100;}
  }
  if(key === 'up'){
    if(this.y <= 50){
    // player reaches water, score is increased, location reset
      player.reset();
      score++;
    } else{this.y -= 90;}
  }
  if(key === 'down'){
    if(this.y >= 400){
      this.y = 400;}
    else{
      this.y += 90;}
    }
  };

//instantiating PLayer and Enemy objects.
var player = new Player;

var enemy = new Enemy();
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy, enemy1, enemy2, enemy3];

var score = 0;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
