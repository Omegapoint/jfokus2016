var agent_angle = 10;
var agent_force = 10;
var agent_memory = {};
var lastColission;  

var agent_2_angle = 10;
var agent_2_force = 10;
var agent_2_memory = {};

var nextTurn = false;
var player2Play = 1;


requirejs(

  // Dependencies ex: ['foo/bar', 'foobar'],
  ['app/app', 'agent'],

  // Module + passing of dependencies (if any)
  
  function ( App ) {
    document.getElementById('rules_info').style.display = 'none';
    document.getElementById('api_info').style.display = 'none';
    // Variable setup
    var app, p1angle, p1velocity, p2angle, p2velocity;

    app = new App();
    app.createScene();

    // Player 2 Information
    p2angle = document.getElementById( 'player_2_angle' );
    p2velocity = document.getElementById( 'player_2_velocity' );

    play = document.getElementById('play');
    executeBtn = document.getElementById('clickMe');
    rules = document.getElementById('rules');
    api = document.getElementById('api');

    rules.addEventListener("click", function(event) {
        if(document.getElementById('rules_info').style.display == 'none') {     
          document.getElementById('rules_info').style.display = 'block';
        } else {
          document.getElementById('rules_info').style.display = 'none';
        }
       
    });

    api.addEventListener("click", function(event) {
        if(document.getElementById('api_info').style.display == 'none') {     
          document.getElementById('api_info').style.display = 'block';
        } else {
          document.getElementById('api_info').style.display = 'none';
        }
       
    });

    play.addEventListener("click", function(event) {
        nextTurn = true;
        console.log("Let's play! :)");
        var currentPlayer = 1; //Player 1 starts
        var turn = 0;
        app.throwBanana( 10, 25, currentPlayer);
      
    });

    //This is where we get the variables from player 1
    executeBtn.addEventListener( "click", function ( event ) {
      executeTurn();
      app.throwBanana(parseInt(agent_force), parseInt(agent_angle), 1);
      executeBtn.disabled = true;
    });

    p2angle.addEventListener( "keydown", function ( event ) {
      if ( event.keyCode === 13 ) {
        app.clearTimeouts();
        window.showPlayerField( 'player_2', 'velocity' );
      }
    });

    p2velocity.addEventListener( "keydown", function ( event ) {
      if ( event.keyCode === 13 ) {
        window.hidePlayerField( 'player_2', 'angle' );
        window.hidePlayerField( 'player_2', 'velocity' );

        var parameters = window.readAngleAndVelocity( 'player_2' );
        window.clearFields( 'player_2' );
      

 
        var deltaX = app.player_2.x - app.player_1.x;
        var deltaY = app.player_1.y - app.player_2.y;
        var bananaHitPosition = [];
 
        if (app.player_1.banana) {
          var deltaBananaX = app.player_1.banana.x() - app.player_1.x;
          var deltaBananaY = app.player_1.y - app.player_1.banana.y();
          bananaHitPosition = [deltaBananaX, deltaBananaY];
        };
 
        runAgent(app.wind, [deltaX, deltaY], bananaHitPosition);

        app.throwBanana( parseInt(agent_force), parseInt(agent_angle), 2 );
        executeBtn.disabled = false;
      }
    });

    p2angle.style.display = 'none';
    p2angle.previousElementSibling.style.display = 'none';
    p2velocity.style.display = 'none';
    p2velocity.previousElementSibling.style.display = 'none';

    // Global app functions
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

