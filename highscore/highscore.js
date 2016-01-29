//player struct
function player(player, email, score) {
    this.player = player;
    this.email = email;
    this.score = score;
};

var players = [];


//creating a new comparator for sorting
function compare(player1,player2) {
  if (player1.score < player2.score)
    return -1;
  else if (player1.score > player2.score)
    return 1;
  else
    return 0;
};



//update table information
window.onload = function () {
  console.log("onload.");
  start();
  setInterval(start, 10000);
};



function start(){
  console.log("starting");
  loadplayers(function(text){
    console.log("in start -- we have "+ players.length+ " players");
    setTimeout(tableUpdate, 1000);
  });


}

function loadplayers(callback){
  console.log("loading players");
    //emtying the array before entering new values.
      console.log("clearing the players before reading all over again.");
     players = [];


readTextFiles("fileNames.txt", function(text){});

callback("");

}


function readTextFiles(file,callback)
{

  console.log("Reading the "+file+" file.");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                for(var i=0; i<allText.split('\n').length-1; i++){
                var   jsonfilename = allText.split('\n')[i].split('/')[allText.split('\n')[i].split('/').length-1];

                setTimeout(
                  readjsonFile(jsonfilename,
                    function(text){
                      console.log("adding player: "+ text);
                  players.push(JSON.parse(text));
                  console.log("inside forloop we have " +players.length + " players");
                  })
                  , 500);
                };
                console.log("after forlop we have " +players.length + " players");
                    callback("");
            }
        }

    }
    rawFile.send(null);
}






function tableUpdate(){
  console.log("refreshing the table.");
  console.log("we have "+ players.length+ " players");
if(players.length>1){
  players.sort(compare);
  if(players[0].score < players[players.length-1].score){
  players.reverse();
  }
}

    var table = document.getElementById("table");
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

    for (i = 0; i < players.length; i++) {
      var row = table.insertRow(i+1);

      var cell = row.insertCell(0);
      cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+(i+1)+"</b>";

      var cell = row.insertCell(1);
      cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+players[i].player+"</b>";
      var cell = row.insertCell(2);
      cell.innerHTML = "<b onclick="+"getUserInfo("+i+")"+">"+players[i].score+"</b>";
    }

};

function pageReloder(){
  window.setTimeout(start, 0);
};

function getUserInfo(playerindex){
   var p = players[playerindex];
   alert("player: "+ p.player+ "\nemail: "+ p.email+ "\nscore: "+ p.score);
};




function readjsonFile(file, callback) {

    console.log("Reading the "+file+" file.");
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};
