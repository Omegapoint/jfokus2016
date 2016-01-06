
function runPlayerAgent() {

	var textboxt =  document.getElementById("customImpl");
}

function runAgent(wind, targetPosition, bananaHitPosition) {
  console.log("running agent");

  if (agent_memory.lastThrow === undefined) {
    agent_angle = 70;
    // agent_angle = Math.floor(Math.random() * 90);
    // var min = (wind.windSpeed < 0) ? 20 : 8;
    var min = 10;
    agent_force = Math.floor(Math.random() * (50 - min)) + min;
    console.log("undefined: " + agent_force);
  } else {
      var deltaPosition = targetPosition[0] - bananaHitPosition[0];
      agent_force += deltaPosition * 0.05;
      console.log("defined: " + agent_force);
  }
  agent_memory.lastThrow = {
    angle: agent_angle,
    force: agent_force,
    forceDelta: 40,
  };
}