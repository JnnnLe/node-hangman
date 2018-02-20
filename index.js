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
            message: 'Would you like to play hangman, Chemistry Edition?'
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
            console.log('Let\'s begin!');
            console.log('*****************');
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
    }

//end of hangman    
}

hangman.startGame();