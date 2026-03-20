// JavaScript source code
// Splits the button functions out from main.js for easier readability

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
            orionDialog.error("There was an error beautifying the code: " + e.message);
            console.error("Error beautifying code:", e);
        });
}

function copyCode() {
    var code = editor.getValue();
    navigator.clipboard.writeText(code).then(function () {
        orionDialog.alert('Code copied to clipboard!');
    }, function (err) {
        orionDialog.error('Failed to copy code: ', err);
    });
}

function saveCode() {
    Promise.resolve()
        .then(() => {
            var code = editor.getValue();
            localStorage.setItem('ORION_EDITOR_CODE', code);
            orionDialog.alert('Code saved to localStorage!');
            console.log("Code saved to localStorage.");
        })
        .catch(e => {
            orionDialog.error("There was an error saving the code: " + e.message);
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
        orionDialog.alert('Code downloaded!');
        console.log("Code downloaded.");

    } catch (e) {
        orionDialog.error("There was an error downloading the code: " + e.message);
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

async function createNewFile() {
    var filename = await orionDialog.prompt(["Enter a name for your new file: ", "Enter the file extension (html, css, js): "]);
    console.log(filename);
    //var ext = prompt(, "js");
    //orionVFS.createFile(filename, ext);

    //createNewEditorTab(filename + "." + ext);
}
function notAddedYet() {
    orionDialog.alert("This feature is not added yet.");
}