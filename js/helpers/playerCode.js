var templateStartCode = ""+
  "function runPlayer(lastBananaHit, opponent, wind, memory){\n"+
  "  var angle = 30 + opponent['y'];\n"+
  "  var velocity = 5 - wind + (opponent['x'] * 0.05);\n"+
  "  var returnValues = new Object();\n"+
  "\n"+
  "  returnValues['velocity'] = velocity;\n"+
  "  returnValues['angle'] = angle;"+
  "  returnValues['memory'] = \"OP Gorillas is fun! :)\";\n"+
  "  return returnValues;\n"+
  "};\n";
var textareaPlayerCode;
var lastestSave = "Code is not saved";
require([
  "../node_modules/codemirror/lib/codemirror",
  "../node_modules/codemirror/mode/javascript/javascript", "../node_modules/codemirror/addon/hint/show-hint",
  "../node_modules/codemirror/addon/hint/javascript-hint", "../node_modules/codemirror/addon/edit/closebrackets",
  "../node_modules/codemirror/addon/edit/matchbrackets", "../node_modules/codemirror/addon/lint/lint.js",
  "../node_modules/codemirror/addon/lint/javascript-lint.js"], function (CodeMirror) {
  textareaPlayerCode = CodeMirror.fromTextArea(document.getElementById("textarea_player_code"), {
    "mode": "javascript",
    "theme": "the-matrix",
    "tabSize":2,
    "lint": true,
    "autofocus": true,
    "lineNumbers": true,
    "matchBrackets": true,
    "autoCloseBrackets": true,
    "gutters": ["CodeMirror-lint-markers"],
    "extraKeys": {
      "Ctrl-Space": "autocomplete"
    }
  });
  textareaPlayerCode.setValue(templateStartCode);
  //textareaPlayerCode.setOption('readOnly', true);
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
  document.getElementById('load_player_msg').innerHTML = "Not implemented yet.."
}
