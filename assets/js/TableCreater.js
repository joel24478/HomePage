function TableCreater(rowFrom, rowTo, columnFrom, columnTo) { //grab the values from the form and place them in variables
    var rowsFrom = rowFrom;
    var columnsFrom = columnFrom;
    var rowsTo = rowTo;
    var columnsTo = columnTo;
    var rowCount = rowsTo - rowsFrom;
    var columnCount = columnsTo - columnsFrom;
    var value;
    //used to store content so it can be place on the page
    var strContent = "";
    var i, j, k;
    //testing out values that were grabbed from the form
    console.log('Number of rowsFrom: ' + rowsFrom);
    console.log('Number of rowsTo: ' + rowsTo);
    console.log('Number of columnsFrom: ' + columnsFrom);
    console.log('Number of columnsTo: ' + columnsTo);
    console.log('Number of rowCount: ' + rowCount);
    console.log('Number of columnCount: ' + columnCount);
    /*Commented out because jquery validation plugin is added to handle errors
    //check fpt errors in the users input
    if (!InputChecker(rowCount, columnCount)) {
        return false;
    }
    */
    //starts the table
    strContent += "<table class='sectionTable'>";
    //creates top row for the table
    strContent += "<thead><tr>";
    strContent += "<th>" + "</th>";
    //adds the values into the row for the table
    for (i = 1; i <= rowCount + 1; i++) {
        value = parseInt(rowsFrom) + (i - 1);
        strContent += "<th>" + value + "</th>";
    }

    strContent += "</tr></thead>";
    strContent += '<tbody>';

    for (i = 0; i <= columnCount; i++) {
        strContent += '<tr>';
        //Get the first number for the table
        value = parseInt(columnsFrom) + i;
        strContent += '<td>' + value + "</td>";
        //for loops goes placing the actual multiplied value
        for (j = 1; j <= rowCount + 1; j++) {
            value = parseInt(rowsFrom) + (j - 1);
            //console.log("value before = " + value);
            value *= (parseInt(columnsFrom) + i);
            strContent += "<td>" + value + "</td>";
            //console.log("***value now = " + value);
        }
        strContent += "</tr>";
        //console.log('i: ' + i);
    }
    //close table
    strContent += "</tbody></table>";

    // place dynamic content on page
    document.getElementById("tableContent").innerHTML = strContent;
};

$(function InputChecker(rowCount, columnCount) {
    var error = false;
    if ($.trim($('#columnsFrom').val()) == '') {
        $("#errorMessage").html("<p>Field is empty</p>");
        $("#errorMessage").html("Enter value in Column");
        $("#columnsFrom").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if ($.trim($('#columnsTo').val()) == '') {
        $("#errorMessage").html("<p>Field is empty</p>");
        $("#errorMessage").html("Enter value in Column");
        $("#columnsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if ($.trim($('#rowsFrom').val()) == '') {
        $("#errorMessage").html("<p>Field is empty</p>");
        $("#errorMessage").html("Enter value in Column");
        $("#rowsFrom").css("background-color", "#F3090F");
        error = true;
        //return false;
    }

    if ($.trim($('#rowsTo').val()) == '') {
        $("#errorMessage").html("Enter value in Column");
        $("#rowsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if (rowCount > 15 || rowCount < 0) {
        $("#errorMessage").html("<p>Row range is too big or is two small, keep range at 15 and avoid a negative range</p>");
        $("#rowsFrom").css("background-color", "#F3090F");
        $("#rowsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if (isNaN(rowCount)) {
        $("#errorMessage").html("<p>Value entered in Row is a string. Enter digits please</p>");
        $("#rowsFrom").css("background-color", "#F3090F");
        $("#rowsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if (columnCount > 15 || columnCount < 0) {
        $("#errorMessage").html("<p>Column range is too big or is two small, keep range at 15 and avoid a negative range</p>");
        $("#columnsFrom").css("background-color", "#F3090F");
        $("#columnsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if (isNaN(columnCount)) {
        $("#errorMessage").html("Value entered in Column is a string. Enter digits please");
        $("#columnsFrom").css("background-color", "#F3090F");
        $("#columnsTo").css("background-color", "#F3090F");
        error = true;
        //return false;
    }
    if (error == false) {
        $("#errorMessage").html("");
        $("#columnsFrom").css("background-color", "#ffffff");
        $("#columnsTo").css("background-color", "#ffffff");
        $("#rowsFrom").css("background-color", "#ffffff");
        $("#rowsTo").css("background-color", "#ffffff");
    }
    //clears away error message 

    return false;
});