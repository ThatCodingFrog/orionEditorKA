function createNewEditorTab(filename) {
    var fileTrack = document.getElementById("fileTrack");

    var newTab = document.createElement("span");
    newTab.className = "fileTab";
    newTab.id = filename;
    newTab.innerText = filename;

    if (currentFile == filename) {
        newTab.style.background = "gainsboro";
    } else {
        newTab.style.background = "white";
    }

    newTab.addEventListener("click", function() {
        updateCurrentFileTab(this.id);
    });

    //updateCurrentFileTab(this.id);
    fileTrack.appendChild(newTab);
}

function updateCurrentFileTab(tab) {
    console.log(currentFile, tab);
    var tab = document.getElementById(tab);
    var prevTab = document.getElementById(currentFile);

    prevTab.style.background = "white";
    tab.style.background = "gainsboro";

    currentFile = tab.id;
}

function getEditorTabs() {
    
}
