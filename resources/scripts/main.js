var editor = ace.edit("editor");
editor.setTheme("ace/theme/textmate");
editor.session.setMode("ace/mode/html");

editor.commands.addCommands([
    {
        name: "foldAll",
        bindKey: { win: "Ctrl-Alt-0", mac: "Command-Alt-0" },
        exec: function (editor) { editor.session.foldAll(); }
    },
    {
        name: "find",
        bindKey: { win: "Ctrl-F", mac: "Command-F" },
        exec: function (editor) { editor.execCommand("find"); }
    },
    {
        name: "toggleComment",
        bindKey: { win: "Ctrl-/", mac: "Command-/" },
        exec: function (editor) { editor.toggleCommentLines(); }
    },
    {
        name: "toUpperCase",
        bindKey: { win: "Ctrl-U", mac: "Command-U" },
        exec: function (editor) {
            var range = editor.getSelectionRange();
            var text = editor.session.getTextRange(range).toUpperCase();
            editor.session.replace(range, text);
        }
    },
    {
        name: "toLowerCase",
        bindKey: { win: "Ctrl-Shift-U", mac: "Command-Shift-U" },
        exec: function (editor) {
            var range = editor.getSelectionRange();
            var text = editor.session.getTextRange(range).toLowerCase();
            editor.session.replace(range, text);
        }
    },
    {
        name: "outdent",
        bindKey: { win: "Shift-Tab", mac: "Shift-Tab" },
        exec: function (editor) { editor.blockOutdent(); }
    },
    {
        name: "removeLine",
        bindKey: { win: "Ctrl-D", mac: "Command-D" },
        exec: function (editor) { editor.removeLines(); }
    },
    {
        name: "goToMatchingBracket",
        bindKey: { win: "Ctrl-P", mac: "Command-P" },
        exec: function (editor) { editor.jumpToMatching(); }
    },
    {
        name: "selectToMatchingBracket",
        bindKey: { win: "Ctrl-Shift-P", mac: "Command-Shift-P" },
        exec: function (editor) { editor.jumpToMatching(true); }
    },
    {
        name: "copyLinesDown",
        bindKey: { win: "Alt-Shift-Down", mac: "Option-Shift-Down" },
        exec: function (editor) { editor.copyLinesDown(); }
    },
    {
        name: "copyLinesUp",
        bindKey: { win: "Alt-Shift-Up", mac: "Option-Shift-Up" },
        exec: function (editor) { editor.copyLinesUp(); }
    },
    {
        name: "undo",
        bindKey: { win: "Ctrl-Z", mac: "Command-Z" },
        exec: function (editor) { editor.undo(); }
    },
    {
        name: "redo",
        bindKey: { win: "Ctrl-Shift-Z|Ctrl-Y", mac: "Command-Shift-Z|Command-Y" },
        exec: function (editor) { editor.redo(); }
    },
    {
        name: "addCursorAbove",
        bindKey: { win: "Ctrl-Alt-Up", mac: "Command-Alt-Up" },
        exec: function (editor) { editor.selectMoreLines(-1); }
    },
    {
        name: "addCursorBelow",
        bindKey: { win: "Ctrl-Alt-Down", mac: "Command-Alt-Down" },
        exec: function (editor) { editor.selectMoreLines(1); }
    }
]);

editor.session.on('change', function () {
    var totalLines = editor.session.getLength();
    document.getElementById('totalLines').textContent = 'Lines: ' + totalLines;
});
editor.session.on('change', function () {
    var totalChars = editor.session.getValue().length;
    document.getElementById('totalChars').textContent = 'Chars: ' + totalChars;
});

// File drop functionality
var editorDiv = document.getElementById("editor");

editorDiv.addEventListener("dragover", function (event) {
    event.preventDefault();
    editorDiv.classList.add("droppable");
});

editorDiv.addEventListener("dragleave", function (event) {
    editorDiv.classList.remove("droppable");
});

editorDiv.addEventListener("drop", function (event) {
    event.preventDefault();
    editorDiv.classList.remove("droppable");

    var files = event.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            editor.setValue(e.target.result);
            updatePreview();
        };
        reader.readAsText(file);
    }
});

// Autocomplete
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: "0.8rem",
    wrap: true,
    customScrollbar: true,
    enableInlineAutocompletion: true,
});

// Function to update the preview
function updatePreview() {
    var code = editor.getValue();
    var iframe = document.getElementById('preview');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
}

// Initial preview update
editor.setValue(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Webpage</title>
        <style>
            h1 {
                color: red;
            }
        </style>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>This is a live preview.</p>
    </body>
</html>`);
updatePreview();

// Update preview on editor change
editor.session.on('change', function () {
    updatePreview();
});

function beautifyCode() {
    Promise.resolve()
        .then(() => {
            var code = editor.getValue();
            var beautified = html_beautify(code);
            editor.setValue(beautified, 1);
            updatePreview();
            console.log("Code beautified successfully.");
        })
        .catch(e => {
            alert("There was an error beautifying the code: " + e.message);
            console.error("Error beautifying code:", e);
        });
}
function copyCode() {
    var code = editor.getValue();
    navigator.clipboard.writeText(code).then(function () {
        alert('Code copied to clipboard!');
    }, function (err) {
        alert('Failed to copy code: ', err);
    });
}
function saveCode() {
    Promise.resolve()
        .then(() => {
            var code = editor.getValue();
            //localStorage.setItem('ORION_EDITOR_CODE', code);
            orionVFS.writeFile('index.html', code);
            alert('Code saved to localStorage!');
            console.log("Code saved to localStorage.");
        })
        .catch(e => {
            alert("There was an error saving the code: " + e.message);
            console.error("Error saving code:", e);
        });
}
function downloadCode() {
    try {
        var code = editor.getValue();
        var blob = new Blob([code], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Code downloaded!');
        console.log("Code downloaded.");

    } catch (e) {
        alert("There was an error downloading the code: " + e.message);
        console.error("Error downloading code:", e);
    };
}
function uploadCode() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.htm,.txt';
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            editor.setValue(e.target.result);
            updatePreview();
        };
        reader.readAsText(file);
    };
    input.click();
}

function createNewFile() {
    var filename = prompt("Enter a name for your new file: ", "myFile");
    var ext = prompt("Enter the file extension (html, css, js): ", "js");
    orionVFS.createFile(filename, ext);

    createNewEditorTab(filename + "." + ext);
}
function notAddedYet() {
    alert("This feature is not added yet.");
}

var iframe = document.getElementById('preview');
function updateIframeSize() {
    document.getElementById('canvasWidth').textContent = iframe.offsetWidth;
    document.getElementById('canvasHeight').textContent = iframe.offsetHeight;
}
updateIframeSize();
setInterval(updateIframeSize, 1);

// Resizer functionality
const resizer = document.getElementById('resizer');
const editorContainer = document.getElementById('editor-container');
const previewContainer = document.getElementById('preview-container');
let isResizing = false;

resizer.addEventListener('mousedown', function (e) {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;
    let parent = resizer.parentNode;
    let totalWidth = parent.offsetWidth;
    let offset = e.clientX - parent.offsetLeft;
    // Minimum width for both panes
    let minWidth = 100;
    if (offset < minWidth) offset = minWidth;
    if (offset > totalWidth - minWidth) offset = totalWidth - minWidth;
    editorContainer.style.width = offset + 'px';
    previewContainer.style.width = (totalWidth - offset - resizer.offsetWidth) + 'px';
});

document.addEventListener('mouseup', function (e) {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
    }
});

var restartBtn = document.querySelector('#restart-icon');
function rotate() {
    restartBtn.style.animation = "rotate 0.35s ease-out";
    window.setTimeout(function () {
        restartBtn.style.animation = "none";
    }, 350)
}

function updateTime() {
    const timeDiv = document.querySelector('.time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    timeDiv.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateTime, 1000);
updateTime();

function openFullscreenPreview() {
    var code = editor.getValue();
    var newTab = window.open('', '_blank');
    newTab.document.write(code);
    newTab.document.close();
}

const themeBtn = document.getElementById("theme");
let currentTheme = 0;
const changeTheme = () => {
    document.body.classList.toggle("dark");
    if (currentTheme === 1) {
        editor.setTheme("ace/theme/textmate");
        currentTheme = 0;
        themeBtn.innerHTML = "dark_mode";
    } else {
        editor.setTheme("ace/theme/monokai");
        currentTheme = 1;
        themeBtn.innerHTML = "light_mode";
    }
};
themeBtn.addEventListener("click", changeTheme);

var editorIsShowing = true;

function toggleEditor() {
    if (editorIsShowing) {
        editorContainer.style.display = 'none';
        previewContainer.style.width = '100%';
        resizer.style.display = 'none';
        editorIsShowing = false;
    } else {
        editorContainer.style.display = 'block';
        previewContainer.style.width = '50%';
        resizer.style.display = 'block';
        editorIsShowing = true;
    }
}
window.addEventListener('resize', function () {
    if (window.innerWidth <= 800) {
        editorContainer.style.display = 'block';
        previewContainer.style.width = '100%';
        resizer.style.display = 'none';
        editorIsShowing = false;
    } else {
        if (editorIsShowing) {
            editorContainer.style.display = 'none';
            previewContainer.style.width = '100%';
            resizer.style.display = 'none';
        } else {
            editorContainer.style.display = 'block';
            previewContainer.style.width = '50%';
            resizer.style.display = 'block';
        }
    }
});
window.onload = async function () {
    if (window.innerWidth <= 800) {
        editorContainer.style.display = 'block';
        previewContainer.style.width = '100%';
        resizer.style.display = 'none';
        editorIsShowing = false;
    }
    //const savedCode = localStorage.getItem('ORION_EDITOR_CODE');
    const savedCode = await orionVFS.readFile('index.html');
    if (savedCode) {
        editor.setValue(savedCode);
        updatePreview();
    }
};
