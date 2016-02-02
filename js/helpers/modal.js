var modal = null;
function openModal(modalId){
  modal = document.getElementById(modalId);
  modal.style.display = "block";
}
function closeModal(modalId){
  modal = document.getElementById(modalId);
  modal.style.display = "none";
}
function closeModalAndCreatePlayer(){
  closeModal('new_player');
  createNewPlayer();
}
function createNewPlayer(){
  playerName = document.getElementById('player_name').value;
  email = document.getElementById('player_email').value;
}
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the default action has been cancelled
  }
  if (event.keyCode !== undefined) {
    if (event.keyCode == 79) { // oO
      document.getElementById('api_info').style.display = "none";
      document.getElementById('rules_info').style.display = "none";
    }else if (event.keyCode == 67) { // cC
      document.getElementById('new_player').style.display = "none";
    }
  }
}, true);
