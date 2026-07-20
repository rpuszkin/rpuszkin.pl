document.querySelectorAll("nav a.menu-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
document.getElementById("main-content").addEventListener("click", (event) => {
  const link = event.target.closest(".click-prevent");
  if (link) {
    event.preventDefault();
  }
});

function loadContent(contentMenu, contentSub, contentPop) {
  let file;
  let isLoadedOrDoubleClick = false;
  window.appState.previousMenu = window.appState.menuOk;
  window.appState.previousSub = window.appState.subOk;
  if ((!contentMenu && !contentSub) || contentPop === "pop") updateUrlParams();
  else {
    if (contentMenu) window.appState.menuOk = contentMenu;
    if (contentSub) window.appState.subOk = contentSub;
    if (contentMenu && !contentSub) window.appState.subOk = contentMenu;
  }
  if (window.appState.menuOk) file = `/menu/${window.appState.menuOk}.html`;
  else {
    alert(
      "loadContent(): menuOk nie jest ustawione. Nie można załadować pliku.",
    );
    throw new Error(
      "loadContent(): menuOk nie jest ustawione. Nie można załadować pliku.",
    );
  }
  if (
    window.appState.menuOk === window.appState.previousMenu &&
    window.appState.subOk === window.appState.previousSub
  )
    isLoadedOrDoubleClick = true;
  function loadFile(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            if (window.appState.menuOk !== "404") {
              return Promise.reject("fallback404");
            } else
              return Promise.reject(
                "loadFile(): Błąd 404CR - strona nie została znaleziona, nie znaleziono również strony błędu.",
              );
          } else {
            throw new Error(
              `loadfile():Wystąpił błąd o numerze ${response.status}. Nie można załadować pliku.`,
            );
          }
        }
        return response.text();
      })
      .then((html) => {
        const mainElement = document.getElementById("main-content");
        if (mainElement) {
          mainElement.innerHTML = html;
        }
      })
      .catch((error) => {
        if (error === "fallback404") return goTo("404");
        else
          throw new Error(
            "loadFile(): Błąd podczas ładowania pliku | " + error,
          );
      });
  }
  if (
    (window.appState.menuOk === "aboutme" ||
      window.appState.menuOk === "myhistory" ||
      window.appState.menuOk === "myprojects" ||
      window.appState.menuOk === "home" ||
      window.appState.menuOk === "reallife") &&
    !document.fonts.check("1em 'Roboto Serif'")
  ) {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  function setUrlState(nopush) {
    let newUrl;
    if (
      window.appState.subOk &&
      window.appState.subOk !== window.appState.menuOk
    )
      newUrl = `/${window.appState.menuOk}/${window.appState.subOk}`;
    else newUrl = `/${window.appState.menuOk}`;

    if (!nopush && !isLoadedOrDoubleClick)
      window.history.pushState({}, "", newUrl);
  }
  setTitle();
  if (
    contentPop === "pop" ||
    window.appState.menuOk === "404" ||
    window.appState.menuOk === "home" ||
    isLoadedOrDoubleClick === true
  )
    setUrlState(true);
  else setUrlState();
  if (contentPop === "noscroll") return loadFile(file).then(ga_script);
  if (contentPop === "pop") return loadFile(file);
  else
    return loadFile(file).then(() =>
      scrollIt(window.appState.subOk, 7500).then(ga_script),
    );
}
function goTo(menuGo, subGo, popGo) {
  const supportmeCheckbox = document.getElementById("supportme-checkbox");
  if (supportmeCheckbox.checked) supportmeCheckbox.checked = false;
  const fadeElements = document.querySelectorAll(".main, .header");
  function waitForTransitions(elements, { timeout = 700 } = {}) {
    return new Promise((resolve) => {
      const els = Array.from(elements);
      if (els.length === 0) return resolve();
      let remaining = els.length;
      let finished = false;

      function tryResolve() {
        if (finished) return;
        remaining--;
        if (remaining <= 0) {
          finished = true;
          resolve();
        }
      }

      els.forEach((el) => {
        const duration = parseFloat(getComputedStyle(el).transitionDuration);
        if (!duration) return tryResolve();
        el.addEventListener(
          "transitionend",
          (e) => {
            if (e.target === el) tryResolve();
          },
          { once: true },
        );
      });

      setTimeout(() => {
        if (!finished) {
          finished = true;
          resolve();
        }
      }, timeout);
    });
  }
  function fadeOut(elements) {
    elements.forEach((el) => el.classList.add("invisible"));
    return waitForTransitions(elements);
  }
  function fadeIn(elements) {
    elements.forEach((el) => el.classList.remove("invisible"));
    return waitForTransitions(elements);
  }

  function loadSmoothly(smoothMenu, smoothSub, smoothPop) {
    function stopScrolling(delay = 400) {
      return new Promise((resolve) => {
        if (window.appState.scroll.isScrolling) {
          window.appState.scroll.stopScrollNow = true;
          setTimeout(() => {
            window.appState.scroll.stopScrollNow = false;
            resolve();
          }, delay);
        } else resolve();
      });
    }
    let noscrollOrPop;
    if (smoothPop === "pop") noscrollOrPop = "pop";
    else noscrollOrPop = "noscroll";

    function jumpToTarget() {
      let targetSection;
      targetSection = document.getElementById(window.appState.subOk);
      return new Promise((resolve, reject) => {
        if (targetSection) {
          window.scrollTo(0, targetSection.offsetTop);
          function checkTop() {
            const rect = targetSection.getBoundingClientRect();
            if (Math.abs(rect.top) < 10) resolve();
            else requestAnimationFrame(checkTop);
          }
          requestAnimationFrame(checkTop);
        } else {
          reject(
            "jumpToSection(): element o id " +
              window.appState.subOk +
              " nie istnieje!",
          );
        }
      });
    }

    return new Promise((resolve, reject) => {
      fadeOut(fadeElements)
        .then(() => stopScrolling())
        .then(() => loadContent(smoothMenu, smoothSub, noscrollOrPop))
        .then(() => jumpToTarget())
        .then(() => fadeIn(fadeElements))
        .then(() => resolve());
    });
  }
  //choosing type of transition to new content
  if (window.scrollY === 0 && popGo !== "pop")
    return loadContent(menuGo, subGo, popGo);
  else if (window.scrollY === 0) return loadContent(menuGo, subGo, popGo);
  else return loadSmoothly(menuGo, subGo, popGo);
}

function showHideSupportmeMore() {
  const supportmeCheckbox = document.getElementById("supportme-checkbox");
  if (supportmeCheckbox) {
    supportmeCheckbox.checked = !supportmeCheckbox.checked;
  }
}
window.addEventListener("popstate", (event) => {
  goTo(null, null, "pop").then(ga_script);
});
window.addEventListener("load", function () {
  init_appState();
  goTo();
});
