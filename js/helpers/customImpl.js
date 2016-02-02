var impl = "function customPlayer() var agent_angle = 45; var agent_force = 200;}";
var customImpl;
require([
  "../node_modules/codemirror/lib/codemirror",
  "../node_modules/codemirror/mode/javascript/javascript", "../node_modules/codemirror/addon/hint/show-hint",
  "../node_modules/codemirror/addon/hint/javascript-hint", "../node_modules/codemirror/addon/edit/closebrackets",
  "../node_modules/codemirror/addon/edit/matchbrackets", "../node_modules/codemirror/addon/lint/lint.js",
  "../node_modules/codemirror/addon/lint/javascript-lint.js"], function (CodeMirror) {
  customImpl = CodeMirror.fromTextArea(document.getElementById("customImpl"), {
    "mode": "javascript",
    "theme": "the-matrix",
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
});
