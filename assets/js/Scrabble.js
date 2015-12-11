var score = 0;
var prevScore = 0;
var letter = '';
var letterIndex = 0;
var DWS = false;
//Sets up the board to a basic oneline pattern
function createBoard() {
    strContent = '';

    for (var i = 0; i < 15; i++) {
        if (i == 2 || i == 12) {
            strContent += '<div id="DWS' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_DWS.jpg" alt="' + i + '"></div>';

        } else if (i == 6 || i == 8) {
            strContent += '<div id="DLS' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_DLS.jpg" alt="' + i + '"></div>';
        } else {
            strContent += '<div id="Blank' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_Blank.png" alt="' + i + '"></div>';
        }
    };
    document.getElementById("scrabbleBoard").innerHTML = strContent;
    console.log("creating droppables");
    for (var i = 0; i < 15; i++) {
        if (i == 2 || i == 12) {
            console.log("creating droppable DWS");
            $("#DWS" + i).droppable({
                tolerance: 'intersect',
                //accept: '.ui-draggable',
                drop: function(event, ui) {
                    console.log("dropped");
                    //snap to center modified from here:
                    /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */
                    //got it from Alex Nevers
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function(pos) {
                            $(this).animate(pos, 200, "linear");
                        }
                    });
                    $(this).droppable('option', 'accept', ui.draggable); //lets draggable object be placed ontop of this droppable object 
                    //sets object so it cant be moved
                    //easier to keep score since hovering activates updateScore()
                    ui.draggable.draggable("option", "disabled", true);
                    console.log("passed value to updateScore: " + ui.draggable.children("img").attr("alt"));
                    console.log("tile being dropped: " + ui.draggable.attr("id"));
                    //Double Word Score is activated to double score
                    DWS = true;
                    //update score based on the value of the tile which is stored in alt attribute
                    updateScore(parseInt(ui.draggable.children("img").attr("alt")));
                    //get the letter of the tile
                    letter = ui.draggable.children("img").attr("src").replace('assets/images/scrabble/Scrabble_Tile_', '').replace('.jpg', '');
                    letterIndex = $(this).children("img").attr("alt");
                    console.log(letter + ' index: ' + letterIndex);
                    //pass the letter and index for the word to be formed
                    updateLettersOnBoard(letter, letterIndex);
                },
                tolerance: 'intersect'
            });
        } else if (i == 6 || i == 8) {
            console.log("creating droppable DLS");
            $("#DLS" + i).droppable({
                tolerance: 'intersect',
                //accept: '.ui-draggable',
                drop: function(event, ui) {
                    console.log("dropped");
                    //snap to center modified from here:
                    /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */
                    //got it from Alex Nevers
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function(pos) {
                            $(this).animate(pos, 200, "linear");
                        }
                    });
                    $(this).droppable('option', 'accept', ui.draggable); //lets draggable object be placed ontop of this droppable object 
                    //sets object so it cant be moved
                    //easier to keep score since hovering activates updateScore()
                    ui.draggable.draggable("option", "disabled", true);
                    console.log("passed value to updateScore: " + ui.draggable.children("img").attr("alt"));
                    console.log("tile being dropped: " + ui.draggable.attr("id"));
                    //update score based on the value of the tile which is stored in alt attribute
                    //converts string to int with parseInt function
                    updateScore(parseInt(ui.draggable.children("img").attr("alt")) * 2);
                    //get the letter of the tile
                    letter = ui.draggable.children("img").attr("src").replace('assets/images/scrabble/Scrabble_Tile_', '').replace('.jpg', '');
                    letterIndex = $(this).children("img").attr("alt");
                    console.log(letter + ' index: ' + letterIndex);
                    //pass the letter and index for the word to be formed
                    updateLettersOnBoard(letter, letterIndex);
                },
                tolerance: 'intersect'
            });
        } else {
            console.log("creating droppable Blank");
            $("#Blank" + i).droppable({
                tolerance: 'intersect',
                //accept: '.ui-draggable',
                drop: function(event, ui) {
                    console.log("dropped");
                    //snap to center modified from here:
                    /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */
                    //got it from Alex Nevers
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function(pos) {
                            $(this).animate(pos, 200, "linear");
                        }
                    });
                    $(this).droppable('option', 'accept', ui.draggable); //lets draggable object be placed ontop of this droppable object 
                    //sets object so it cant be moved
                    //easier to keep score since hovering activates updateScore()
                    ui.draggable.draggable("option", "disabled", true);
                    console.log("passed value to updateScore: " + ui.draggable.children("img").attr("alt"));
                    console.log("tile being dropped: " + ui.draggable.attr("id"));
                    //update score based on the value of the tile which is stored in alt attribute
                    updateScore(parseInt(ui.draggable.children("img").attr("alt")));
                    //get the letter of the tile
                    letter = ui.draggable.children("img").attr("src").replace('assets/images/scrabble/Scrabble_Tile_', '').replace('.jpg', '');
                    letterIndex = $(this).children("img").attr("alt");
                    console.log(letter + ' index: ' + letterIndex);
                    //pass the letter and index for the word to be formed
                    updateLettersOnBoard(letter, letterIndex);
                },
                tolerance: 'intersect'
            });
        }
    }
}
//Fills the rack with tiles
function fillRack() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //All possible letters to chose from
    var strContent = '';
    var rackPosition = $("#scrabbleRack").offset(); //get rack position
    var boardPosition = $("#scrabbleBoard").position(); //get boards position
    var tileValue = '';

    // console.log("scrabbleBoard position top: " + boardPosition.top);
    // console.log("scrabbleBoard position left: " + boardPosition.left);

    // console.log("scrabbleRack position top: " + rackPosition.top);
    // console.log("scrabbleRack position left: " + rackPosition.left);

    for (var i = 0; i < 7; i++) {
        //got from: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
        letter = possible.charAt(Math.floor(Math.random() * possible.length)); //selects a random tile
        console.log("letter: " + letter);
        //if there is no other tile then select another tile
        //this happens to tiles that only have one such as z and j, cant have 2 z or j tiles
        if (ScrabbleTiles[letter]["number-remaining"] == 0) {
            console.log("No more " + letter + "\'s remaining");
            i--;
        } else {
            console.log("number-remaining(before): " + ScrabbleTiles[letter]["number-remaining"]);
            ScrabbleTiles[letter]["number-remaining"]--; //decrement the number of availble tiles
            console.log("number-remaining(after): " + ScrabbleTiles[letter]["number-remaining"]);
            tileValue = ScrabbleTiles[letter]["value"];
            console.log("tileValue: " + tileValue);
            strContent += addTile(letter, i, tileValue);
            //console.log("strContent: " + strContent);
        }
    }
    document.getElementById("tiles").innerHTML = strContent;
    for (var i = 0; i < 7; i++) {
        //set tiles on rack
        console.log("Creating tile" + i);
        $("#tile" + i).offset({
                top: rackPosition.top,
                left: rackPosition.left + 450 + (70 * i) //move the position by 500(width of rack) + (70(size of tile) * i)
            })
            //console.log("Making tile" + i + " draggable");
        $("#tile" + i).draggable({
            snap: ".ui-droppable",
            snapMode: "inner",
            revert: 'invalid'
        });
    }

}
/**
 * @param {string} letter - tile piece letter
 * @param {string} number - to create id for tile piece
 * gets passed a letter and makes html code to be added
 * @returns {string} - html code
 */
function addTile(letter, number, value) {
    return "<div id='tile" + number + "'> <img class='tiles' src='assets/images/scrabble/Scrabble_Tile_" + letter + ".jpg' alt='" + value + "'></div>";
}

//New Letters
function newTiles() {
    fillRack();
}

/**
 * @param {integer} value - tile piece value
 * gets passed a the value to be added onto score
 */
function updateScore(value) {
    score += value;
    console.log("updateScore(): score = " + score);
    if (DWS) {
        document.getElementById("points").innerHTML = score * 2;
    } else {
        document.getElementById("points").innerHTML = score;
    }
    console.log("updateScore(): New score = " + score);
}
//takes global score and corrects the display
function newScore() {
    document.getElementById("points").innerHTML = score;
}
//reset score to 0
function resetScore() {
    score = prevScore = 0;
    document.getElementById("points").innerHTML = score;
}

//resets the tiles and board
function resetBoard() {
    createBoard();
    fillRack();
    newScore();
    word = '';
    lettersOnBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
}
//resets the whole game
function resetGame() {
    createBoard();
    fillRack();
    word = '';
    lettersOnBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    resetScore();
    document.getElementById("errors").innerHTML = "None";
}