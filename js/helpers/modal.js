var modal = null;
var audioButton = new Audio('audio/button-select.wav');
var audioWinner = new Audio('audio/winner.wav');
var audioLoser = new Audio('audio/losing.wav');
var isAltPressed = false;
function openModal(modalId){
  audioButton.play();
  modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId){
  modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function openModalWith(modalMsg){
  document.getElementById('message_modal_content').innerHTML = modalMsg;
  openModal('message_modal');
}

function closeModalAndCreatePlayer(){
  document.getElementById('player_1_name') = document.getElementById('player_name').value;
  var currentPlayer = {
    name: document.getElementById('player_name').value,
    email: document.getElementById('player_email').value,
    code: textareaPlayerCode.getValue()
  };
  localStorage["currentPlayer"] = JSON.stringify(currentPlayer);
  //document.getElementById('textarea_player_code').value = templateStartCode;
  console.log(JSON.parse(localStorage["currentPlayer"]).code);
  closeModal('new_player');
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode !== undefined) {
    if (!isAltPressed && event.keyCode == 18) {
      isAltPressed = true;
      return;
    }else if(!isAltPressed){
      return;
    }

    if (event.keyCode == 79) { // o
      document.getElementById('message_modal').style.display = "none";
    }
    else if (event.keyCode == 67) { // c
       clearPlayerCode();
    }
    else if (event.keyCode == 76) { // l
      console.log("TODO: load player modal");
    }
    else if (event.keyCode == 78) { // n
      openModal('new_player');
    }
    else if (event.keyCode == 65) { // a
      openModalWith(ApiModalText);
    }
    else if (event.keyCode == 82) { // r
      openModalWith(RulesModalText);
    }
    else if (event.keyCode == 83) { // s
      savePlayerCode();
    }
    isAltPressed = false;
  }
}, true);

var RulesModalText = "Rules<br>Points given when: "+
  "Monkey-hit (10 pts), Sun-hit (5 pts)<br><br>"+
  "Each monkey has 10 (ten) turns. If no monkey has managed to hit the other, "+
  "a draw is called.<br />"+
  "A draw generates 0 (zero) points. "+
  "For each miss the winner get -1 (minus one) point.<br />"+
  "Can't edit code when play is pressed.<br>";
var ApiModalText = "Api<br/><ul>"+
  "<li>lastBananaHit, </li>"+
  "<li>opponent, </li>"+
  "<li>wind,the game has wind, and it is an integer (can be negative or positive).</li>"+
  "<li>memory,</li>"+
  "<li>return, 5 pts</li>"+
  "</ul>";
