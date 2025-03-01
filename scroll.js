function scrollIt(targetId, duration) {
  return new Promise((resolve, reject) => {
    function attemptScroll(attemptsLeft) {
      setTimeout(() => {
        var target = document.getElementById(targetId);

        if (!target) {
          if (attemptsLeft > 0) {
            setTimeout(() => attemptScroll(attemptsLeft - 1), 100);
            return;
          }
          reject("Target not found");
          return;
        }

        requestAnimationFrame(() => {
          var targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          var startPosition = window.pageYOffset;
          var startTime = null;

          function scrollToTarget(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = easeInOutQuad(Math.min(1, timeElapsed / duration));
            var scrollPosition =
              startPosition + (targetPosition - startPosition) * run;
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

          requestAnimationFrame(scrollToTarget);
        });
      }, 50);
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    attemptScroll(5);
  });
}
