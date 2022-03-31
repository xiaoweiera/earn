(function() {
  function iosHack() {
    document.addEventListener("gesturestart", function(event) {
      event.preventDefault();
    });
    document.addEventListener("touchmove", function(event) {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, false);

    document.addEventListener("touchstart", function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, false);

    var lastTouchEnd = 0;
    document.addEventListener("touchend", function(event) {
      var now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  try {
    if (window.UserAgent) {
      var ua = new UserAgent().parse(navigator.userAgent);
      if (ua.isiPhone || ua.isiPod || ua.isiPad) {
        iosHack();
      }
    }
  } catch (e) {
    // todo
  }
}());
