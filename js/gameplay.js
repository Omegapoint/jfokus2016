function executeTurn(otherPlayerPos, hitPos, wind) {
	//console.log("executeTurn: otherPlayerPos="+otherPlayerPos+" hitPos="+hitPos+" wind="+wind);
	var code = JSON.parse(localStorage['runningGamePlayer']).code;

	var bananaHitPos = hitPos;
	var opponentAsJson = new Object();
  		opponentAsJson['x'] = otherPlayerPos[0];
  		opponentAsJson['y'] = otherPlayerPos[1];
	var windCopy = wind;
	var funName = "player" + Date.now();
	eval(code);

	var playerReturn = runPlayer(bananaHitPos, opponentAsJson, windCopy, agent_memory);
	//TODO: make velocity max 150
	agent_angle = playerReturn['angle'];
	agent_force = playerReturn['velocity'];
	agent_memory = playerReturn['memory'];
	//console.log("player: agent_angle="+agent_angle+" agent_force="+agent_force+" agent_memory="+agent_memory);
}
