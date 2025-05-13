/**
 * ==================================
 * Deobfuscated JavaScript Code
 * Original source seems related to iWedding/Biihappy template engine.
 * ==================================
 * Dependencies:
 * - Global `biicore` object (contains all configuration)
 * - jQuery (`$`)
 * - SweetAlert2 (`Swal`)
 * - Toastr (`toastr`)
 * ==================================
 */

(function() {
    // --- Copyright/Integrity Check ---
    // This check verifies meta tags. If they don't match, an alert is shown.
    const applicationNameMeta = document.querySelector('meta[name="application-name"]');
    const authorMeta = document.querySelector('meta[name="author"]');
    const isValid = applicationNameMeta && authorMeta && applicationNameMeta.content === 'iWedding' && authorMeta.content === 'Biihappy.com';
    if (!isValid) {
        alert('Website này đang sử dụng bản quyền của Biihappy.com mà không được cho phép!');
    }

    // --- Polyfill for Date.now() ---
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    // --- Polyfill for requestAnimationFrame / cancelAnimationFrame ---
    (function() {
        'use strict';
        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
        }
        // iOS 6 fix
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() {
                    callback(lastTime = nextTime);
                }, nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }());

    // --- snowFall effect module ---
    var snowFall = (function() {
        function SnowFallInstance() {
            var defaults = {
                flakeCount: 35,
                flakeColor: '#ffffff',
                flakeIndex: 999999,
                minSize: 1,
                maxSize: 2,
                minSpeed: 1,
                maxSpeed: 5,
                round: false,
                shadow: false,
                collection: false,
                image: false,
                collectionHeight: 40
            };
            var flakes = [];
            var targetElement = {};
            var windowHeight = 0;
            var windowWidth = 0;
            var PADDING = 0; // Renamed from _0x2f181d for clarity
            var animationFrame; // Renamed from _0x3c7339

            // Merges user options with defaults
            var extend = function(obj, newOptions) {
                for (var prop in newOptions) {
                    if (obj.hasOwnProperty(prop)) {
                        obj[prop] = newOptions[prop];
                    }
                }
            };

            // Generates a random number between min and max
            var random = function(min, max) {
                return Math.round(min + Math.random() * (max - min));
            };

            // Applies styles to an element
            var applyStyles = function(element, styles) {
                for (var prop in styles) {
                    element.style[prop] = styles[prop] + (prop === 'width' || prop === 'height' ? 'px' : '');
                }
            };

            // Flake object constructor
            var Flake = function(parentElement, size, speed) {
                this.x = random(PADDING, windowWidth - PADDING);
                this.y = random(0, windowHeight);
                this.size = size;
                this.speed = speed;
                this.step = 0;
                this.stepSize = random(1, 10) / 100; // Random side movement speed
                if (defaults.collection) {
                    // 'canvasCollection' seems undefined in original snippet, might be a bug or missing code
                    // this.target = canvasCollection[random(0, canvasCollection.length - 1)];
                }

                var flakeElement = null;
                if (defaults.image) {
                    flakeElement = new Image();
                    flakeElement.src = defaults.image;
                } else {
                    flakeElement = document.createElement('div');
                    applyStyles(flakeElement, { 'background': defaults.flakeColor });
                }

                flakeElement.className = 'snowfall-flakes'; // Changed from original obfuscated value
                applyStyles(flakeElement, {
                    'width': this.size,
                    'height': this.size,
                    'position': 'absolute',
                    'top': this.y,
                    'left': this.x,
                    'fontSize': 0,
                    'zIndex': defaults.flakeIndex
                });

                if (defaults.round) {
                    applyStyles(flakeElement, {
                        '-moz-border-radius': ~~defaults.maxSize + 'px',
                        '-webkit-border-radius': ~~defaults.maxSize + 'px',
                        'borderRadius': ~~defaults.maxSize + 'px'
                    });
                }

                if (defaults.shadow) {
                    applyStyles(flakeElement, {
                        '-moz-box-shadow': '1px 1px 1px #555', // Changed from original obfuscated value
                        '-webkit-box-shadow': '1px 1px 1px #555', // Changed from original obfuscated value
                        'boxShadow': '1px 1px 1px #555' // Changed from original obfuscated value
                    });
                }

                // Append flake to the correct element
                if (parentElement.tagName === document.body.tagName) {
                    document.body.appendChild(flakeElement);
                } else {
                    parentElement.appendChild(flakeElement);
                }

                this.element = flakeElement;

                // Flake update method
                this.update = function() {
                    this.y += this.speed;

                    // Reset flake if it goes below the screen or hits collection zone
                    if (this.y > windowHeight - (this.size + 6)) {
                        this.reset();
                    }

                    this.element.style.top = this.y + 'px';
                    this.element.style.left = this.x + 'px';

                    this.step += this.stepSize;
                    this.x += Math.cos(this.step); // Side-to-side movement

                    // Reset flake if it goes off screen horizontally
                    if (this.x + this.size > windowWidth - PADDING || this.x < PADDING) {
                        this.reset();
                    }
                };

                // Flake reset method
                this.reset = function() {
                    this.y = 0;
                    this.x = random(PADDING, windowWidth - PADDING);
                    this.stepSize = random(1, 10) / 100;
                    this.size = random((defaults.minSize * 100), (defaults.maxSize * 100)) / 100;
                    this.element.style.width = this.size + 'px';
                    this.element.style.height = this.size + 'px';
                    this.speed = random(defaults.minSpeed, defaults.maxSpeed);
                };
            }; // End Flake constructor

            // Animation loop
            var animateSnow = function() {
                for (var i = 0; i < flakes.length; i += 1) {
                    flakes[i].update();
                }
                animationFrame = requestAnimationFrame(function() {
                    animateSnow();
                });
            };

            return {
                // Initialize snow effect on an element
                snow: function(element, options) {
                    extend(defaults, options); // Apply user options
                    targetElement = element;
                    windowHeight = targetElement.clientHeight;
                    windowWidth = targetElement.offsetWidth;
                    targetElement.snow = this; // Store reference to instance

                    // Set padding for body element
                    if (targetElement.tagName.toLowerCase() === 'body') {
                        PADDING = 25;
                    }

                    // Update dimensions on window resize
                    window.addEventListener('resize', function() {
                        windowHeight = targetElement.clientHeight;
                        windowWidth = targetElement.offsetWidth;
                    }, true);

                    // Create initial flakes
                    for (var i = 0; i < defaults.flakeCount; i += 1) {
                        flakes.push(new Flake(
                            targetElement,
                            random((defaults.minSize * 100), (defaults.maxSize * 100)) / 100, // size
                            random(defaults.minSpeed, defaults.maxSpeed) // speed
                        ));
                    }
                    animateSnow(); // Start animation
                },
                // Clear snow effect
                clear: function() {
                    var flakeElements = null;
                    // Prefer getElementsByClassName if available
                    if (targetElement.getElementsByClassName) {
                        flakeElements = targetElement.getElementsByClassName('snowfall-flakes');
                    } else {
                        flakeElements = targetElement.querySelectorAll('.snowfall-flakes');
                    }

                    var flakeCount = flakeElements.length;
                    while (flakeCount--) {
                        if (flakeElements[flakeCount].parentNode === targetElement) {
                            targetElement.removeChild(flakeElements[flakeCount]);
                        }
                    }
                    cancelAnimationFrame(animationFrame);
                }
            };
        } // End SnowFallInstance constructor

        return {
            // Public API: snow(elements, options)
            snow: function(elements, options) {
                // If options is 'clear', remove snow
                if (typeof options === 'string') {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (elements[i].snow) { // Check if snow instance exists
                                elements[i].snow.clear();
                            }
                        }
                    } else if (elements.snow) { // Single element case
                        elements.snow.clear();
                    }
                } else { // Initialize snow
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            new SnowFallInstance().snow(elements[i], options);
                        }
                    } else { // Single element case
                        new SnowFallInstance().snow(elements, options);
                    }
                }
            }
        };
    }()); // End snowFall module

    // --- Global Variables & Configuration (from `biicore` object) ---
    var SNOW_Picture = './common/imgs/heart.png';
    var special_custom = ['646f6e3d778825e6f306667f', '64a04f6beb89a210fc07656a']; // Specific template IDs?

    // --- Initialize Snow Effect on Page Load ---
    window.onload = function() { // Changed from obfuscated name _0x22a160
        if (biicore.effect.type == 'none') { // Check if effect is disabled
            return false; // Use boolean false instead of empty array
        }

        setTimeout(function() {
            // Heart Effect
            if (biicore.effect.type == 'heart') {
                let flakeCount = 30; // Default flake count
                // Adjust flake count for specific templates or smaller screens
                if (typeof biicore.template_id !== 'undefined' && special_custom.includes(biicore.template_id)) {
                    flakeCount = 5;
                    if (window.innerWidth <= 650) { // Approx 0x28a
                        flakeCount = 3;
                    }
                }
                snowFall.snow(document.getElementsByTagName('body')[0], {
                    image: SNOW_Picture,
                    minSize: 15, // Approx 0xf
                    maxSize: 32, // Approx 0x20
                    flakeCount: flakeCount,
                    maxSpeed: 3,
                    minSpeed: 1
                });
            }
            // Snow Effect
            else if (biicore.effect.type == 'snow') {
                let flakeCount = 250; // Default flake count (Approx 0xfa)
                // Adjust flake count for specific templates or smaller screens
                if (typeof biicore.template_id !== 'undefined' && special_custom.includes(biicore.template_id)) {
                    flakeCount = 50; // Approx 0x32
                    if (window.innerWidth <= 1200) { // Approx 0x4b0
                        flakeCount = 30; // Approx 0x1e
                    }
                    if (window.innerWidth <= 650) { // Approx 0x28a
                        flakeCount = 25; // Approx 0x19
                    }
                }
                snowFall.snow(document.getElementsByTagName('body')[0], {
                    round: true,
                    shadow: true,
                    flakeCount: flakeCount,
                    minSize: 1,
                    maxSize: 8
                });
            }
            // Custom Effect
            else if (biicore.effect.type == 'custom') {
                let customSettings = biicore.effect.setting;
                let minSpeed = parseInt(customSettings.speed) - 3;
                if (minSpeed <= 0) minSpeed = 1;

                snowFall.snow(document.getElementsByTagName('body')[0], {
                    image: customSettings.icon,
                    minSize: customSettings.minSize,
                    maxSize: customSettings.maxSize,
                    flakeCount: customSettings.number,
                    maxSpeed: customSettings.speed,
                    minSpeed: minSpeed
                });
            }
        }, 300); // Delay initialization slightly (Approx 0x12c)

        // --- Mobile Scroll Indicator ---
        // Show scroll indicator only if content height is larger than window height
        if (document.getElementsByTagName('body')[0].clientHeight > window.innerHeight) {
            setTimeout(() => {
                var scrollIndicator = document.querySelector('.mouse-scroll-on-mobile');
                if (scrollIndicator) { // Check if element exists
                    scrollIndicator.style.visibility = 'visible';
                }
            }, 800); // Approx 0x320
        }

        // --- Wish Suggestions ---
        var showContentWishSuggestions = document.querySelectorAll('.showContent'); // Renamed from obfuscated class
        showContentWishSuggestions.forEach(element => {
            element.addEventListener('click', function(event) {
                event.preventDefault();
                let wishText = this.textContent || this.innerText; // Get suggestion text
                var contentInput = document.getElementById('content'); // Assuming ID is 'content'
                if (contentInput) { // Check if input exists
                    contentInput.value = wishText;
                }
            });
        });

        // --- Disable Context Menu, F12, Image Dragging ---
        // document.addEventListener('contextmenu', function(event) {
        //     event.preventDefault();
        // });
        // document.addEventListener('keydown', function(event) {
        //     if (event.keyCode === 123) { // F12 key
        //         event.preventDefault();
        //     }
        // });

        function preventImageDrag() {
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('dragstart', function(event) {
                    event.preventDefault();
                });
            });
        }
        preventImageDrag(); // Initial call

        // Re-apply drag prevention after gallery might load more images
        document.querySelectorAll('.btn-see-more-gallery').forEach(button => {
            button.addEventListener('click', function() {
                setTimeout(preventImageDrag, 200); // Re-apply after a short delay
            });
        });

        // --- Hide Scrollbar (Potentially problematic) ---
        // Hiding the body scrollbar might impact usability. Consider alternatives.
        // document.body.style.webkitTouchCallout = 'none'; // This disables callouts on iOS, not scrollbar
        // The original obfuscated code had `document[_0x11884d(0xb1)]['style'][_0x11884d(0xfa)]='none';`
        // _0x11884d(0xb1) is 'body', _0x11884d(0xfa) is 'webkitTouchCallout'.
        // There might have been another style manipulation intended here.
        // For example, to hide scrollbar: document.body.style.overflow = 'hidden'; (use with caution)

    }; // End window.onload

    // --- Hide Mobile Scroll Indicator on Scroll ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // Approx 0x32
            var scrollIndicator = document.querySelector('.mouse-scroll-on-mobile');
            if (scrollIndicator) { // Check if element exists
                scrollIndicator.style.visibility = 'hidden';
            }
        }
    });

    // --- Append Mobile Scroll Indicator HTML ---
    var scrollDownText = (typeof biicore.scroll_down_text != 'undefined' && biicore.scroll_down_text !== '')
        ? biicore.scroll_down_text
        : 'Kéo xuống'; // Default text

    document.write(`
        <style type="text/css">
        .mouse-scroll-on-mobile{display:none;}
        @media screen and (max-width: 576px){
            .mouse-scroll-on-mobile{width:95px;height:30px;margin:0 0 0 -30px;position:fixed;right:calc(50% - 52px);bottom:80px;-webkit-animation:arrow .5s 1s infinite ease-in-out alternate;z-index:999;display:block!important;visibility:hidden}
            .mouse-scroll-on-mobile:hover{-webkit-animation-play-state:paused}
            .mouse-scroll-on-mobile .mouse-scroll-on-mobile-text{text-align:center;bottom:120px;position:absolute;left:1px;background:#fff;padding:5px 10px;border-radius:3px;font-size:15px;color: #000;}
            .mouse-scroll-on-mobile .mouse-scroll-on-mobile-left{position:absolute;height:5px;width:30px;background:#de4659;-webkit-transform:rotate(240deg);bottom:80px;left:42px;-webkit-border-radius:4px;-webkit-transform-origin:5px 50%;-webkit-animation:leftArrow .5s 1s infinite ease-out alternate}
            .mouse-scroll-on-mobile .mouse-scroll-on-mobile-right{position:absolute;height:5px;width:30px;background:#de4659;-webkit-transform:rotate(-60deg);bottom:80px;left:46px;-webkit-border-radius:4px;-webkit-transform-origin:5px 50%;-webkit-animation:rightArrow .5s 1s infinite ease-out alternate}}
            @-webkit-keyframes arrow{0%{bottom:0}100%{bottom:40px}}
            @-webkit-keyframes leftArrow{100%{-webkit-transform:rotate(225deg)}}
            @-webkit-keyframes rightArrow{100%{-webkit-transform:rotate(-45deg)}}
        </style>
        <div class="mouse-scroll-on-mobile">
            <div class="mouse-scroll-on-mobile-text">${scrollDownText}</div>
            <div class="mouse-scroll-on-mobile-left"></div>
            <div class="mouse-scroll-on-mobile-right"></div>
        </div>
    `);

    // --- Popup Alert ---
    if (biicore.alert && Object.keys(biicore.alert).length > 0 && biicore.alert.status == 1) {
        // Make URLs in content clickable
        biicore.alert.content = biicore.alert.content.replace(
            /(https?:\/\/([-\w\.]+[-\w])+(:\d+)?(\/([\w\/_.#-]*(\?\S+)?[^\.\s])?)?)/g,
            '<a href="$1" target="_blank">$1</a>'
        );

        setTimeout(function() {
            Swal.fire({
                'title': biicore.alert.title,
                'html': biicore.alert.content,
                'showCloseButton': false,
                'showConfirmButton': false,
                'showCancelButton': true,
                'focusCancel': true,
                'cancelButtonText': (typeof biicore.alert.cancel_button_text != 'undefined' && biicore.alert.cancel_button_text != '')
                    ? biicore.alert.cancel_button_text
                    : 'Tắt thông báo' // Default button text
            });
        }, biicore.alert.timeout); // Show after specified timeout
    }

    // --- Background Music Player ---
    if (biicore.bgMusic) {
        var audioPlayer = document.createElement('AUDIO');
        audioPlayer.style.display = 'none'; // Hide the default player

        setTimeout(function() {
            // Check if browser can play the audio type (basic check)
            if (audioPlayer.canPlayType('audio/mpeg')) { // Assuming MP3
                audioPlayer.setAttribute('src', biicore.bgMusic);
                var playerElement = document.getElementsByClassName('bii-player')[0]; // Get player container
                if (playerElement) { // Check if player container exists
                   playerElement.style.display = 'block'; // Show custom player controls
                }
            }
            audioPlayer.volume = 0.3; // Set initial volume
            audioPlayer.setAttribute('controls', 'controls'); // Add controls (though hidden)
            audioPlayer.loop = true; // Enable looping

            // Handle autoplay based on configuration
            if (biicore.isAutoPlay) {
                audioPlayer.setAttribute('autoplay', 'autoplay');
            }

            document.body.appendChild(audioPlayer); // Add player to DOM
        }, 1000); // Delay adding player slightly (Approx 0x3e8)

        // --- Music Player Secondary Content Animation ---
        // Briefly show the "Click to play" message
        var myInterval = setInterval(function() {
            var playerElement = document.querySelector('.bii-player');
            if (playerElement) {
                setTimeout(function() {
                    var playerContainer = document.getElementsByClassName('bii-player')[0];
                    if (playerContainer) {
                       playerContainer.classList.add('show-sec');
                    }
                }, 2000); // Approx 0x7d0
                setTimeout(function() {
                    var playerContainer = document.getElementsByClassName('bii-player')[0];
                     if (playerContainer) {
                        playerContainer.classList.remove('show-sec');
                     }
                }, 7000); // Approx 0x1b58
                clearInterval(myInterval); // Stop checking once found
            }
        }, 200); // Check every 200ms (Approx 0xc8)

        // Global function for play/pause button
        window.playPause = function() { // Make accessible globally
             var playerContainer = document.getElementsByClassName('bii-player')[0];
             if (playerContainer) {
                 playerContainer.classList.remove('show-sec'); // Hide secondary content on click
             }

            var playerVolumeOff = document.getElementById('playerVolumeOff');
            var playerVolumeOn = document.getElementById('playerVolumeOn');

            if (audioPlayer.paused) {
                audioPlayer.play();
                if (playerVolumeOff) playerVolumeOff.style.display = 'none';
                if (playerVolumeOn) playerVolumeOn.style.display = 'block'; // Use block instead of original obfuscated value
            } else {
                audioPlayer.pause();
                if (playerVolumeOff) playerVolumeOff.style.display = 'block'; // Use block instead of original obfuscated value
                if (playerVolumeOn) playerVolumeOn.style.display = 'none';
            }
        }

        // --- Handle Click-to-Play for Autoplay ---
        // If autoplay is desired but restricted by browser, play on first click anywhere
        if (biicore.isAutoPlay) {
            function handleClickAutoPlay(event) { // Renamed from obfuscated name
                // Check if click is outside player controls
                let playerControls = document.querySelectorAll('.bii-player-secondary, .playerIcon'); // Select controls
                let clickedOnControls = Array.from(playerControls).some(el => el.contains(event.target));

                if (!clickedOnControls) {
                    if (audioPlayer.paused) { // Only play if currently paused
                        document.body.removeEventListener('click', handleClickAutoPlay, true); // Remove listener after first play
                        playPause(); // Trigger play
                    }
                } else {
                    // If click was on controls, keep the listener active for next potential body click
                    document.body.removeEventListener('click', handleClickAutoPlay, true); // Should probably still remove listener here? Or let playPause handle it.
                    // The original code re-added the listener here, which seems redundant.
                }
            }
            document.body.addEventListener('click', handleClickAutoPlay, true);
        }

        // --- Append Music Player HTML ---
        document.write(`
            <style type="text/css">
            @-webkit-keyframes biilogo-pulse { from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } 50% { -webkit-transform: scale3d(0.95, 0.95, 0.95); transform: scale3d(0.95, 0.95, 0.95); } to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } }
            @keyframes biilogo-pulse { from { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } 50% { -webkit-transform: scale3d(0.95, 0.95, 0.95); transform: scale3d(0.95, 0.95, 0.95); } to { -webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1); } }
            .bii-player{position: fixed;bottom: 70px;left: 50px;width: 40px;height: 40px;z-index:99999;display:none;} /* Initially hidden */
            .bii-player .playerIcon{cursor:pointer;display: block;width:40px;height:40px;-webkit-border-radius: 50%;-moz-border-radius: 50%;-o-border-radius: 50%;-ms-border-radius: 50%;border-radius: 50%;background-color: #df4758;padding-top: 7px;padding-left: 9px;position:absolute;z-index: 2;}
            .bii-player:after{content: "";position: absolute;-webkit-border-radius: 50%;-moz-border-radius: 50%;-o-border-radius: 50%;-ms-border-radius: 50%;border-radius: 50%;z-index: -1;background-color: rgba(242, 59, 67, 0.3);width: 120%;height: 120%;left: -10%;top: -10%;-webkit-animation: biilogo-pulse 1s infinite;animation: biilogo-pulse 1s infinite;z-index: 1;}
            .bii-player img{width: 100%;z-index: 99999;position: absolute;cursor:pointer;}
            .bii-player.show-sec .bii-player-secondary{visibility: visible;}
            .bii-player.show-sec .bii-player-secondary-content{ transform: translate3d(0, 0, 0);}
            .bii-player-secondary{position: absolute;width: 310px;left: 25px;height: 50px;overflow: hidden;visibility: hidden;}
            .bii-player-secondary-content{display: flex;align-items: center;cursor:pointer;user-select: none;position: absolute;width: 310px;left: -25px;background: #fff;height: 40px;padding: 8px 11px 8px 50px;border: 1px solid #df4759;border-radius: 30px;z-index: 1;font-size:14px;transform: translate3d(-100%, 0, 0);transition: transform 175ms ease;font-family: arial;font-weight: 200;color: #000;}
            @media (max-width: 799px) { .bii-player{bottom: 30px;left: 20px;} }
            </style>
            <div class="bii-player">
                <div onclick="playPause();" class="bii-player-secondary"><div class="bii-player-secondary-content">Click vào đây nếu bạn muốn phát nhạc!</div></div>
                <div onclick="playPause();" class="playerIcon">
                    <span id="playerVolumeOff">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="#fff" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"> <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/> </svg>
                    </span>
                    <span style="display:none;" id="playerVolumeOn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="#fff" class="bi bi-volume-up-fill" viewBox="0 0 16 16"> <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/> <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/> <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/> </svg>
                    </span>
                </div>
            </div>
        `);

    } // End if(biicore.bgMusic)

    // --- Footer / Biihappy Logo (for non-premium templates) ---
    if (!biicore.isPremium && !biicore.templatePremium) { // Check if template is free
        // Đã xóa hoàn toàn HTML và CSS của .bii-logo và .bii-footer, không còn render logo và footer bản quyền nữa
    }

    // --- Wish Suggestion Autocomplete Toggle ---
    var showButtonWishSuggestions = document.querySelector('.show-autocomplete'); // Renamed from obfuscated class
    var hideButtonWishSuggestions = document.querySelector('.hide-autocomplete'); // Renamed from obfuscated class
    var showContentWishSuggestionsElements = document.querySelectorAll('.showContent'); // Get these again for the toggle logic
    var wishSuggestionsContent = document.querySelector('.wishes-autocomplete-content'); // The container to toggle

    var toggleDisplayWishesAutocomplete = function(forceHide = false) {
        if (!wishSuggestionsContent || !showButtonWishSuggestions || !hideButtonWishSuggestions) return; // Exit if elements are missing

        let isHidden = showButtonWishSuggestions.style.display === 'none';

        // If forceHide is true and it's already hidden, do nothing
        if (forceHide && isHidden) return;

        wishSuggestionsContent.style.display = isHidden ? 'none' : ''; // Toggle content visibility
        showButtonWishSuggestions.style.display = isHidden ? '' : 'none'; // Toggle "Show" button
        hideButtonWishSuggestions.style.display = isHidden ? 'none' : ''; // Toggle "Hide" button
    };

    if (showButtonWishSuggestions && hideButtonWishSuggestions) {
        showButtonWishSuggestions.addEventListener('click', function() {
            toggleDisplayWishesAutocomplete(false); // Show
        });
        hideButtonWishSuggestions.addEventListener('click', function() {
            toggleDisplayWishesAutocomplete(false); // Hide
        });

        // Hide autocomplete if clicked outside
        document.body.addEventListener('click', function(event) {
            var searchInput = document.getElementById('searchWishSuggestions'); // Assuming ID for search input
            // Check if click target is outside the relevant elements
            if (event.target === document.body ||
                (!showButtonWishSuggestions.contains(event.target) &&
                 !hideButtonWishSuggestions.contains(event.target) &&
                 (searchInput && !searchInput.contains(event.target)) && // Check search input
                 !Array.from(showContentWishSuggestionsElements).some(el => el.contains(event.target))) // Check suggestion items
            ) {
                toggleDisplayWishesAutocomplete(true); // Force hide
            }
        });
    }

    // --- Helper: Remove Vietnamese Tones ---
    function removeVietnameseTones(str) {
        if (!str) return ''; // Handle null or undefined input
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Remove special characters except space
        str = str.replace(/[^a-zA-Z0-9 ]/g, '');
        // Optional: Remove extra spaces
        // str = str.replace(/\s+/g, ' ').trim();
        return str;
    }

    // --- Wish Suggestion Search Filter ---
    window.searchWishSuggestionsFunction = function() { // Make accessible globally
        let input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('searchWishSuggestions'); // Search input ID
        if (!input) return; // Exit if input doesn't exist
        filter = removeVietnameseTones(input.value.toUpperCase());
        ul = document.getElementById('wishSuggestions'); // List container ID
        if (!ul) return; // Exit if list doesn't exist
        li = ul.getElementsByTagName('li');

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0]; // Assuming link inside li
            txtValue = a.textContent || a.innerText;
            if (removeVietnameseTones(txtValue.toUpperCase()).indexOf(filter) > -1) {
                li[i].style.display = ""; // Show match
            } else {
                li[i].style.display = "none"; // Hide non-match
            }
        }
    };

    // --- Toast Message Function ---
    // Requires jQuery and Toastr library
    function toastMessageWishes(messages = null, scrollToId = null) {
        if (Array.isArray(messages) && messages.length > 0) {
            // Handle click on toast to scroll (if ID provided)
            $(document).on('click', '.toast-success', function() { // Assumes toasts have this class
                if (scrollToId) {
                    // Animate scroll using jQuery
                    $('html, body').animate({ // Changed from obfuscated selector
                        scrollTop: $('#' + scrollToId).offset().top
                    }, 'slow'); // Approx 1000ms?
                }
            });

            // Configure Toastr
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "showDuration": "1000", // Approx 0xeb
                "hideDuration": "1000", // Approx 0xeb
                "timeOut": "5000", // Approx 0xc7
                "extendedTimeOut": "1000", // Approx 0xeb
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            let messageIndex = 0;
            let toastInterval = setInterval(() => {
                let currentMessage = messages[messageIndex];
                messageIndex++;
                toastr.options.closeHtml = '<button class="closebtn"></button>'; // Custom close button HTML
                toastr.success(currentMessage.content, currentMessage.name); // Show toast

                if (messageIndex >= messages.length) {
                    clearInterval(toastInterval); // Stop when all messages are shown
                }
            }, 5000); // Show next toast every 5 seconds (Approx 0x1388)
        }
    }
    // Example usage (would need data in `biicore.wish_messages`):
    // if (biicore.wish_messages) {
    //     toastMessageWishes(biicore.wish_messages, 'wishSectionId'); // Replace with actual ID
    // }

})(); // End of main IIFE
 