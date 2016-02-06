var agent_angle = Number.MIN_VALUE;
var agent_force = Number.MIN_VALUE;
var agent_memory = {};
var lastColission;

var agent_2_angle = 10;
var agent_2_force = 10;
var agent_2_memory = {};

var maximumNumberOfTurns = 10;
//var rounds = 1;
var roundsInGame = 3;

var gameIsFinished = true;
var textareaPlayerCode;
var lastestSave = "Code is not saved";

var RulesModalText = "About<br><br>"+
  "The Javascript code in the textbox below control Player 1 (The monkey to the left). "+
  "A game consists of a total of 3 rounds with 10 throws per monkey and round. If no "+
  "monkey has hit the other after 10 throws that round is considered a draw.<br/><br />"+
  "Score<br><br>Hitting the opponent gives you 10 points minus the number of throws "+
  "consumed during the round. So if you hit your opponent after three bananas you get 7"+
  " points for example. A draw means 0 points for both players. If you hit the sun you "+
  "get an addional 10 points for that round, even if you lose that round. When the game "+
  "is finished, the winner gets the difference between the two scores as the winning score.";

var templateStartCode = ""+
"function runPlayer(lastBananaHit, opponent, wind, memory){\n"+
"  var angle = 30 + opponent['y'];\n"+
"  var velocity = 5 - wind + (opponent['x'] * 0.05);\n"+
"  var returnValues = new Object();\n"+
"\n"+
"  returnValues['velocity'] = velocity;\n"+
"  returnValues['angle'] = angle;"+
"  returnValues['memory'] = \"Omegapoint Gorillas is fun! :)\";\n"+
"  return returnValues;\n"+
"};\n";
var emptyCurrentPlayer = {
  name: '-',
  email: '-',
  code: templateStartCode
}
var emptySavedPlayers = [{
  name: '-',
  email: '-',
  code: templateStartCode,
}];

if(!localStorage['currentPlayer']){
  localStorage['currentPlayer'] = JSON.stringify(emptyCurrentPlayer);
}
if(!localStorage['savedPlayerCode']){
  localStorage['savedPlayerCode'] = JSON.stringify(emptySavedPlayers);
}
if(!localStorage['runningGamePlayer']){
  localStorage['runningGamePlayer'] = JSON.stringify(emptyCurrentPlayer);
}
if(!localStorage['highscoreList']){
  localStorage['highscoreList'] = JSON.stringify([]);
}
// Reset localStorage
/*
localStorage['currentPlayer'] = JSON.stringify(emptyCurrentPlayer);
localStorage['savedPlayerCode'] = JSON.stringify(emptySavedPlayers);
localStorage['runningGamePlayer'] = JSON.stringify(emptyCurrentPlayer);
localStorage['highscoreList'] = JSON.stringify([]);
*/
