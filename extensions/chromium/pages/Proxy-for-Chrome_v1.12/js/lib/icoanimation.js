function iconAnimator(strPath) {
  var icon = document.createElement("img");
  icon.setAttribute("src", strPath);
  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", "19");
  canvas.setAttribute("height", "19");
  var canvasContext = canvas.getContext("2d");
  var time = 0;
  var ru = new Image;
  ru.src = "im/co/ru.png";
  var de = new Image;
  de.src = "im/co/de.png";
  var uk = new Image;
  uk.src = "im/co/uk.png";
  var fr = new Image;
  fr.src = "im/co/fr.png";
  var nl = new Image;
  nl.src = "im/co/nl.png";
  var es = new Image;
  es.src = "im/co/es.png";
  var google = new Image;
  google.src = "im/co/google.png";
  var err = new Image;
  err.src = "im/co/err.png";
  var proxy = new Image;
  proxy.src = "im/co/p.png";
  var tor = new Image;
  tor.src = "im/co/tor.png";
  this.setErr = function() {
    var coimg = err;
    canvasContext.save();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
    canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
    canvasContext.drawImage(coimg, -8, -10, 16, 16);
    canvasContext.restore();
    chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, 19, 19)});
  };
  this.setCo = function(co) {
    var coimg = false;
    co = co.toLowerCase();
    if (co) {
      if (co == "ru") {
        coimg = ru;
      } else {
        if (co == "de") {
          coimg = de;
        } else {
          if (co == "uk") {
            coimg = uk;
          } else {
            if (co == "fr") {
              coimg = fr;
            } else {
              if (co == "nl") {
                coimg = nl;
              } else {
                if (co == "es") {
                  coimg = es;
                } else {
                  if (co == "err") {
                    coimg = err;
                  } else {
                    if (co == "public") {
                      coimg = proxy;
                    } else {
                      if (co == "tor") {
                        coimg = tor;
                      } else {
                        if (co.indexOf("google") != -1) {
                          coimg = google;
                        } else {
                          coimg = proxy;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    canvasContext.save();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
    canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
    canvasContext.fillStyle = "rgba(190,190,190,1)";
    canvasContext.fillRect(-2, 1, 11, 8);
    if (coimg) {
      canvasContext.drawImage(coimg, -1, 1, 10, 8);
    }
    canvasContext.restore();
    chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, 19, 19)});
  };
  this.set = function() {
    chrome.browserAction.setIcon({path:{19:strPath}});
  };
  function ease(x) {
    return(1 - Math.sin(Math.PI / 2 + x * Math.PI)) / 2;
  }
  this.rotate = function() {
    var rotation = 0;
    var animationFrames = 30;
    var animationSpeed = 1;
    var cicles = 0;
    function drawIconAtRotation() {
      var width = canvas.width - 1;
      var height = canvas.height - 1;
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.rotate(2 * Math.PI * ease(rotation));
      canvasContext.drawImage(icon, -Math.ceil(width / 2), -Math.ceil(height / 2), width, height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      if (cicles <= 2) {
        if (rotation >= 1) {
          rotation = 0;
          cicles += 1;
        }
        setTimeout(Do, animationSpeed);
      } else {
        rotation = 0;
        chrome.browserAction.setIcon({path:{19:icon.src}});
      }
    }
    Do();
  };
  this.flipHorizontal = function() {
    var rotation = -2;
    var animationFrames = 60;
    var animationSpeed = 1;
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.scale(ease(rotation), 1);
      canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = -2;
        chrome.browserAction.setIcon({path:{19:icon.src}});
      }
    }
    Do();
  };
  this.flipVertical = function() {
    var rotation = -2;
    var animationFrames = 60;
    var animationSpeed = 1;
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.scale(1, ease(rotation));
      canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = -2;
        chrome.browserAction.setIcon({path:{19:icon.src}});
      }
    }
    Do();
  };
  this.pulse = function() {
    var rotation = -3;
    var animationFrames = 60;
    var animationSpeed = 2;
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.scale(ease(rotation), ease(rotation));
      canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = -3;
        chrome.browserAction.setIcon({path:{19:icon.src}});
      }
    }
    Do();
  };
  this.pulse2 = function() {
    var rotation = -3;
    var animationFrames = 15;
    var animationSpeed = 1;
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.scale(ease(rotation), ease(rotation));
      canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = -3;
        chrome.browserAction.setIcon({path:{19:icon.src}});
      }
    }
    Do();
  };
  this.flipHorizontalChange = function(Icon) {
    var rotation = -1;
    var animationFrames = 35;
    var animationSpeed = 7;
    var i = 0;
    var newIcon = document.createElement("img");
    newIcon.setAttribute("src", Icon);
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));
      canvasContext.scale(rotation, 1);
      if (rotation > 0) {
        canvasContext.drawImage(newIcon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      } else {
        canvasContext.drawImage(icon, -Math.ceil(canvas.width / 2), -Math.ceil(canvas.height / 2), canvas.width, canvas.height);
      }
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      rotation += 1 / animationFrames;
      drawIconAtRotation();
      i++;
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = -1;
        chrome.browserAction.setIcon({path:{19:newIcon.src}});
        icon = newIcon;
      }
    }
    Do();
  };
  this.slideRightChange = function(Icon) {
    var rotation = 0;
    var animationFrames = 60;
    var animationSpeed = 10;
    var newIcon = document.createElement("img");
    newIcon.setAttribute("src", Icon);
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
      var position = canvas.width * rotation;
      canvasContext.translate(position, 0);
      canvasContext.drawImage(icon, 0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(newIcon, -canvas.width, 0, canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      drawIconAtRotation();
      rotation += 1 / animationFrames;
      if (rotation <= 1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = 0;
        chrome.browserAction.setIcon({path:{19:newIcon.src}});
        icon = newIcon;
      }
    }
    Do();
  };
  this.slideLeftChange = function(Icon) {
    var rotation = 0;
    var animationFrames = 60;
    var animationSpeed = 10;
    var newIcon = document.createElement("img");
    newIcon.setAttribute("src", Icon);
    function drawIconAtRotation() {
      canvasContext.save();
      canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
      var position = canvas.width * rotation;
      canvasContext.translate(position, 0);
      canvasContext.drawImage(icon, 0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(newIcon, canvas.width, 0, canvas.width, canvas.height);
      canvasContext.restore();
      chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width, canvas.height)});
    }
    function Do() {
      drawIconAtRotation();
      rotation -= 1 / animationFrames;
      if (rotation >= -1) {
        setTimeout(Do, animationSpeed);
      } else {
        rotation = 0;
        chrome.browserAction.setIcon({path:{19:newIcon.src}});
        icon = newIcon;
      }
    }
    Do();
  };
}
;
