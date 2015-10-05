// N.B.  This version *does* apply the CSS.
function placeContent(story) {
    var strContent = "";

    // create dynamic content from JSON
    strContent += "<h1 class='title'>" + story.title + "</h1>";
    strContent += "<h2 class='author'>by " + story.author + "</h2>";
    strContent += "<h3 class='location'>" + story.location + "</h3>";

    // loop through all the paragraphs and sentences
    for (var para = 0; para < story.text.paragraphs.length; para++) {
        strContent += "<p>";
        for (var sent = 0; sent < story.text.paragraphs[para].length; sent++) {
            strContent += story.text.paragraphs[para][sent] + "&nbsp; ";
        }
        strContent += "</p>";
    }

    // place dynamic content on page
    // document.getElementById( "content" ).innerHTML = strContent ;
    $("#content").html(strContent);
}