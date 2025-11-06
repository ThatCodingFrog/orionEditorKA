var currentTab = "index.html";

function createNewEditorTab(filename) {
    var fileTrack = document.getElementById("fileTrack");

    var newTab = document.createElement("span");
    newTab.className = "fileTab";
    newTab.id = filename;
    newTab.innerText = filename;

    if (currentTab == filename) {
        newTab.style.background = "gainsboro";
    } else {
        newTab.style.background = "white";
    }

    newTab.addEventListener("click", function() {
        updateCurrentFileTab(this.id);
    });

    updateCurrentFileTab(this.id);
    fileTrack.appendChild(newTab);
}

function updateCurrentFileTab(tab) {
    var tab = document.getElementById(tab);
    var prevTab = document.getElementById(currentTab);

    prevTab.style.background = "white";
    tab.style.background = "gainsboro";

    currentTab = tab;
}

function getEditorTabs() {
    
}
