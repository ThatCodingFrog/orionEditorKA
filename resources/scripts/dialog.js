//prompt() function rewritten by ChatGPT on 3/18/26 to use Promises and actually be easier to use

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

    prompt: function (messages) {
        return new Promise((resolve, reject) => {
            const fadeBackground = document.getElementById("fadeBackground");
            fadeBackground.style.display = "flex";

            const alertBox = document.createElement('div');
            alertBox.style.width = "30%";
            alertBox.style.height = "250px";
            alertBox.style.backgroundColor = "white";
            alertBox.style.position = "relative";
            alertBox.style.borderRadius = "10px";

            const inputs = [];

            for (let i = 0; i < messages.length; i++) {
                const container = document.createElement('div');
                container.style.position = "absolute";
                container.style.top = (10 + i * 40) + "px";
                container.style.left = "10px";

                const label = document.createElement('span');
                label.innerHTML = messages[i];

                const input = document.createElement('input');
                input.type = "text";
                input.style.marginLeft = "10px";

                inputs.push(input);

                container.appendChild(label);
                container.appendChild(input);
                alertBox.appendChild(container);
            }

            const cleanup = () => {
                fadeBackground.style.display = "none";
                while (fadeBackground.firstChild) {
                    fadeBackground.removeChild(fadeBackground.firstChild);
                }
            };

            const verifyButton = document.createElement("button");
            verifyButton.innerHTML = "OK";
            verifyButton.className = "popup-button";
            verifyButton.style.backgroundColor = "#3CC9A7";
            verifyButton.style.position = "absolute";
            verifyButton.style.right = "0px";
            verifyButton.style.borderRadius = "10px";

            verifyButton.onclick = function () {
                const values = inputs.map(input => input.value);
                cleanup();
                resolve(values); //return values
            };

            const cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Cancel";
            cancelButton.className = "popup-button";
            cancelButton.style.position = "absolute";
            cancelButton.style.borderRadius = "10px";

            cancelButton.onclick = function () {
                cleanup();
                reject("User cancelled"); //reject instead of silent fail
            };

            alertBox.appendChild(verifyButton);
            alertBox.appendChild(cancelButton);
            fadeBackground.appendChild(alertBox);
        });
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