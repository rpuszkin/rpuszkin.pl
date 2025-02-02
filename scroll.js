function scrollIt(targetId, duration) {
  return new Promise((resolve, reject) => {
    function attemptScroll(attemptsLeft) {
      var target = document.getElementById(targetId);

      if (!target) {
        if (attemptsLeft > 0) {
          setTimeout(() => attemptScroll(attemptsLeft - 1), 100);
          return;
        }
        reject(new Error("Target element not found"));
        return;
      }

      var targetPosition = target.getBoundingClientRect().top;
      var startPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      var startTime = null;

      function scrollToTarget(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easeInOutQuad(Math.min(1, timeElapsed / duration));
        var scrollPosition = startPosition + targetPosition * run;
        window.scrollTo({
          top: scrollPosition,
          behavior: "auto",
        });

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollToTarget);
        } else {
          resolve();
        }
      }

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      requestAnimationFrame(scrollToTarget);
    }

    attemptScroll(5);
  });
}
