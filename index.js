let file;
let section;
let sectionElement;
let menuURL;
let subURL;
document.querySelectorAll("nav a.menu-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
document.getElementById("main-content").addEventListener("click", (event) => {
  const link = event.target.closest("a.button-link");
  if (link) {
    event.preventDefault();
  }
});
function loadContent(menu, sub, noScroll) {
  const valid_menu = [
    "main",
    "news",
    "supportme",
    "mygallery",
    "aboutme",
    "myhistory",
    "myprogress",
    "reallife",
    "irecommend",
    "myprojects",
    "404",
  ];
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  menuURL = params.get("menu");
  subURL = params.get("sub");
  if (!menu && !sub && !menuURL && !subURL) {
    menu = "main";
  } else if (menu && !valid_menu.includes(menu)) {
    menu = "404";
    sub = "404";
  } else if (
    !sub &&
    !menu &&
    subURL &&
    (subURL === "krs" || subURL === "foundation") &&
    menuURL === "supportme"
  ) {
    sub = subURL;
  } else if (
    !sub &&
    !menu &&
    subURL &&
    subURL !== "krs" &&
    subURL !== "foundation"
  ) {
    menu = "404";
    sub = "404";
  }
  if (!menu && valid_menu.includes(menuURL)) {
    menu = menuURL;
  }
  file = `menu/${menu}.html`;
  if (!sub && valid_menu.includes(menu)) {
    sub = menu;
  }
  section = sub;
  function loadFile(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            if (menu !== "404") {
              loadWithEffect(404);
              return;
            } else
              alert(
                "Wystąpił błąd 404R. Strona nie istnieje. Nie znaleziono też strony błędu. Opisz, PROSZĘ okoliczności wystąpienia błędu i razem z jego numerem, datą i godziną wystąpienia wyślij mi wiadomość na rpuszkin@gmil.com. DZIĘKUJĘ!"
              );
            return Promise.reject(new Error("404"));
          } else {
            alert(
              `Wystąpił błąd o numerze ${response.status}. Opisz, PROSZĘ okoliczności wystąpienia błędu i razem z jego numerem, datą i godziną wystąpienia wyślij mi wiadomość na rpuszkin@gmil.com. DZIĘKUJĘ!`
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
        section = sub;
      })
      .catch((error) => {
        alert(
          "Błąd podczas ładowania pliku:" +
            error +
            "\n Opisz dokładnie okoliczności wystąpienia i szczegółóły błędu i napisz mi maila na rpuszkin@gmail.com. Dziękuję!"
        );
        alert(`Błąd: "${error.message}".`);
      });
  }
  const subpageHtmlTitle = {
    main: "",
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
  document.title = "rpuszkin.pl" + subpageHtmlTitle[menu];
  if (sub === "krs") {
    document.title += " →	1,5% podatku";
  } else if (sub === "foundation") {
    document.title += " → fundacja";
  }
  if (menu === "aboutme" || menu === "myhistory" || menu === "main") {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  loadFile(file);
  if (menu !== sub) {
    if (menu !== "404" && menu && sub) {
      window.history.pushState({}, "", "?menu=" + menu + "&sub=" + sub);
    }
  } else {
    if (menu !== "404" && menu && menu !== "main") {
      window.history.pushState({}, "", "?menu=" + menu);
    }
  }
  if (noScroll === "noscroll") return loadFile(file);
  else return scrollIt(section, 7500);
}
function loadWithEffect(menuLoad, subLoad) {
  const fade = document.querySelectorAll(".main, .header");
  function smoothAndScroll(smoothMenu, smoothSub) {
    if (window.scrollY !== 0)
      fade.forEach((el) => el.classList.add("invisible"));
    setTimeout(() => {
      if (window.isScrolling) window.stopScrollNow = true;
      scrollTo(0, 0);
      loadContent(smoothMenu, smoothSub);
      fade.forEach((el) => el.classList.remove("invisible"));
    }, 1000);
  }
  function loadSmoothly(smoothMenu, smoothSub) {
    fade.forEach((el) => el.classList.add("invisible"));
    setTimeout(() => {
      if (window.isScrolling) {
        window.stopScrollNow = true;
        setTimeout(() => {
          stopScrollNow = false;
        }, 400);
      }
      if (!smoothSub && smoothMenu)
        loadContent(smoothMenu, smoothMenu, "noscroll");
      else if (smoothSub && smoothMenu)
        loadContent(smoothMenu, smoothSub, "noscroll");
      setTimeout(() => {
        sectionElement = document.getElementById(section);
      }, 320);
      setTimeout(() => window.scrollTo(0, sectionElement.offsetTop), 350);
    }, 1000);
    setTimeout(
      () => fade.forEach((el) => el.classList.remove("invisible")),
      2300
    );
    window.hasAutoScrolled = true;
  }
  //type of transition to new content type choosing
  if (window.scrollY === 0) loadContent(menuLoad, subLoad);
  else if (window.hasAutoScrolled || window.isScrolling || menuLoad === 404)
    loadSmoothly(menuLoad, subLoad);
  else smoothAndScroll(menuLoad, subLoad);
}

window.addEventListener("load", function () {
  loadWithEffect();
});
