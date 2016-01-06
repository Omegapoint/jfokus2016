

function runAgent(wind, targetPosition, bananaHitPosition) {
  console.log("running agent");

  if (agent_2_memory.lastThrow === undefined) {
    agent_2_angle = 70;
    // agent_2_angle = Math.floor(Math.random() * 90);
    // var min = (wind.windSpeed < 0) ? 20 : 8;
    var min = 10;
    agent_2_force = Math.floor(Math.random() * (50 - min)) + min;
    console.log("undefined: " + agent_2_force);
  } else {
      var deltaPosition = targetPosition[0] - bananaHitPosition[0];
      agent_2_force += deltaPosition * 0.05;
      console.log("defined: " + agent_2_force);
  }
  agent_2_memory.lastThrow = {
    angle: agent_2_angle,
    force: agent_2_force,
    forceDelta: 40,
  };
}