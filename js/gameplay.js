function executeTurn(otherPlayerPos, hitPos, wind) {

	var code = textareaPlayerCode.getValue(); 

	var bananaHitPos = hitPos;
	var opponentAsJson = new Object();
  		opponentAsJson['x'] = otherPlayerPos[0];
  		opponentAsJson['y'] = otherPlayerPos[1];

	var windCopy = wind;

	var funName = "player" + Date.now();
	eval(code);
	var playerReturn = runPlayer(bananaHitPos, opponentAsJson, windCopy, agent_memory);


	agent_angle = playerReturn['angle'];
	agent_force = playerReturn['velocity'];
	agent_memory = playerReturn['memory'];
}
