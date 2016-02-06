highscoreTableUpdate();
requirejs(['app/app', 'agent'],
  function ( App ) {
    // Variable setup
    var app, p1angle, p1velocity;

    app = new App();
    app.createScene();


    play = document.getElementById('play');
    play.addEventListener("click", function(event) {
      document.getElementById('play').disable = true;
      savePlayerCode();
      if(!isValidPlayerInputCode()){
        return;
      }
      saveToGameCode();
      rounds = 1;
      app.scores['player_1'] = 0;
      app.scores['player_2'] = 0;
      app.updateScoreBoard();
      gameIsFinished = false;
      turnsLeft['player_1'] = 0;
      turnsLeft['player_1'] = 0;

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
