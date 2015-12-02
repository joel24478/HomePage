var tabCounter = 0;
var id = "tabs-";
var tabTemplate = "<li><a href='#{href}'> #{label} <img src='assets/images/x-icon.png' class='x-icon' onclick=\"removeTab('#tabs-#{num}', #{num})\"></a></li>";
var tabTemplate2 = "<div id='#{id}'><!--dynamic table--><div id='tableContent-#{num}'></div></div>";

//Tab customizations
var tabs = $("#tabs").tabs();

//pass the id of the element you want tab to be added on.
function addTab(idValue) {
    tabCounter++;
    id = "tabs-" + tabCounter;
    console.log("id: " + id);
    console.log("idValue: " + idValue);
    //append this new tab data to target
    $(idValue).find(".ui-tabs-nav").append(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, tabCounter).replace(/#\{num\}/g, tabCounter));
    $(idValue).append(tabTemplate2.replace(/#\{id\}/g, id).replace(/#\{num\}/g, tabCounter));
    console.log("tabCounter: " + tabCounter);
    $("#tabs").tabs("refresh");
    //Add TableCreater() after because refresh would wipe it out
    TableCreater(0, 5, 0, 5, tabCounter);
}

//pass the id of the element you want removed
//idValue - the id's value for target tag
//value - digit at the end of target idValue
function removeTab(idValue, value) {
    //to prevent last tabs from being closed, also prevents tabCounter from reachign zero
    console.log("removing tab: " + idValue);
    if (tabCounter == 0) {
        console.log("last tab, cant close");
        return;
    }
    //remove the panel
    $("#tabs> div[id='tabs-" + value + "']").remove();
    //console.log("idValue: " + idValue);
    //remove the tab
    $("#tabs >ul > li[aria-controls='tabs-" + value + "']").remove();
    $("#tabs").tabs("refresh");
    console.log("tab removed");
}
//return the id of last tab created
function lastTab() {
    return id;
}
//return the number of tabs opened
function tabCount() {
    return tabCounter;
}
//return the ui-id(panel) for the tab that we are currently displaying
function currentTab() {
    // var currentTab = $(".ui-state-active").attr("aria-controls");
    // console.log("currentTab: " + currentTab);
    // if (currentTab == undefined) {
    //     return 0;
    // }
    // currentTab = currentTab.replace('tabs-', '');
    console.log("currentTab returns: " + $(".ui-state-active").attr("aria-controls").replace('tabs-', ''));
    // return currentTab;
    return $(".ui-state-active").attr("aria-controls").replace('tabs-', '');
}