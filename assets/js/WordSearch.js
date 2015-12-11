//letters on the board
var lettersOnBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
//words on the board
var wordsOnBoard = [];
var word = '';
var invalidWord = false;
//holds all words
var dictionary = new Array();
//To handle if space is found in word
//So it doesnt empty out the word or board.
//var spaceFound = false;
// Do a jQuery Ajax request for the text dictionary
console.log("Creating dictionary...");
$.get("assets/files/dictionary.txt", function(txt) {
    // Get an array of all the words
    var words = txt.split("\n");

    for (var i = 0; i < words.length; i++) {
        //text file holds lower case
        //convert all the letters to uppercase
        //words being compared are uppercase
        dictionary[i] = words[i].toUpperCase();
    }
});
console.log("Finished dictionary");

//Finds if word formed is an actual word
function findWord() {
    var wordFound = false;
    console.log("Searching for word: " + word);
    for (var i = dictionary.length - 1; i >= 0; i--) {
        if (dictionary[i] == word) {
            console.log("findWord(): Word found!");
            document.getElementById("errors").innerHTML = "Word Found!, board is rest and score is intact";
            wordFound = true;
            //this makes sure the score is saved incase they spell out a wrong word in the next round
            prevScore = score;
        }
    }
    if (!wordFound) {
        console.log("findWord(): Word Not Found");
        document.getElementById("errors").innerHTML = "Word Not Valid: Word Does Not Exist, board is reset and score will be corrected";
        console.log("current score: " + score);
        //this returns the score back to the prevScore since they made a mistake the first time
        score = prevScore;
        console.log("new score: " + score);
    }
    resetBoard();
    console.log("End Search");
}
//Setter for array lettersOnBoard
function updateLettersOnBoard(letter, index) {
    lettersOnBoard[index] = letter;
}
//See what word you have or if you have more then one word
function checkWord() {
    var firstIndex = 0;
    var lastIndex = 0;
    var moreThanOneWord = false;
    var firstLetter = true;
    var lastLetter = true;

    for (var i = 0; i <= lettersOnBoard.length - 1; i++) {
        if (lettersOnBoard[i] != '' && firstLetter == true) {
            word += lettersOnBoard[i];
            firstLetter = false;
            firstIndex = i;
            console.log(word);
        } else if (lettersOnBoard[i] != '' && firstLetter == false) {
            word += lettersOnBoard[i];
            lastIndex = i;
            console.log(word);
        }
    };
    //check to see if there is space between the words
    for (var i = firstIndex; i <= lastIndex; i++) {
        //if theres a white space then word is invalid
        if (lettersOnBoard[i] == '') {
            console.log("checkWord(): invalid Word");
            document.getElementById("errors").innerHTML = "Word Not Valid: Has Spaces Between Letters";
            invalidWord = true;
        }
    };
    console.log("checkWord(): word: " + word);
}
//function for the submit button
function submitWord() {
    checkWord();
    if (invalidWord) {
        console.log("submitWord(): word not valid");
    } else {
        findWord();
    }
    word = '';
    lettersOnBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
}