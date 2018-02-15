var Game = require('./../js/scripts.js').gameModule;

$(document).ready(function() {
    var currentGame = new Game();

    $("#player1Name").text(currentGame.allPlayers[0].name)
})