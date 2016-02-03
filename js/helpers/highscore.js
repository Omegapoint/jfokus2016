//creating a new comparator for sorting
var nbrOfPlayersOnHighScore = 5;
function compare(player1,player2) {
  if (player1.score < player2.score)
  return -1;
  else if (player1.score > player2.score)
  return 1;
  else
  return 0;
};

function highscoreTableUpdate(){
  highscoreList = JSON.parse(localStorage['highscoreList']);
  if(highscoreList.length>1){
    highscoreList.sort(compare);
    if(highscoreList[0].score < highscoreList[highscoreList.length-1].score){
      highscoreList.reverse();
    }
  }

  var table = document.getElementById("highscore-table");
  //emty the table
  table.innerHTML = "";

  //fill in with new information
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<u>#</u>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<u>Player</u>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<u>Score</u>";

  for (i = 0; i < (nbrOfPlayersOnHighScore || highscoreList.length); i++) {
    var row = table.insertRow(i+1);

    var cell = row.insertCell(0);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+(i+1)+"</b>";

    var cell = row.insertCell(1);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].name+"</b>";
    var cell = row.insertCell(2);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].score+"</b>";
  }

};

function getUserInfo(playerindex){
  var p = highscoreList[playerindex];
  openModalWith(
    "Player info<br>"+
    "<br>Name: "+ p.name+
    "<br>Email: "+ p.email+
    "<br>Score: "+ p.score
  );
};
