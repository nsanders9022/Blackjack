function Player(name, id) {
  this.name = name;
  this.id = id;
  this.score = 0;
}

function Card(number, suit, id) {
  this.number = number;
  this.suit = suit;
  this.id = id;
  this.played = false;
}

Card.prototype.cardPlayed = function() {
  return this.played = true;
}

