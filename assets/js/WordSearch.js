//holds all words
var dictionary = new Array();
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
//letters on the board
var lettersOnBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
//words on the board
var wordsOnBoard = [];
var word = '';
var invalidWord = false;

//Finds if word formed is an actual word
function findWord() {
    var wordFound = false;
    console.log("Searching for word: " + word);
    for (var i = dictionary.length - 1; i >= 0; i--) {
        if (dictionary[i] == word) {
            console.log("Word found!");
            document.getElementById("errors").innerHTML = "Word Found!";
            wordFound = true;
        }
    }
    if (!wordFound) {
        console.log("Word Not Found");
        document.getElementById("errors").innerHTML = "Word Not Valid<p>Word Does Not Exist</p>";
    }
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
    for (var i = firstIndex; i <= lastIndex; i++) {
        if (lettersOnBoard[i] == '') {
            console.log("invalid Word");
            document.getElementById("errors").innerHTML = "Word Not Valid<p>*Has Spaces</p>";
            invalidWord = true;
        }
    };
    console.log("word: " + word);
}

function submitWord() {
    checkWord();
    if (invalidWord) {
        console.log("word not valid");
    } else {
        findWord();
    }
}