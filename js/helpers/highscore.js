window.onload = function () {
  // TODO: read from latst highscore json in load and update that to highscoreList
  highscoreTableUpdate();
};

//creating a new comparator for sorting
function compare(player1,player2) {
  if (player1.score < player2.score)
  return -1;
  else if (player1.score > player2.score)
  return 1;
  else
  return 0;
};

function highscoreTableUpdate(){
  console.log("we have "+ highscoreList.length+ " players");
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
  cell.innerHTML = "<b>Position</b>";
  var cell = row.insertCell(1);
  cell.innerHTML = "<b>Player</b>";
  var cell = row.insertCell(2);
  cell.innerHTML = "<b>Score</b>";

  for (i = 0; i < highscoreList.length; i++) {
    var row = table.insertRow(i+1);

    var cell = row.insertCell(0);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+(i+1)+"</b>";

    var cell = row.insertCell(1);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].playerName+"</b>";
    var cell = row.insertCell(2);
    cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+highscoreList[i].score+"</b>";
  }

};

function getUserInfo(playerindex){
  var p = highscoreList[playerindex];
  alert("player: "+ p.playerName+ "\nemail: "+ p.playerEmail+ "\nscore: "+ p.score);
  //TODO: change alert to modal
};

// function readjsonFile(file, callback) {
//
//     console.log("Reading the "+file+" file.");
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// };
