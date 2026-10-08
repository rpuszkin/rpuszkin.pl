function loadContent(contentMenu, contentSub, contentPop) {
  window.appState.menuOk = contentMenu;
  window.appState.subOk = contentSub;
  window.appState.isLoadedOrDoubleClick = false;
  if ((!contentMenu && !contentSub) || contentPop === "pop") updateUrlParams();
  if (window.appState.menuOk)
    window.appState.file = `/menu/${window.appState.menuOk}.html`;
  else {
    alert(
      `loadContent(): menuOk nie jest ustawione. Nie można załadować pliku.
          Zgłoś mi to, proszę! Naciśnij OK by przejść na stronę główną. Jeśli problem będzie się powtarzał, zgłoś mi to, proszę!
          Po kliknięciu OK zostaniesz przeniesiony na stronę główną.`,
    );
    goTo("home");
  }
  if (
    window.appState.menuOk === window.appState.previousMenu &&
    window.appState.subOk === window.appState.previousSub
  )
    window.appState.isLoadedOrDoubleClick = true;
  function loadFile(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status !== 404) {
            alert(
              `loadFile(): Wystąpił błąd o numerze ${response.status}. Nie można załadować pliku. Zgłoś mi to, proszę!`,
            );
            throw new Error(
              `loadFile(): błąd  ${response.status}. Nie można załadować pliku.`,
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
        if (error) {
          alert(`loadFile(): Błąd podczas ładowania pliku | ${error}.
              Zgłoś mi to, proszę! Naciśnij OK by przejść na stronę główną. Jeśli problem będzie się powtarzał, zgłoś mi to, proszę!`);
          goTo("home");
        }
      });
  }
  loadSerif();
  setTitle();
  if (contentPop === "pop") return loadFile(window.appState.file);
  else if (contentPop === "noscroll") return loadFile(window.appState.file);
  return loadFile(window.appState.file).then(() =>
    scrollIt(window.appState.subOk, 7500),
  );
}
function goTo(menuGo, subGo, popGo) {
  function showHideSupportmeMore() {
    const supportmeCheckbox = document.getElementById("supportme-checkbox");
    if (supportmeCheckbox) {
      supportmeCheckbox.checked = !supportmeCheckbox.checked;
    }
  }
  function decideUrlState() {
    if (popGo === "pop") return "pop";
    if (
      !window.sectionConfig[window.appState.menuOk].modifyUrl &&
      !window.appState.isLoadedOrDoubleClick
    )
      return setUrlState(true);
    else return setUrlState();
  }
  const body = document.body;

  window.appState.isLoadedOrDoubleClick = false;
  if (
    window.appState.previousMenu === menuGo &&
    window.appState.previousSub === subGo
  )
    window.appState.isLoadedOrDoubleClick = true;
  else window.appState.isLoadedOrDoubleClick = false;
  window.appState.previousMenu = window.appState.menuOk;
  window.appState.previousSub = window.appState.subOk;
  if (menuGo) window.appState.menuOk = menuGo;
  if (subGo) {
    window.appState.subOk = subGo;
  } else if (menuGo) window.appState.subOk = menuGo;

  if ((!menuGo && !subGo) || popGo === "pop") updateUrlParams();

  window.appState.file = `/menu/${window.appState.menuOk}.html`;
  if (document.body.style.overflowY !== "scroll")
    document.body.style.overflowY = "scroll";

  const supportmeCheckbox = document.getElementById("supportme-checkbox");
  if (supportmeCheckbox && supportmeCheckbox.checked)
    supportmeCheckbox.checked = false;
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
          alert(
            "jumpToTarget(): element o id " +
              window.appState.subOk +
              " nie istnieje!",
          );
          reject(
            "jumpToTarget(): element o id " +
              window.appState.subOk +
              " nie istnieje!",
          );
        }
      });
    }

    return new Promise((resolve, reject) => {
      fadeOut(fadeElements)
        .then(() => stopScrolling())
        .then(() => loadContent(smoothMenu, smoothSub, "noscroll"))
        .then(() => jumpToTarget())
        .then(() => fadeIn(fadeElements))
        .then(() => {
          if (body.style.overflowY !== "scroll")
            body.style.overflowY = "scroll";

          resolve();
        });
    });
  }
  return fetch(window.appState.file, { method: "HEAD" }).then((response) => {
    if (response.status === 404) {
      if (menuGo === "404") {
        alert(
          `goTo()-soft_fetch: wystąpił błąd 404CR - strona nie została znaleziona, nie znaleziono również strony błędu. Zgłoś mi to, proszę! Nie znaleziono pliku: ${window.appState.file}.
            Naciśnij OK by przejść na stronę główną. 
            Naciśnij OK by przejść na stronę główną. Jeśli problem będzie się powtarzał, zgłoś mi to, proszę!`,
        );
        return goTo("home");
      }
      {
        decideUrlState();
        console.log("Ładowanie cieżką 404 + GA");

        return goTo("404", "404", popGo);
      }
    } else if (response.status === 200) {
      console.log("Ładowanie cieżką normalną + GA");

      if (window.scrollY === 0 && popGo !== "pop")
        return loadContent(window.appState.menuOk, window.appState.subOk, popGo)
          .then(decideUrlState)
          .then(ga_script);
      else
        return loadSmoothly(
          window.appState.menuOk,
          window.appState.subOk,
          popGo,
        )
          .then(decideUrlState)
          .then(ga_script);
    } else {
      alert(
        "goTo()-soft_fetch: Wystąpił nieoczekiwany błąd. Zgłoś mi to, proszę! Naciśnij OK by przejść na stronę główną. Jeśli problem będzie się powtarzał, zgłoś mi to, proszę!",
      );
      goTo("home");
    }
  });
}
