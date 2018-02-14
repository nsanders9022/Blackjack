var allCards = []
var card1;
var card2;
var allPlayers = [];

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

Card.prototype.cardPlayed = function() {
  return this.played = true;
}

function CurrentTurn(player) {
  this.player = player;
  this.hand = 0;
}

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

    if (card.number === 11 || card.number === 12) {
      card.value = 10;
    } else if (card.number === 13) {
      card.value = 0; // CHANGE THIS LATER TO HAVE USER CHOOSE IF 1 OR 11
    } else {
      card.value = card.number
    }
    allCards.push(card);
  }
}

var player1 = new Player("player1", 1);
allPlayers.push(player1);
var player2 = new Player("player2", 2);
allPlayers.push(player2);

var switchPlayers = function() {
  allPlayers.push(allPlayers.shift());
}

var playerTurn = new CurrentTurn(allPlayers[0]);
var dealerTurn = new CurrentTurn(dealer);


var dealerPlay = function() {
  dealerTurn = new CurrentTurn(dealer);
  dealTwo(dealerTurn);
  do {
    dealOne(dealerTurn);
  } while (dealerTurn.hand < 17);
}

var endTurn = function() {
  dealerPlay();
  if (dealerTurn.hand > playerTurn.hand && dealerTurn.hand < 22) {
    console.log ("dealer wins");
    // dealer.chips += 10;
  } else if (playerTurn.hand > dealerTurn.hand && playerTurn.hand < 22) {
    console.log ("player wins");
    // allPlayers[0].chips += 10;
  } else {
    console.log("no one wins")
  }
  switchPlayers();
  playerTurn = new CurrentTurn(allPlayers[0])
  console.log(playerTurn.player.name)
}

var getRandomCard = function() {
  return Math.floor(Math.random() * 52) + 1;
}

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

  aPlayer.hand += parseInt(allCards[index1].value) + parseInt(allCards[index2].value);
  console.log(aPlayer.hand + " " + aPlayer.player.name)
}

var dealOne = function(aPlayer) {
  var anId = getRandomCard();
  var aCard = 0;
  do {
    aCard = allCards[anId - 1]
  } while (aCard.played === true);
  aCard.played = true;

  console.log(aCard.value)
  aPlayer.hand += parseInt(aCard.value);
  console.log(aPlayer.hand + " " + aPlayer.player.name)  
}

createCards();



dealTwo(playerTurn)
// dealOne();

// allCards.forEach(function(card) {
//   console.log(card.id + " " + card.number + " "+ card.suit + " " + card.value)
// } )


//Check to see that cards are being marked as played
// var notPlayed = function() {
//   var notPlayedArray = [];
//   allCards.forEach(function(card) {
//     if (card.played === false) {
//       notPlayedArray.push(card);
//     }
//   })

//   return notPlayedArray.length;
// }