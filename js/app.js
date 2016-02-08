highscoreTableUpdate();
requirejs(['app/app', 'agent'],
  function ( App ) {
    // Variable setup
    var app, p1angle, p1velocity;

    app = new App();
    app.createScene();


    play = document.getElementById('play');
    play.addEventListener("click", function(event) {
      document.getElementById('new_player_btn').disabled = true;
      document.getElementById('play').disable = true;
      document.getElementById('stop').disable = false;
      savePlayerCode();
      saveToGameCode();
      rounds = 1;
      
      turnsInGame = 0;
      app.rounds = 1;
      app.updateScoreBoard();
      app.scores['player_1'] = 0;
      app.scores['player_2'] = 0;
      
      turnsLeft = {player_1: 0,player_2: 0};
      nextTurn = true;

      var playerWind = app.wind.windSpeed;

        var currentPlayer = 1; //Player 1 starts
        var turn = 0;

        var deltaX = app.player_2.x - app.player_1.x;
        var deltaY = app.player_1.y - app.player_2.y;
            var playerPos = [deltaX, deltaY];


        var bananaHitPosition = [0,0];
        var bHP = new Object();
        bHP['x'] = null;
        bHP['y'] = null;

        if (app.player_1.banana) {
          bHP['x'] =  app.player_1.x - app.player_1.banana.x();
          bHP['y'] = app.player_1.banana.y() - app.player_1.y ;
        }

        gameIsFinished = false;
        isGameRunning = true;


        executeTurn(playerPos, bHP, playerWind);

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
