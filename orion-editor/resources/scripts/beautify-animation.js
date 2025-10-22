               var canvas = document.getElementById('beautify-animation');
                var ctx = canvas.getContext('2d');
                var loaderPositions = [];
                var animationActive = false;

                function resizeCanvas() {
                    // Make canvas fill its parent
                    canvas.width = canvas.parentElement.offsetWidth;
                    canvas.height = canvas.parentElement.offsetHeight;
                }

                function initLoaders() {
                loaderPositions = [];
                var squareSize = canvas.width / 25;
                for (var i = 0; i < 20; i++) {
                    var x = Math.floor(Math.random() * (canvas.width - squareSize));
                    var y = Math.floor(Math.random() * (200 - squareSize));
                    var speed = Math.random() * (0.05 - 0.01) + 0.01;
                    var rotSpeed = Math.random() * (0.1 - (-0.1)) + (-0.1);
                    var h = canvas.height / 25;
                    // Rainbow colors
                    var rainbowColors = [
                        "#FF0000", // Red
                        "#FF7F00", // Orange
                        "#FFFF00", // Yellow
                        "#00FF00", // Green
                        "#0000FF", // Blue
                        "#4B0082", // Indigo
                        "#9400D3"  // Violet
                    ];
                    var color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
                    loaderPositions.push({
                        x: x,
                        y: y,
                        w: squareSize,
                        h: h,
                        opacity: 1,
                        speed: speed,
                        rotSpeed: rotSpeed,
                        rotation: 0,
                        color: color
                    });
                }
            }

            function drawLoader() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < loaderPositions.length; i++) {
                    var pos = loaderPositions[i];
                    ctx.save();
                    ctx.translate(pos.x, pos.y);
                    ctx.rotate(pos.rotation);
                    ctx.scale(2,3); // scale shape to loader size

                    ctx.beginPath();
                    ctx.moveTo(35, 39.4);
                    ctx.bezierCurveTo(35, 39.4, 33.8, 39.7, 33.5, 40.0);
                    ctx.bezierCurveTo(33.2, 40.3, 32.9, 41.5, 32.9, 41.5);
                    ctx.bezierCurveTo(32.9, 41.5, 32.5, 40.4, 32.2, 40.1);
                    ctx.bezierCurveTo(31.9, 39.8, 30.7, 39.4, 30.7, 39.4);
                    ctx.bezierCurveTo(30.7, 39.4, 31.9, 38.8, 32.2, 38.6);
                    ctx.bezierCurveTo(32.4, 38.3, 32.9, 37.2, 32.9, 37.2);
                    ctx.bezierCurveTo(32.9, 37.2, 33.3, 38.3, 33.6, 38.6);
                    ctx.bezierCurveTo(33.8, 38.9, 35, 39.4, 35, 39.4);
                    ctx.closePath();

                    ctx.fillStyle = hexToRgba(pos.color, pos.opacity);
                    ctx.fill();
                    ctx.restore();

                    pos.opacity = Math.max(0, pos.opacity - pos.speed);
                    pos.y += pos.speed * 25;
                    pos.rotation += pos.rotSpeed;
                }
            }

            // Helper to convert hex to rgba with opacity
            function hexToRgba(hex, opacity) {
                var c = hex.replace('#', '');
                if (c.length === 3) {
                    c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
                }
                var r = parseInt(c.substring(0,2),16);
                var g = parseInt(c.substring(2,4),16);
                var b = parseInt(c.substring(4,6),16);
                return `rgba(${r},${g},${b},${opacity})`;
            }

                function animate() {
                    if (!animationActive) return;
                    drawLoader();
                    if (loaderPositions.every(pos => pos.opacity === 0)) {
                        animationActive = false;
                        return;
                    }
                    requestAnimationFrame(animate);
                }

                function startBeautifyAnimation() {
                    resizeCanvas();
                    initLoaders();
                    animationActive = true;
                    animate();
                }

                document.getElementById('beautifyCode').addEventListener('click', startBeautifyAnimation);

                window.addEventListener('resize', function() {
                    if (animationActive) {
                        resizeCanvas();
                        initLoaders();
                    } else {
                        resizeCanvas();
                    }
                });

                // Initial canvas sizing
                resizeCanvas();
