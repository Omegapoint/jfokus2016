function executeTurn(otherPlayerPos, hitPos, wind) {
	var code = JSON.parse(localStorage['runningGamePlayer']).code;

	var bananaHitPos = hitPos;
	var opponentAsJson = new Object();
  		opponentAsJson['x'] = otherPlayerPos[0];
  		opponentAsJson['y'] = otherPlayerPos[1];
	var windCopy = wind;
	var funName = "player" + Date.now();
	try {
    eval(code);
	} catch (e) {
	    if (e instanceof SyntaxError) {
	        openModalWith("<h3>Error</h3>"+e);
					gameIsFinished = true;
					return;
	    }
	}

	var playerReturn = runPlayer(bananaHitPos, opponentAsJson, windCopy, agent_memory);
	//TODO: make velocity max 150
	agent_angle = playerReturn['angle'];
	agent_force = playerReturn['velocity'];
	agent_memory = playerReturn['memory'];
}
