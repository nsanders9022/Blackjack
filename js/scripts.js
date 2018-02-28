var allCards = []
// var card1;
// var card2;
var allPlayers = [];
var playerCount;
var status = 0; // 0 = in play; 1 = player wins; -1 = dealer wins; 2 = blackjack;
var playerHandTotal = 0;
var dealerHandTotal = 0;
var currentPlayerTurn;


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

// function CurrrentRound() {
//   this.player = allPlayers[0];
//   this.dealer = dealer;
// }

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
var dealerPlay = function() { //NOT WORKING. DOESN'T STOP AT 17
  $("#player-turn-name").text(dealerTurn.player.name)      
  dealerTurn = new CurrentTurn(dealer);
  dealTwo(dealerTurn);
  console.log("deeeaaaalller hand " + dealerTurn.hand)
  while (dealerTurn.hand < 17) {
    dealOne(dealerTurn)
  }
  // do {
  //   dealOne(dealerTurn);
  // } while (dealerTurn.hand < 17);
}

//What happens when a player ends their turn
//The dealer plays
//The next player is selected
var endTurn = function() {
  dealerPlay();
  console.log("dealer hand: " + dealerHandTotal + " player hand: " + playerHandTotal)
  if (dealerHandTotal > playerHandTotal && dealerHandTotal < 22) {
    status = parseInt(-1)
    checkStatus();
    // console.log ("dealer wins");
    // dealer.chips += 10; //CHANGE LATER TO BE AMOUNT THAT WAS BET
  } else if (playerHandTotal > dealerHandTotal && playerHandTotal < 22) {
    status = parseInt(1)
    checkStatus();
    // console.log ("player wins");
    // allPlayers[0].chips += 10; //CHANGE LATER TO BE AMOUNT THAT WAS BET
  } else if (dealerHandTotal > 21 && playerHandTotal < 21) {
    status = parseInt(1);
    checkStatus();
  } else {
    status = parseInt(0)
    checkStatus();
    // console.log("no one wins")
  }

  switchPlayers();
  playerTurn = new CurrentTurn(allPlayers[0])
  console.log(playerTurn.player.name)
}

//Gets a random number between 1 and 52
var getRandomCard = function() {
  return Math.floor(Math.random() * 52) + 1;
}

var checkStatus = function() {
  if (status < 0) {
    $("#result-text").text("Dealer wins this hand")
  } else if (status == 1) {
    $("#result-text").text(playerTurn.player.name + " wins this hand")
  } else if (status == 2) {
    $("#result-text").text(playerTurn.player.name + " got BLACKJACK!")
  } else {
    $("#result-text").text("hmmmmmmmmm");
  }
}

//gets 2 cards and mark them as played
//Adds card total to the current turn hand 
var dealTwo = function(aPlayer) {
  var card1Id = getRandomCard();
  var aCard2 = 0;
  var aCard1 = 0;

  do {
    var card2Id = getRandomCard();
  } while (card1Id === card2Id);
  
  aCard1 = allCards[card1Id - 1];
  aCard2 = allCards[card2Id - 1];

  aCard1.cardPlayed();
  aCard2.cardPlayed();

  aPlayer.cards.push(aCard1);
  aPlayer.cards.push(aCard2);
  console.log(aPlayer.cards)

  aPlayer.hand += parseInt(aCard1.value);
  aPlayer.hand += parseInt(aCard2.value);

  console.log(aPlayer.hand) 
  console.log ("card 1: " + aCard1.value + " card 2: " + aCard2.value + " name: " + aPlayer.player.name)
  console.log("hand total: " + aPlayer.hand)

  if (aPlayer.player.name === "Dealer") {
    dealerHandTotal = aPlayer.hand;
  } else {
    playerHandTotal = aPlayer.hand;
    $("#player-turn-name").text(currentPlayerTurn.player.name)
  }


  if (aPlayer.name != "Dealer") {
    if (aPlayer.hand > 21) {
      status = parseInt(-1);
      checkStatus()
      // console.log("you lose");
      //allPlayers[0].chips -= 50 //CHANGE LATER TO BE WHAT WAS BET
      //dealer.chips += 50; //CHANGE LATER TO BE WHAT WAS BET
    } else if (aPlayer.hand === 21) {
      status = parseInt(2);
      checkStatus()
      // console.log("BLACKJACK");
      //allPlayers[0].chips += 50 //CHANGE LATE TO BE WHAT WAS BET
    }
    
    switchPlayers()
    playerTurn = new CurrentTurn(allPlayers[0]);

  }

   // console.log(aPlayer.hand + " " + aPlayer.player.name)

  $("#card-0").prepend('<img class="player-hand-images" src="./img/' + aPlayer.cards[0].id + '.png">')
  $("#card-1").prepend('<img class="player-hand-images" src="./img/' + aPlayer.cards[1].id + '.png">')
}

//gets card and marks it as played
//Adds card total to the current turn hand 
var dealOne = function(aPlayer) {
  var anId = getRandomCard();
  var aCard = 0;
  do {
    aCard = allCards[anId - 1]
  } while (aCard.played === true);
  aCard.cardPlayed();
  aPlayer.cards.push(aCard);

  aPlayer.hand += parseInt(aCard.value);
  console.log("hand total: " + aPlayer.hand)
  
  
  var cardIndex = aPlayer.cards.indexOf(aCard);

  console.log("new card: " + aCard.value + " name: " + aPlayer.player.name)
  $("#card-" + cardIndex).prepend('<img class="player-hand-images" src="./img/' + aPlayer.cards[cardIndex].id + '.png">')

  if (aPlayer.player.name === "Dealer") {
    dealerHandTotal = aPlayer.hand;
  } else {
    playerHandTotal = aPlayer.hand;
  }
  

  if (aPlayer.hand > 21) {
    status = parseInt(-1);
    checkStatus();
    // console.log("you lose");
    //allPlayers[0].chips -= 50 //CHANGE LATER TO BE WHAT WAS BET
    //dealer.chips += 50; //CHANGE LATER TO BE WHAT WAS BET
    switchPlayers();
    playerTurn = new CurrentTurn(allPlayers[0]);
  } else if (aPlayer.hand === 21) {
    status = parseInt(2);
    checkStatus();
    // console.log("BLACKJACK");
    //allPlayers[0].chips += 50 //CHANGE LATE TO BE WHAT WAS BET
    switchPlayers()
    playerTurn = new CurrentTurn(allPlayers[0]);
  }
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
      
      currentPlayerTurn = new CurrentTurn(allPlayers[0])
      
      $("#game").show();
      $("#player-turn-name").text(currentPlayerTurn.player.name)      
      $(".play-turn").text(currentPlayerTurn.player.name + "'s turn")
      
      $(".play-turn").click(function() {
        $(".card-deal").find("img").remove();       
        dealTwo(currentPlayerTurn);
        $("#hit").show();
        $("#stay").show();
        $(".play-turn").hide()
      })

      $("#hit").click(function() {
        dealOne(currentPlayerTurn);
      })

      $("#stay").click(function() {
        // debugger;
        $(".card-deal").find("img").remove();
        endTurn();

        $(".play-turn").show();

        $("#hit").hide();
        $("#stay").hide();
      })
    })
  })
})

// Fix name that is shown in button