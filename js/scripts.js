var allCards = []

function Player(name, id) {
  this.name = name;
  this.id = id;
  this.score = 0;
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
      card.value = [1,11];
    } else {
      card.value = card.number
    }
    
    allCards.push(card);
  }
}

createCards();

allCards.forEach(function(card) {
  console.log(card.id + " " + card.number + " "+ card.suit + " " + card.value)
} )