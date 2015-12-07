//Sets up the board to a basic oneline pattern
function createBoard() {
    strContent = '';

    for (var i = 0; i < 15; i++) {
        if (i == 2 || i == 12) {
            strContent += '<div id="DWS' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_DWS.jpg" alt="DWS"></div>';
            $("#DWS").droppable({
                accept: '#tile0'
            });

        } else if (i == 6 || i == 8) {
            strContent += '<div id="DLS' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_DLS.jpg" alt="DLS"></div>';
            $("#DLS").droppable({
                accept: '#tile0'
            });
        } else {
            strContent += '<div id="Blank' + i + '"><img class="scrabbleBoard" src="assets/images/scrabble/Scrabble_Board_Piece_Blank.png" alt="Blank"></div>';
            $("#Blank").droppable({
                accept: '#tile0'
            });
        }
    };
    document.getElementById("scrabbleBoard").innerHTML = strContent;
    for (var i = 0; i < 15; i++) {
        if (i == 2 || i == 12) {
            $("#DWS" + i).droppable({
                accept: '#tile0'
            });

        } else if (i == 6 || i == 8) {
            $("#DLS" + i).droppable({
                accept: '#tile0'
            });
        } else {
            $("#Blank" + i).droppable({
                accept: '#tile0'
            });
        }
    }
}
//Fills the rack with tiles
function fillRack() {
    var letter = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //All possible letters to chose from
    var strContent = '';
    var rackPosition = $("#scrabbleRack").offset(); //get rack position
    var boardPosition = $("#scrabbleBoard").position(); //get boards position
    var tilePosition;

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
            strContent += addTile(letter, i);
            console.log("strContent: " + strContent);
        }
    }
    document.getElementById("tiles").innerHTML = strContent;
    for (var i = 0; i < 7; i++) {
        //set tiles on rack
        $("#tile" + i).offset({
            top: rackPosition.top,
            left: rackPosition.left + 450 + (70 * i) //move the position by 500(width of rack) + (70(size of tile) * i)
        })
        $("#tile" + i).draggable({
            snap: ".scrabbleBoard",
            revert: "valid"
        });
    }

}
/**
 * @param {string} letter - tile piece letter
 * @param {string} number - to create id for tile piece
 *gets passed a letter and makes html code to be added
 * @returns {string} - html code
 */
function addTile(letter, number) {
    return "<div id='tile" + number + "'> <img class='tiles' src='assets/images/scrabble/Scrabble_Tile_" + letter + ".jpg' alt='Board'></div>";
}