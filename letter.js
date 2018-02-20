var Letter = function(ltr) {
  this.letter = ltr;
  this.appear = false;

  this.renderLetter = function() {
    if (this.letter == ' ') { 
      //makes sure that when the function checks if the word is found doesn't read the blank as false.
      this.appear = true;
      return '  ';
    } 
    if (this.appear === false) { 
      return ' _ ';
    } else { 
      return this.letter;
    }

  };
};

module.exports = Letter;