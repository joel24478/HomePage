function TableCreater() {
    //grab the values from the form and place them in variables
    var rowsFrom = $('input[name=rowsFrom').val();
    var columnsFrom = $('input[name=columnsFrom').val();
    var rowsTo = $('input[name=rowsTo').val();
    var columnsTo = $('input[name=columnsTo').val();
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
    //check fpt errors in the users input
    if (InputChecker(rowCount, columnCount);) {
        return;
    }
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

function InputChecker(rowCount, columnCount) {
    if (rowCount > 15 || rowCount < 0) {
        alert("Row range is too big(keep it 15 or lower please) or is two small(might have a negative value)");
        return false;
    }
    if (isNaN(rowCount)) {
        alert("Row entered has string. Enter digits por favor (please)");
        return false;
    }
    if (columnCount > 15 || columnCount < 0) {
        alert("Column range is too big(keep it 15 or lower please) or is two small(might have a negative value)");
        return false;
    }
    if (isNaN(columnCount)) {
        alert("Column entered has string. Enter digits pofavor (please)");
        return false;
    }
    return true;
};