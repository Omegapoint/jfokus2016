define(

    // Dependencies ex: ['foo/bar', 'foobar'],
    ['objects/wind', 'objects/sun', 'objects/building', 'objects/gorilla'],

    // Module + passing of dependencies (if any)
    function(Wind, Sun, Building, Gorilla) {

        // App Constructor
        function App() {
            this.audioBanana = new Audio('audio/banana.wav');
            this.audioHit = new Audio('audio/hit.wav');
            this.audioHitSun = new Audio('audio/sun_hit.ogg');
            this.audioWinner = new Audio('audio/winner.wav');
            this.audioLoser = new Audio('audio/losing.wav');
            this.audioNewRound = new Audio('audio/level-up.wav');
            this.empty = true;
            this.canvas = document.getElementById('canvas');
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.context = this.canvas.getContext('2d');
            this.sunShock = false;
            this.winner = [];
            this.scores = {
                player_1: 0,
                player_2: 0
            };
            this.buildings = [];
            this.frameRate = 15; // Note, this may change
            this.wind = new Wind(this.context);
            this.updateScoreBoard();
        }


        /**
         * createScene: Sets up and rerenders the main scene
         */
        App.prototype.createScene = function() {
            this.clear();
            this.createSun();
            if (this.empty) {

                this.empty = false;
                this.createBuildings();
                this.createGorillas();
                this.wind = new Wind(this.context);
            } else {
                this.reCreateBuildings();
                this.reCreateColissions();
                this.reCreateGorillas();
            }
            this.wind.create();
        };

        /**
         * createBuildings: Begins building construction
         * We continue to build until we reach the end of the screen
         */
        App.prototype.createBuildings = function() {
            var position = 0;
            while (position < this.width) {
                var building = this.createBuilding(position);
                position = building.endPosition();
            }
        };

        /**
         * createBuilding: Builds individual building
         * param {Integer} x The position to start building
         * returns {Object} building Returns a new building object
         */
        App.prototype.createBuilding = function(x) {
            var building = new Building(this.context, this.height);
            var y = Math.floor(Math.random() * 150);
            building.create(x, y);
            this.buildings.push(building);
            return building;
        };

        /**
         * reCreateBuildings: start re-creating our buildings
         */
        App.prototype.reCreateBuildings = function() {
            for (var i = 0; i < this.buildings.length; i++) {
                this.buildings[i].reCreate();
            }
        };

        /**
         * reCreateCollions: start re-creating our destruction
         */
        App.prototype.reCreateColissions = function() {
            for (var i = 0; i < this.buildings.length; i++) {
                this.buildings[i].reCreateColissions();
            }
        };

        /**
         * createSun: Builds the happy/shocked sun
         */
        App.prototype.createSun = function() {
            var sun = new Sun(this.context);
            if (this.sunShock) {
                sun.create(true);
            } else {
                sun.create();
            }
        };

        /**
         * clear: Reset the canvas
         */
        App.prototype.clear = function() {
            return this.canvas.width = this.canvas.width;
        };

        /**
         * clearTimeout: does what it says
         */
        App.prototype.clearTimeouts = function() {
            clearTimeout(this.timeout);
        };

        /**
         * createGorillas: Builds out Player_1 && Player_2
         */
        App.prototype.createGorillas = function() {
            var buildingOnePosition, buildingTwoPosition, building;

            // Build and position Player_1
            buildingOnePosition = Math.floor(Math.random() * this.buildings.length / 2);
            building = this.buildings[buildingOnePosition];
            this.player_1 = new Gorilla(this.context, 1);
            this.player_1.create(building.middlePosition(), building.positionAtY());

            // Build and position Player_2
            buildingTwoPosition = Math.floor(Math.random() * (this.buildings.length - 2 - buildingOnePosition)) + buildingOnePosition + 1;
            building = this.buildings[buildingTwoPosition];
            this.player_2 = new Gorilla(this.context, 2);
            this.player_2.create(building.middlePosition(), building.positionAtY());
        };

        /**
         * reCreateGorillas: Re-Build players on reCreate
         */
        App.prototype.reCreateGorillas = function() {
            this.player_1.reCreate();
            this.player_2.reCreate();
        };

        /**
         * throwBanana: Start the banana animation
         * params {Integer} force Input from user for velocity
         * params {Integer} angle Input from user for Angle
         * params {Integer} player Which player are we doing this for?
         */
        App.prototype.throwBanana = function(force, angle, player) {
            this.audioBanana.play();
            var that = this;
            if (player === 2) {
                angle = -angle;
                force = -force;
            }
            player = this['player_' + player];
            player.getBanana(force, angle, this.wind.windSpeed);
            this.timeout = setTimeout(function() {
                that.startTime = new Date();
                that.animateBanana(player, that.startTime);
            }, this.frameRate);
            agent_2_memory.lastThrow = undefined;
            return 5;
        };

        App.prototype.updateScoreBoard = function() {
            document.getElementById('player_2_score').innerHTML=this.scores.player_2;
            document.getElementById('player_1_score').innerHTML=this.scores.player_1;
            document.getElementById('round_nr').innerHTML=rounds;
            if (rounds == 1) {
              this.updateThrows(0);
            }
        };
        App.prototype.updateThrows = function(nbr) {
            document.getElementById('throw_nr').innerHTML=nbr;
        };

        /**
         * animateBanana: Draw the banana across the screen until we have hit something
         * params {Object} player Which player is this banana coming from?
         */
        App.prototype.animateBanana = function(player) {
            var that, now, time;
            that = this;
            this.timeout = setTimeout(function() {
                that.createScene();
                if (that.bananaHitSun(player)) that.sunShock = true;
                if (that.bananaHitGorilla(player)) return;
                if (that.bananaHasHit(player)) {
                    that.nextPlayerTurn(player);
                    return;
                }
                if (that.withinBoundries(player.banana.x(), player.banana.y()) === false) {
                    that.nextPlayerTurn(player);
                    return;
                }
                now = new Date();
                time = now - that.startTime;

                player.throwBanana(time / 1000);
                that.animateBanana(player);
            }, this.frameRate);
        };

        /**
         * bananaHitSun: Check if the banana has passed through the sun
         * params {Object} player Which player is throwing this banana
         * returns {Boolean}
         */
        App.prototype.bananaHitSun = function(player) {
            var x = player.banana.x();
            var y = player.banana.y();
            if (x <= (this.width / 2) + 10 && x >= (this.width / 2) - 10 && y <= 27 && y >= 17) {
                this.scores['player_' + player.playerNumber] = this.scores['player_' + player.playerNumber] + 5;
                this.audioHitSun.play();
                this.updateScoreBoard();
                return true;
            }
            return false;
        };

        /**
         * bananaHasHit: Did we hit something?
         * params {Object} player Which player was throwing said banana
         * returns {Boolean}
         */
        App.prototype.bananaHasHit = function(player) {
            var x = player.banana.x();
            var y = player.banana.y();
            for (var i = 0; i < this.buildings.length; i++) {
                if (this.buildings[i].checkColission(x, y)){
                    this.audioHit.play();
                    return true;
                }
            }
            return false;
        };


        /**
         * bananaHitGorilla: Check if banana has hit a player
         * params {Object} player Which player tossed the banana
         * returns {Boolean}
         */
        App.prototype.bananaHitGorilla = function(player) {
            var that = this;
            var x = player.banana.x();
            var y = player.banana.y();
            if (this.player_2.checkColission(x, y) || this.player_1.checkColission(x, y)) {
                var deadPlayer = (this.player_2.dead === true) ? this.player_2 : this.player_1;
                var winner = (this.player_2.dead === false) ? this.player_2 : this.player_1;
                this.winner.push(winner.playerNumber);
                this.timeout = setTimeout(function() {
                    that.animateColission(deadPlayer);
                }, 5);
                this.scores['player_' + winner.playerNumber] = this.scores['player_' + winner.playerNumber] + 10 - turnsLeft['player_' + winner.playerNumber];
                this.updateScoreBoard();
                rounds++;
                if (rounds > roundsInGame) {
                    var w = null;
                    var winningScore = null;
                    if (this.scores[1] > this.scores[2]) {
                        this.audioWinner.play();
                        w = "1";
                        winningScore = this.scores[1];
                    } else if(this.scores[1] == this.scores[2]) {
                        this.audioLoser.play();
                    } else {
                        this.audioLoser.play();
                        w = "2";
                        winningScore = this.scores[2];
                    }
                    var scoreToSave = this.scores['player_1'] - this.scores['player_2'];
                    var scoreDiff = Math.abs(scoreToSave);
                    gameIsFinished = true;
                    var currentPlayer = JSON.parse(localStorage["currentPlayer"]);
                    var jsonToSave = {
                        'name' : currentPlayer.name ,
                        'email': currentPlayer.email,
                        'score': scoreToSave,
                        'code' : currentPlayer.code
                    };

                    var highscoreList = JSON.parse(localStorage['highscoreList']);
                    highscoreList.push(jsonToSave);
                    localStorage['highscoreList'] = JSON.stringify(highscoreList);
                    highscoreTableUpdate();

                    if(w == 1){
                        w = currentPlayer.name;
                    }else{
                        w = "CPU";
                    }
                    openModalWith("The winner is " + w + "<br>Score: " + scoreDiff);

                    //TODO: Uncomment if you want to have a json as highscore backup ;)
                    // var textToSave = JSON.stringify(highscoreList);
                    // var filename = 'scores-'+Date.now()+".json";
                    // var doc1 = document.createElement('a');
                    // doc1.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(textToSave));
                    // doc1.setAttribute('download', filename);
                    // doc1.click();
                }else{
                    this.audioNewRound.play();
                }
                this.updateScoreBoard();
                this.timeout = setTimeout(function() {
                    that.startTime = new Date();
                    winner.animate = true;
                    that.createScene();
                    player.animateWin();
                    that.animateWin(winner, that.startTime);
                }, this.frameRate);

                return true;
            }
        };

        /**
         * animateColission: fire off explosson
         * params {Object} player Player that was hit
         */
        App.prototype.animateColission = function(player) {
            var that = this;
            this.timeout = setTimeout(function() {
                that.startTime = new Date();
                player.animateColission();
                if (player.explosionWidth < player.width) that.animateColission(player);
            }, 0);
        };

        /**
         * animateWin: Lets make that Gorilla Dance
         * params {Object} player The player to have dance
         * params {Integer} startTime When did this win happen?
         */
        App.prototype.animateWin = function(player, startTime) {
            var that = this;
            turnsLeft = {
                player_1: 0,
                player_2: 0
            };
            this.startTime = startTime;
            this.timeout = setTimeout(function() {
                while (!(player.animate === true && player.animations < 12)) {
                    that.empty = true;
                    that.buildings = [];
                    that.createScene();
                    that.nextPlayerTurn(player);
                    return;
                }
                var now = new Date();
                var time = now - that.startTime;
                that.createScene();
                player.animateWin();
                that.animateWin(player, that.startTime);
            }, 800);
        };

        /**
         * nextPlayerTurn: change turns
         * params {Object} player Pass in the current player
         */
        App.prototype.nextPlayerTurn = function(player) {
            this.sunShock = false;
            player.timer = 0;
            var nextPlayer = (player.playerNumber === 2) ? 1 : 2;
            nextTurn = true;
            turnsInGame++;

            turnsLeft['player_' + player.playerNumber]++;
            this.updateThrows(turnsLeft['player_' + player.playerNumber]);
            if (turnsLeft['player_' + player.playerNumber] <= maximumNumberOfTurns && !gameIsFinished) {
                this.runPlayer(nextPlayer);
            } else if(gameIsFinished) {
              return;
            }else if (turnsLeft['player_' + player.playerNumber] > maximumNumberOfTurns){
              this.empty = true;
              this.buildings = [];

              this.createScene();
              turnsLeft['player_1'] = 0;
              turnsLeft['player_2'] = 0;

              rounds++;
              this.updateScoreBoard();
              this.nextPlayerTurn(player);
            }
        };


        App.prototype.runPlayer = function(player) {
            //TODO: Här ska vi ta reda på wind och skit och ge detta till spelarna...!
            var playerWind = this.wind.windSpeed;
            var deltaX = this.player_2.x - this.player_1.x;
            var deltaY = this.player_1.y - this.player_2.y;
            var playerPos = [deltaX, deltaY];

            if (player == 1) {
                turnsInGame++;
                var bananaHitPosition = [0,0];

                if (this.player_1.banana) {
                  var deltaBananaX =  this.player_2.x - this.player_2.banana.x();
                  var deltaBananaY = this.player_2.banana.y() - this.player_2.y ;
                  bananaHitPosition = [deltaBananaX, deltaBananaY];
                }
                executeTurn(playerPos, bananaHitPosition, playerWind);
                this.throwBanana(agent_force, agent_angle, player);
            } else {
                runAgent(2, playerPos, [2, 2]);
                this.throwBanana(agent_2_force, agent_2_angle, player);
            }
        };

        /**
         * withinBoundries: Lets see if the banana is still within the playing field
         * params {Integer} x
         * params {Integer} y
         * returns {Boolean}
         */
        App.prototype.withinBoundries = function(x, y) {
            return (x < 0 || x > this.width || y > this.height) ? false : true;
        };

        // Return our App Object
        return App;

    });
