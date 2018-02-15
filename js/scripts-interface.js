var Player = require('./../js/scripts.js').playerModule;

$(document).ready(function() {
    var newPlayer = new Player("bob");

    $("#player1Name").text("newPlayer.name")
})