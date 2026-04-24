document.querySelectorAll("nav a.menu-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
document.getElementById("main-content").addEventListener("click", (event) => {
  const link = event.target.closest("a.button-link");
  if (link) {
    event.preventDefault();
  }
});

function loadContent(menuLoad, subLoad, contentPop) {
  let file;
  let doubleLoad = false;
  window.previousMenu = window.menuOk;
  window.previousSub = window.subOk;
  window.menuOk = null;
  window.subOk = null;

  if ((!menuLoad && !subLoad) || contentPop === "pop") updateUrlParams();
  else {
    if (menuLoad) window.menuOk = menuLoad;
    if (subLoad) window.subOk = subLoad;
    if (menuLoad && !subLoad) window.subOk = menuLoad;
  }
  if (window.menuOk) file = `menu/${window.menuOk}.html`;
  else
    throw new Error(
      "loadContent(): menuOk nie jest zdefiniowane. Nie można załadować pliku.",
    );
  if (
    window.menuOk === window.previousMenu &&
    window.subOk === window.previousSub
  )
    doubleLoad = true;
  function loadFile(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            if (window.menuOk !== "404") {
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
        if (error === "fallback404") return goTo("404", null, "noscroll");
        else
          throw new Error(
            "loadFile(): Błąd podczas ładowania pliku | " + error,
          );
      });
  }
  if (
    window.menuOk === "aboutme" ||
    window.menuOk === "myhistory" ||
    window.menuOk === "myprojects" ||
    window.menuOk === "home" ||
    window.menuOk === "reallife"
  ) {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  function setTitle() {
    const subpageHtmlTitle = {
      home: "",
      news: " | nowości/wydarzenia",
      supportme: " | wesprzyj mnie",
      mygallery: " | galeria",
      aboutme: " | o mnie",
      myhistory: " | moja historia",
      myprogress: " | moje postępy",
      reallife: " | z życia wzięte",
      myprojects: " | WWW",
      irecommend: " | mogę polecić",
      404: " | błąd 404 - nie znaleziono",
    };
    document.title = "rpuszkin.pl" + subpageHtmlTitle[window.menuOk];
    if (window.subOk === "krs") {
      document.title += " →	1,5% podatku";
    } else if (window.subOk === "foundation") {
      document.title += " → fundacja";
    }
  }
  function setUrlState(nopush) {
    let newUrl;
    if (window.subOk && window.subOk !== window.menuOk)
      newUrl = `?menu=${window.menuOk}&sub=${window.subOk}`;
    else newUrl = "?menu=" + window.menuOk;

    if (!nopush && !doubleLoad) {
      if (window.subOk) window.history.pushState({}, "", newUrl);
      else window.history.pushState({}, "", newUrl);
    }
  }
  setTitle();
  if (
    contentPop === "pop" ||
    window.menuOk === "404" ||
    window.menuOk === "home" ||
    doubleLoad === true
  )
    setUrlState(true);
  else setUrlState();
  if (contentPop === "noscroll") return loadFile(file).then(ga_script);
  if (contentPop === "pop") return loadFile(file);
  else
    return loadFile(file).then(() =>
      scrollIt(window.subOk, 7500).then(ga_script),
    );
}
function goTo(menuGo, subGo, popGo) {
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
        if (window.isScrolling) {
          window.stopScrollNow = true;
          setTimeout(() => {
            window.stopScrollNow = false;
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
      targetSection = document.getElementById(window.subOk);
      return new Promise((resolve, reject) => {
        if (targetSection) {
          if (!window.blokJump) window.scrollTo(0, targetSection.offsetTop);
          window.blokJump = false;
          function checkTop() {
            const rect = targetSection.getBoundingClientRect();
            if (Math.abs(rect.top) < 10) resolve();
            else requestAnimationFrame(checkTop);
          }
          requestAnimationFrame(checkTop);
        } else {
          reject(
            "jumpToSection(): element o id " + window.subOk + " nie istnieje!",
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
window.addEventListener("popstate", (event) => {
  goTo(null, null, "pop").then(ga_script);
});
window.addEventListener("load", function () {
  goTo();
});
