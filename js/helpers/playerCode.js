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
    theme: 'the-matrix',
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
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  currentPlayer.code = textareaPlayerCode.getValue();
  localStorage['currentPlayer'] = JSON.stringify(currentPlayer);
  setLatestSavedCode();
  var savedTxt = "Saved ("+lastestSave+")";
  document.getElementById('message_to_player').innerHTML = savedTxt;
}
function clearPlayerCode(){
  textareaPlayerCode.setValue(templateStartCode);
  var savedTxt = "Clear code";
  document.getElementById('message_to_player').innerHTML = savedTxt;
}
function resetPlayerCode(){
  var currentPlayer = JSON.parse(localStorage['currentPlayer']);
  textareaPlayerCode.setValue(currentPlayer.code);
  var savedTxt = "Code is reset to latest save (at "+lastestSave+")";
  document.getElementById('message_to_player').innerHTML = savedTxt;
}

function setLatestSavedCode(){
  lastestSave = getCurrentTimestamp();
}
function getCurrentTimestamp(){
  var now = new Date();
  return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}
function loadPlayerByEmail(){
  var searchMail = document.getElementById('search_email').value;
  var highscoreList = JSON.parse(localStorage['highscoreList']);
  for (var i = 0; i < highscoreList.length; i++) {
    if(highscoreList[i].email == searchMail){
      textareaPlayerCode.setValue(highscoreList[i].code);
      localStorage['currentPlayer'] = JSON.stringify(highscoreList[i]);
      document.getElementById('player_1_name').innerHTML = highscoreList[i].name;
      closeModal('load_player_modal');
      return;
    }
  }
  document.getElementById('load_player_msg').innerHTML = "No player with that email found"
}
