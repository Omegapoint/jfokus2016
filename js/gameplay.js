function executeTurn () {


	var code = customImpl.getValue(); 

	var a = {};
	var funName = "player" + Date.now();
	//eval("a.func  = function " + funName + "(prev_angle, prev_velocity) {" + code + "};");
	eval(code);


	//Ettorna måste bytas ut mot riktiga värden A.S.A.F.P.
	var playerReturn = runPlayer(1,1,1,1);


	console.log("JSON: " + playerReturn);	
	agent_angle = playerReturn['angle'];
	agent_force = playerReturn['velocity'];


	console.log(agent_force + " <-> " + agent_angle);


}
