var modal = null;
var audioButton = new Audio('audio/button-select.wav');
var isAltPressed = false;

function openModal(modalId){
  audioButton.play();
  modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

function closeModal(modalId){
  modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

function openModalWith(modalMsg){
  document.getElementById('message_modal_content').innerHTML = modalMsg;
  openModal('message_modal');
}

function closeModalAndCreatePlayer(){
  var playerName = document.getElementById('player_name').value;
  var currentPlayer = {
    name: playerName,
    email: document.getElementById('player_email').value,
    code: textareaPlayerCode.getValue()
  };
  localStorage['currentPlayer'] = JSON.stringify(currentPlayer);

  enableStartGame = true;
  textareaPlayerCode.setOption("readOnly", false); //Ready to write code!
  closeModal('new_player');
  document.getElementById('player_1_name').innerHTML = playerName;
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
      document.getElementById('message_modal').style.display = 'none';
      document.getElementById('api_info').style.display = 'none';
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
      openModal('api_info');
    }
    else if (event.keyCode == 82) { // r
      openModalWith(RulesModalText);
    }
    else if (event.keyCode == 83) { // s
      savePlayerCode();
    }
    else if (event.keyCode == 71) { // g
      resetPlayerCode();
    }
    else if (event.keyCode == 80) { // p
      document.getElementById('play').click();
    }
    isAltPressed = false;
  }
}, true);

var RulesModalText = "About<br><br>"+
  "The Javascript code in the textbox below control Player 1 (The monkey to the left). "+
  "A game consists of a total of 3 rounds with 10 throws per monkey and round. If no "+
  "monkey has hit the other after 10 throws that round is considered a draw.<br/><br />"+
  "Score<br><br>Hitting the opponent gives you 10 points minus the number of throws "+
  "consumed during the round. So if you hit your opponent after three bananas you get 7"+
  " points for example. A draw means 0 points for both players. If you hit the sun you "+
  "get an addional 10 points for that round, even if you lose that round. When the game "+
  "is finished, the winner gets the difference between the two scores as the winning score.";