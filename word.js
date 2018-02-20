var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
  this.word = wrd;
  this.letters = [];
  this.wordFound = false;

  this.getLetters = function() {
    //populate the collection above with new Letter objects
    for (var i = 0; i<that.word.length; i++) {
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //found the current word
  this.didWeFindTheWord = function() {
    if (this.letters.every(function(lttr) {
      return lttr.appear === true;
    }))
    {
      this.wordFound = true;
      return true;
    }
  };

//end of Word constructor
}

module.exports = Word;