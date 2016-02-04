var agent_angle = Number.MIN_VALUE;
var agent_force = Number.MIN_VALUE;
var agent_memory = {};
var lastColission;

var agent_2_angle = 10;
var agent_2_force = 10;
var agent_2_memory = {};

var nextTurn = false;
var player2Play = 1;

var turnsInGame = 0;      //The number of games in each round
var maximumNumberOfTurns = 10;
var turnsLeft = {player_1: 0,player_2: 0};

var rounds = 0;           //Starting round
var roundsInGame = 3;     //The total number of rounds in a game.
var nThrows = {player_1: 0,player_2: 0}; //How many throws for each pal

var gameIsFinished = false; //Variable for controlling the state of the game
document.getElementById("player_1_name").innerHTML = JSON.parse(localStorage['currentPlayer']).name;
var templateStartCode = ""+
  "function runPlayer(lastBananaHit, opponent, wind, memory){\n"+
  "  var angle = 30 + opponent['y'];\n"+
  "  var velocity = 5 - wind + (opponent['x'] * 0.05);\n"+
  "  var returnValues = new Object();\n"+
  "\n"+
  "  returnValues['velocity'] = velocity;\n"+
  "  returnValues['angle'] = angle;"+
  "  returnValues['memory'] = \"OP Gorillas is fun! :)\";\n"+
  "  return returnValues;\n"+
  "};\n";

highscoreList = [{
  name :'Omegapoint',
  email:'info@omegapoint.se',
  code : templateStartCode+"//By OP",
  score:5
},{
  name :'Anna',
  email:'anna@panna.se',
  code :templateStartCode+"//By Me",
  score:13
},{
  name  :'NoOne',
  email :'noone@was.here',
  code  :templateStartCode+"//By no one",
  score :15
}];
localStorage['highscoreList'] = JSON.stringify(highscoreList);

savedPlayerCode = [{
  email:'info@omegapoint.se',
  code : templateStartCode+"//By test OP"
},{
  email :'anna@panna.se',
  code :templateStartCode+"//By test Me"
},{
  email :'noone@was.here',
  code  :templateStartCode+"//By test no one"
}];
localStorage['savedPlayerCode'] = JSON.stringify(savedPlayerCode);

highscoreTableUpdate();

requirejs(

  // Dependencies ex: ['foo/bar', 'foobar'],
  ['app/app', 'agent'],

  // Module + passing of dependencies (if any)

  function ( App ) {
    // Variable setup
    var app, p1angle, p1velocity;

    app = new App();
    app.createScene();


    play = document.getElementById('play');
    play.addEventListener("click", function(event) {
      savePlayerCode();
      rounds  = 0;
      app.scores['player_1'] = 0;
      app.scores['player_2'] = 0;

      turnsInGame = 0;
      gameIsFinished = false;
      turnsLeft['player_1'] = 0;
      turnsLeft['player_1'] = 0;
      nextTurn = true;

      var playerWind = app.wind.windSpeed;

        var currentPlayer = 1; //Player 1 starts
        var turn = 0;

         var deltaX = app.player_2.x - app.player_1.x;
        var deltaY = app.player_1.y - app.player_2.y;
            var playerPos = [deltaX, deltaY];


        var bananaHitPosition = [0,0];

        if (app.player_1.banana && app.player_2.banana) {
          var deltaBananaX =  app.player_2.x - app.player_2.banana.x();
          var deltaBananaY = app.player_2.banana.y() - app.player_2.y ;
          bananaHitPosition = [deltaBananaX, deltaBananaY];
        }


        executeTurn(playerPos, bananaHitPosition, playerWind);

        app.throwBanana(agent_force, agent_angle, currentPlayer);

    });

    //This is where we get the variables from player 1


    // Global appfunctions
    // TODO: find a better solution for these
    // May create an event module to listen / fire events
    window.hidePlayerField = function ( player, field ) {
      var el = document.getElementById( player + '_' + field );
      el.style.display = "none";
      el.previousElementSibling.style.display = "none";
    }

    window.showPlayerField = function ( player, field ) {

    }

    window.readAngleAndVelocity = function ( player ) {
      return {
        angle: document.getElementById( player + '_angle' ).value,
        velocity: document.getElementById( player + '_velocity' ).value
      };
    }

    window.clearFields = function ( player ) {
      document.getElementById( player + '_angle' ).value = '';
      document.getElementById( player + '_velocity' ).value = '';
    }
});
