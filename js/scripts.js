var allCards = []
var card1;
var card2;
var allPlayers = [];
var playerCount;

//Constructors
function Player(name, id) {
  this.name = name;
  this.id = id;
  this.chips = 500;
}

var dealer = {
  name: "Dealer",
  chips: 500
}

function Card(id) {
  this.id = id;
  this.number = 0;
  this.value = 0;
  this.suit = "suit";
  this.played = false;
}

function CurrentTurn(player) {
  this.player = player;
  this.hand = 0;
  this.cards = [];
}

//marks a card as played
Card.prototype.cardPlayed = function() {
  return this.played = true;
}

//Generates all 52 cards
var createCards = function() {
  for (var i = 1; i < 53; i++) {
    var card = new Card(i)
    card.number = i;
    if (card.id > 13) {
      card.number = i % 13;
      if (card.number === 0) {
        card.number = 13;
      }
    }

    if (card.id < 14) {
      card.suit = "Spades";
    } else if (card.id >13 && card.id < 27) {
      card.suit = "Hearts";
    } else if (card.id > 26 && card.id < 40) {
      card.suit = "Clubs";
    } else {
      card.suit = "Diamonds";
    }

    if (card.number >= 11 && card.number <= 13) {
      card.value = 10;
    } else if (card.number === 1) {
      card.value = 1; // CHANGE THIS LATER TO HAVE USER CHOOSE IF 1 OR 11
    } else {
      card.value = card.number
    }
    allCards.push(card);
  }
  // allCards.forEach(function(card) {
  //   console.log (card.id + " " + card.value + " " + card.suit)
  // })
}



//Function to let the user determine if the ace will be a 1 or an 11 - NEED TO FINISH
var setAce = function() {
  return 1;
}

//Moves to the next player
var switchPlayers = function() {
  allPlayers.push(allPlayers.shift());
}

//creates CurrentTurn objects
var playerTurn = new CurrentTurn(allPlayers[0]);
var dealerTurn = new CurrentTurn(dealer);

//dealer draws cards
var dealerPlay = function() {
  dealerTurn = new CurrentTurn(dealer);
  dealTwo(dealerTurn);
  do {
    dealOne(dealerTurn);
  } while (dealerTurn.hand < 17);
}

//What happens when a player ends their turn
//The dealer plays
//The next player is selected
var endTurn = function() {
  dealerPlay();
  if (dealerTurn.hand > playerTurn.hand && dealerTurn.hand < 22) {
    console.log ("dealer wins");
    // dealer.chips += 10; //CHANGE LATER TO BE AMOUNT THAT WAS BET
  } else if (playerTurn.hand > dealerTurn.hand && playerTurn.hand < 22) {
    console.log ("player wins");
    // allPlayers[0].chips += 10; //CHANGE LATER TO BE AMOUNT THAT WAS BET
  } else {
    console.log("no one wins")
  }
  switchPlayers();
  playerTurn = new CurrentTurn(allPlayers[0])
  console.log(playerTurn.player.name)
}

//Gets a random number between 1 and 52
var getRandomCard = function() {
  return Math.floor(Math.random() * 52) + 1;
}

//gets 2 cards and mark them as played
//Adds card total to the current turn hand 
var dealTwo = function(aPlayer) {
  card1 = getRandomCard();

  do {
    card2 = getRandomCard();
  } while (card1 === card2);
  
  var index1 = card1 - 1;
  var index2 = card2 - 1;
  
  allCards[index1].cardPlayed();
  allCards[index2].cardPlayed();
  
  console.log (allCards[index1].value + " " + allCards[index2].value)
  aPlayer.cards.push(allCards[index1]);
  aPlayer.cards.push(allCards[index2]);
  
  aPlayer.hand += parseInt(allCards[index1].value) + parseInt(allCards[index2].value);

  if (aPlayer.hand > 21) {
    console.log("you lose");
    //allPlayers[0].chips -= 50 //CHANGE LATER TO BE WHAT WAS BET
    //dealer.chips += 50; //CHANGE LATER TO BE WHAT WAS BET
    switchPlayers();
    playerTurn = new CurrentTurn(allPlayers[0]);
  } else if (aPlayer.hand === 21) {
    console.log("BLACKJACK");
    //allPlayers[0].chips += 50 //CHANGE LATE TO BE WHAT WAS BET
    switchPlayers()
    playerTurn = new CurrentTurn(allPlayers[0]);
  }
  // console.log(aPlayer.hand + " " + aPlayer.player.name)

  $("#card-1").prepend('<img class="player-hand-images" src="./img/' + aPlayer.cards[0].number + '.png">')
  $("#card-2").prepend('<img class="player-hand-images" src="./img/' + aPlayer.cards[1].number + '.png">')
  



}

//gets card and marks it as played
//Adds card total to the current turn hand 
var dealOne = function(aPlayer) {
  var anId = getRandomCard();
  var aCard = 0;
  do {
    aCard = allCards[anId - 1]
  } while (aCard.played === true);
  aCard.played = true;

  console.log(aCard.value)
  aPlayer.hand += parseInt(aCard.value);
  aPlayer.cards.push(aCard);
  

  if (aPlayer.hand > 21) {
    console.log("you lose");
    //allPlayers[0].chips -= 50 //CHANGE LATER TO BE WHAT WAS BET
    //dealer.chips += 50; //CHANGE LATER TO BE WHAT WAS BET
    switchPlayers();
    playerTurn = new CurrentTurn(allPlayers[0]);
  } else if (aPlayer.hand === 21) {
    console.log("BLACKJACK");
    //allPlayers[0].chips += 50 //CHANGE LATE TO BE WHAT WAS BET
    switchPlayers()
    playerTurn = new CurrentTurn(allPlayers[0]);
  }
  console.log(aPlayer.hand + " " + aPlayer.player.name)  
}

//dynamically creates inputs for each player's user name
var usernameFields = function() {
  var nameForm = document.getElementById("name-form");

  while (nameForm.hasChildNodes()) {
    nameForm.removeChild(nameForm.lastChild);
  }

  for (i = 0; i < playerCount; i++) {
    var label = document.createElement("label");
    var labelText = document.createTextNode("Player" + (i+1) + " Name: ");
    label.appendChild(labelText);
    nameForm.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.name = "player" + i;
    input.id = "player" + i;
    input.class = "playerNameInput";
    nameForm.appendChild(input);
    nameForm.appendChild(document.createElement("br"));
  }

  var button = document.createElement("button");
  button.setAttribute("class","btn btn-primary");
  button.setAttribute("id", "name-button");
  button.setAttribute("name", "button");
  var buttonText = document.createTextNode("Play");
  button.appendChild(buttonText);
  nameForm.appendChild(button)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

  createCards();

  $("#player-count").submit(function(event) {
    event.preventDefault();
    // debugger;
    playerCount = parseInt($("input:radio[name=count]:checked").val());

    console.log(playerCount);

    $(".player-count").hide();
    //form is displayed with inputs for each player's username
    usernameFields();
    $("#name-div").show()
     
    //when username form is submitted...
    $("#name-button").click(function() {
      $("#name-div").hide();
      for (var i = 0; i < playerCount; i++) {
        var playerName = $("#player" + [i]).val();
        var newPlayer = new Player(playerName, i+1);
        allPlayers.push(newPlayer);
      }
      
      var playerInfo = document.getElementById("player-info");
      var colWidth = 12/allPlayers.length;
      for (var i = 0; i < allPlayers.length; i++) {
        playerInfo.innerHTML += '<div class=col-sm-' + colWidth + ' id= player' + i+1 +'info>' + allPlayers[i].name + ': ' +  allPlayers[i].chips + '</div>'
      }
      
      $("#game").show();
      $(".play-turn").text(allPlayers[0].name + "'s turn")
      
      $(".play-turn").click(function() {
        dealTwo(playerTurn)
      })
    })
  })
})