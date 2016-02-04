var textareaPlayerCode;
var lastestSave = "Code is not saved";
require([
  "../node_modules/codemirror/lib/codemirror",
  "../node_modules/codemirror/mode/javascript/javascript", "../node_modules/codemirror/addon/hint/show-hint",
  "../node_modules/codemirror/addon/hint/javascript-hint", "../node_modules/codemirror/addon/edit/closebrackets",
  "../node_modules/codemirror/addon/edit/matchbrackets", "../node_modules/codemirror/addon/lint/lint.js",
  "../node_modules/codemirror/addon/lint/javascript-lint.js"], function (CodeMirror) {
  textareaPlayerCode = CodeMirror.fromTextArea(document.getElementById("textarea_player_code"), {
    mode : 'javascript',
    theme: '3024-night',
    tabSize : 2,
    lint : true,
    autofocus : true,
    lineNumbers : true,
    matchBrackets : true,
    autoCloseBrackets : true,
    gutters: ['CodeMirror-lint-markers'],
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    }
  });
  textareaPlayerCode.setValue(templateStartCode);
});

function savePlayerCode(){
  savePlayerCodeToLocalStorage();
  saveCurrentPlayerCode();
  setLatestSavedCode();
  setMessageToPlayer("Saved ("+lastestSave+")");
}
function clearPlayerCode(){
  textareaPlayerCode.setValue(templateStartCode);
  setMessageToPlayer("Code cleared");
}
function resetPlayerCode(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  textareaPlayerCode.setValue(currentPlayer.code);
  setMessageToPlayer("Code is reset to latest save (at "+lastestSave+")");
}

function setLatestSavedCode(){
  var now = new Date();
  lastestSave = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

function loadPlayerByEmail(){
  var searchMail = document.getElementById('search_email').value;
  var savedPlayerCode = JSON.parse(localStorage['savedPlayerCode']);
  for (var i = 0; i < savedPlayerCode.length; i++) {
    if(savedPlayerCode[i].email == searchMail){
      textareaPlayerCode.setValue(savedPlayerCode[i].code);
      localStorage['currentPlayer'] = JSON.stringify(savedPlayerCode[i]);
      setLatestSavedCode();
      setMessageToPlayer("Loaded code (at "+lastestSave+")");
      closeModal('load_player_modal');
      return;
    }
  }
  document.getElementById('load_player_msg').innerHTML = "No player with that email found"
}

function savePlayerCodeToLocalStorage(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  var savedPlayerCode = JSON.parse(localStorage['savedPlayerCode']);
  for (var i = 0; i < savedPlayerCode.length; i++) {
    if(currentPlayer.email == savedPlayerCode[i].email){
      savedPlayerCode[i].code = textareaPlayerCode.getValue();
      localStorage['savedPlayerCode'] = JSON.stringify(savedPlayerCode);
      return;
    }
  }
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  var newPlayerCode = {
    email: currentPlayer.email,
    name: currentPlayer.name,
    code : textareaPlayerCode.getValue()
  };
  savedPlayerCode.push(newPlayerCode);
  localStorage['savedPlayerCode'] = JSON.stringify(savedPlayerCode);
  return;
}

function saveCurrentPlayerCode(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  currentPlayer.code = textareaPlayerCode.getValue();
  localStorage['currentPlayer'] = JSON.stringify(currentPlayer);
}
function saveToGameCode(){
  localStorage['runningGamePlayer'] = localStorage['currentPlayer'];
  document.getElementById('player_1_name').innerHTML = JSON.parse(localStorage['runningGamePlayer']).name;
}

function setMessageToPlayer(messageToPlayer){
    var totalMsg = "["+JSON.parse(localStorage['currentPlayer']).name+"] "+messageToPlayer;
    document.getElementById('message_to_player').innerHTML = totalMsg;
}
