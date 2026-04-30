function ga_script() {
  console.log(`Google Analytics:
      tytuł: ${document.title}
      URL:
       ${window.location.href}
      `);
}
function scrollIt(targetId, duration) {
  const loader = document.getElementById("loader");
  const hideScrollbar = () => (document.body.style.overflowY = "hidden");
  const showScrollbar = () => (document.body.style.overflowY = "scroll");
  const showScrollLoader = () => {
    window.isScrolling = true;
    loader.classList.remove("invisible");
    hideScrollbar();
  };
  const hideScrollLoader = () => {
    window.isScrolling = false;
    loader.classList.add("invisible");
    showScrollbar();
    return;
  };
  return new Promise((resolve, reject) => {
    function attemptScroll(attemptsLeft) {
      setTimeout(() => {
        showScrollLoader();

        window.stopScrollNow = false;
        var target = document.getElementById(targetId);

        if (!target) {
          if (attemptsLeft > 0) {
            setTimeout(() => attemptScroll(attemptsLeft - 1), 100);
            return;
          }
          reject(
            "scrollIt: Target sekcja docelowa: " +
              targetId +
              " nie została znaleziona",
          );
          return;
        }
        requestAnimationFrame(() => {
          var targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          var startPosition = window.pageYOffset;
          var startTime = null;
          function scrollToTarget(currentTime) {
            if (window.stopScrollNow) {
              resolve();
              hideScrollLoader();
              return;
            }
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
              hideScrollLoader();
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

function sipScrolling() {
  window.stopScrollNow = true;
  setTimeout(() => {
    window.stopScrollNow = false;
  }, 400);
  scrollIt(window.subOk, 2000);
}
