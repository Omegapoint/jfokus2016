function executeTurn () {

	console.log("EXECUTE");

	var code = document.getElementById("customImpl").value; 

	var a = {};
	var funName = "player" + Date.now();
	eval("a.func  = function " + funName + "(prev_angle, prev_velocity) {" + code + "};");

	var newParams = a.func(1, 2);

	agent_angle = a.agent_angle;
	agent_force = a.agent_force;
		
}
