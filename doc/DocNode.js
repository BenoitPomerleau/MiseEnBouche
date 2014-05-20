Node.js
=======




===========================================================
Debugger:
-----------------------------------------------------------

$ npm install -g node-inspector

pour démarrer débogage:
$ node --debug yourApp.js
ou 
$ node --debug-brk yourApp.js

puis 
$ node-inspector & 
dans un autre cmd

ouvrir l'url donnée par la derniere instruction
ex: http://127.0.0.1:8080/debug?port=5858
