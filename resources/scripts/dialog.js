var orionDialog = {
    alert: function (message) {
        var fadeBackground = document.getElementById("fadeBackground");
        fadeBackground.style.display = "flex";

        var alertBox = document.createElement('div');
        alertBox.style.width = "30%";
        alertBox.style.height = "250px";
        alertBox.style.backgroundColor = "white";
        alertBox.style.position = "relative";
        alertBox.style.borderRadius = "10px";

        var span = document.createElement('span');
        span.innerHTML = message;
        span.style.position = "absolute";
        span.style.marginLeft = "10px";
        span.style.padding = "10px";

        alertBox.appendChild(span);

        var verifyButton = document.createElement("button");
        verifyButton.innerHTML = "OK";
        verifyButton.onclick = function () {
            fadeBackground.style.display = "none";
            for (var i = 0; i < fadeBackground.children.length; i++) {
                //cleanup for future messages
                fadeBackground.removeChild(fadeBackground.children[i]);
            }
        }
        verifyButton.className = "popup-button";
        verifyButton.style.backgroundColor = "#3CC9A7";
        verifyButton.style.left = "50%";
        verifyButton.style.borderRadius = "10px";

        alertBox.appendChild(verifyButton);
        
        fadeBackground.appendChild(alertBox);
    },
    prompt: function (messages, success = function () { }) {
        var fadeBackground = document.getElementById("fadeBackground");
        fadeBackground.style.display = "flex";

        var alertBox = document.createElement('div');
        alertBox.style.width = "30%";
        alertBox.style.height = "250px";
        alertBox.style.backgroundColor = "white";
        alertBox.style.position = "relative";
        alertBox.style.borderRadius = "10px";

        var values = [];

        for (var i = 0; i < messages.length; i++) {
            var span = document.createElement('span');
            span.innerHTML = messages[i];
            span.style.position = "absolute";
            span.style.marginLeft = "10px";
            span.style.padding = "10px";
            span.style.top = 0 + i * 40 + "px";

            var input = document.createElement('input');
            input.type = "text";
            input.style.position = "absolute";
            input.style.marginLeft = "10px";
            span.appendChild(input);

            values.push(input);

            alertBox.appendChild(span);
        }

        var verifyButton = document.createElement("button");
        verifyButton.innerHTML = "OK";
        verifyButton.onclick = function () {
            fadeBackground.style.display = "none";
            success();
            //cleanup for future messages
            for (var i = 0; i < fadeBackground.children.length; i++) {
                fadeBackground.removeChild(fadeBackground.children[i]);
            }
        }
        verifyButton.className = "popup-button";
        verifyButton.style.backgroundColor = "#3CC9A7";
        verifyButton.style.left = "50%";
        verifyButton.style.borderRadius = "0 0 10px 0";

        var cancelButton = document.createElement("button");
        cancelButton.className = "popup-button";
        cancelButton.innerHTML = "Cancel";
        cancelButton.style.borderRadius = "0 0 0 10px";
        cancelButton.onclick = function () {
            fadeBackground.style.display = "none";
            //cleanup for future messages
            for (var i = 0; i < fadeBackground.children.length; i++) {
                fadeBackground.removeChild(fadeBackground.children[i]);
            }
        }

        alertBox.appendChild(verifyButton);
        alertBox.appendChild(cancelButton);

        fadeBackground.appendChild(alertBox);

        console.log(values);
        return values;

    },
    error: function (error) {
        var fadeBackground = document.getElementById("fadeBackground");
        fadeBackground.style.display = "flex";

        var alertBox = document.createElement('div');
        alertBox.style.width = "30%";
        alertBox.style.height = "250px";
        alertBox.style.backgroundColor = "white";
        alertBox.style.position = "relative";
        alertBox.style.borderRadius = "10px";

        var span = document.createElement('span');
        span.innerHTML = `[ERROR]: ${error}`;
        span.style.position = "absolute";
        span.style.marginLeft = "10px";
        span.style.padding = "10px";

        alertBox.appendChild(span);

        var verifyButton = document.createElement("button");
        verifyButton.innerHTML = "OK";
        verifyButton.onclick = function () {
            fadeBackground.style.display = "none";
            for (var i = 0; i < fadeBackground.children.length; i++) {
                //cleanup for future messages
                fadeBackground.removeChild(fadeBackground.children[i]);
            }
        }
        verifyButton.className = "popup-button";
        verifyButton.style.backgroundColor = "#3CC9A7";
        verifyButton.style.left = "50%";
        verifyButton.style.borderRadius = "10px";

        alertBox.appendChild(verifyButton);

        fadeBackground.appendChild(alertBox);
    }
};