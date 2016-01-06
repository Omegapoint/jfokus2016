var agent_angle = 10;
var agent_force = 10;  

requirejs(

  // Dependencies ex: ['foo/bar', 'foobar'],
  ['app/app', 'agent'],

  // Module + passing of dependencies (if any)
  
  function ( App ) {

    // Variable setup
    var app, p1angle, p1velocity, p2angle, p2velocity;

    app = new App();
    app.createScene();

    // Player 2 Information
    p2angle = document.getElementById( 'player_2_angle' );
    p2velocity = document.getElementById( 'player_2_velocity' );

    executeBtn = document.getElementById('clickMe');

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
        app.throwBanana( parseInt(parameters.velocity), parseInt(parameters.angle), 2 );
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
      var el = document.getElementById( player + '_' + field );
      el.style.display = "block";
      el.previousElementSibling.style.display = "block";
      el.focus();
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

