function executeTurn (otherPlayerPos, hitPos, wind) {


	var code = customImpl.getValue(); 
	var bananaHitPos = hitPos;
	var opponentAsJson = new Object();
  		opponentAsJson['x'] = otherPlayerPos[0];
  		opponentAsJson['y'] = otherPlayerPos[1];

 
	var windCopy = wind;


	var funName = "player" + Date.now();
	//eval("a.func  = function " + funName + "(prev_angle, prev_velocity) {" + code + "};");
	eval(code);


	//Ettorna måste bytas ut mot riktiga värden A.S.A.F.P.
	var playerReturn = runPlayer(bananaHitPos, opponentAsJson, windCopy, 1);


	agent_angle = playerReturn['angle'];
	agent_force = playerReturn['velocity'];





}
