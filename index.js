var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./wordBank.js');

var hangman = {
    wordBank: Game.newWord.wordList,
    guessesRemaining: 9,
    guessedLetters: [],
    currentWord: null,

    //asks user if they are ready to play
    startGame: function() {
        var that = this;
        //clears guessedLetters before a new game starts if it's not already empty.
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: 'play',
            type: 'confirm',
            message: 
'\n \n' + 'WELCOME to J. Lê Chem Hangman Game; shout out to CAL and Berkeley Labs! \n' +            
'    o' + '\n' +                                         
'    o' + '\n' +                                         
'   ___              ___  ___  ___  ___                ___' + '\n' +
'   | |        ._____|_|__|_|__|_|__|_|_____.          | |' + '\n' +
'   | |        |__________________________|%|          | |' + '\n' + 
'   |o|          | | |%|  | |  | |  |~| | |            | |' + '\n' +
'  /. .\          | | |%|  | |  |~|  |#| | |            |_|' + '\n' +
' /  o  \         | | :%:  :~:  : :  :#: | |            |_|' + '\n' +
':____o__:     ._|_|_."    "    "    "._|_|_.       ___" "___' + '\n' + 
' ._____.      |___|%|                |___|%|      |_________|' + '\n' +
                                                    '\n \n' + 
                                                   + '\n \n'
             + 'Would you like to play hangman, Chemistry Edition?'
        }]).then(function(answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log('Maybe we can play another time.');
            }
        })
    },

    //At the start of a new game
    newGame: function() {
        if (this.guessesRemaining === 9) {
            console.log('\n*************************************************************\n');
            console.log('Let\'s begin! \nLet\'s see how well you know the periodic elements.');
            console.log('\n********************************************************************\n');
            var randNum = Math.floor(Math.random() * this.wordBank.length);
            this.currentWord = new Word(this.wordBank[randNum]);
            this.currentWord.getLetters();
            //display current word as blanks
            console.log(this.currentWord.renderWord());
            this.promptUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },

    resetGuessesRemaining: function() {
        this.guessesRemaining = 9;
    },

    promptUser: function() {
        var that = this;
        //begins prompt
        inquirer.prompt([{
            name: 'chosenLtr',
            type: 'input',
            message: 'Please choose a letter: ',
            validate: function(value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(ltr) {
            var letterReturned = (ltr.chosenLtr).toUpperCase();
            var guessedAlready = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {
                if (letterReturned === that.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
            //run through entire function, else reprompt user
            if (guessedAlready === false) {
                that.guessedLetters.push(letterReturned);

                var found = that.currentWord.checkIfLetterFound(letterReturned);
                if (found === 0) {
                    console.log('You guessed incorrectly.');
                    that.guessesRemaining--;
                    that.display++;
                    console.log('Guesses remaining: ' + that.guessesRemaining);
                    console.log('\n**************************************************************\n');
                    console.log(that.currentWord.renderWord());
                    console.log('\n**************************************************************\n');

                    console.log('Letters guessed: ' + that.guessedLetters);
                } else {
                    console.log('Yes! You guessed correctly!');
                    //checks to see if user won
                    if (that.currentWord.didWeFindTheWord() === true) {
                        console.log(that.currentWord.renderWord());
                        console.log('=============================', Game.newWord.element[that.currentWord.word], '=============================');
                        console.log('Congratulations, you won the game! It looks like you are a natural chemist!');
                        that.startGame();
                    } else {
                        // display the user how many guesses remaining
                        console.log('Guesses remaining: ' + that.guessesRemaining);
                        console.log(that.currentWord.renderWord());
                        console.log('\n**************************************************************\n');
                        console.log('Letters guessed: ' + that.guessedLetters + ', ');
                    }
                }
                if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.promptUser();
                } else if (that.guessesRemaining === 0) {
                  

                    console.log('This is Game Over for you, GG.');
                    console.log('The word you guessed incorrectly was: ' + that.currentWord.word);
                    that.startGame();
                }
            } else {
                console.log('You\'ve guessed that letter already, try again.');
                that.promptUser();
            }
        });
    }

//end of hangman    
}

hangman.startGame();