let file;
let section;
let menuURL;
let subURL;

document.querySelectorAll("nav a.menu-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
document.querySelectorAll("header a").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
function loadContent(menu, sub) {
  const valid_menu = [
    "main",
    "supportme",
    "mygallery",
    "aboutme",
    "myhistory",
    "myprogress",
    "reallife",
    "irecommend",
    "mypojects",
    "404",
  ];
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  menuURL = params.get("menu");
  subURL = params.get("sub");
  if (!menu && !sub && !menuURL && !subURL) {
    //tu krs i else ten retern
    return;
  } else if (menu && !valid_menu.includes(menu)) {
    menu = "404";
    sub = "404";
  } else if (
    !sub &&
    !menu &&
    subURL &&
    (subURL === "krs" || subURL === "foundation") &&
    (menuURL === "supportme" || menuURL === "supportme")
  ) {
    sub = subURL;
  } else if (
    !sub &&
    !menu &&
    subURL &&
    (subURL !== "krs" || subURL !== "foundation")
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
  console.log("Plik: ", file);
  console.log("Sekcja: ", section);

  function loadFile(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            scrollAndLoad("404");
          } else {
            alert(
              `Wystąpił błąd o numerze ${response.status}. Opisz okoliczności wystąpienia błędu i razem z jego numerem, datą i godziną wystąpienia wyślij mi wiadomość. Dziękuję!`
            );
          }
        }
        return response.text();
      })
      .then((html) => {
        const mainElement = document.getElementById("main-content");
        if (mainElement) {
          mainElement.innerHTML = html;
        } else {
        }
        section = sub;
      })
      .catch((error) => {
        console.error("Error, while loading file:", error);
        alert(`Błąd: "${error.message}".`);
      });
  }
  const subpageHtmlTitle = {
    main: "strona główna",
    supportme: "wesprzyj mnie",
    mygallery: "galeria",
    aboutme: "o mnie",
    myhistory: "moja historia",
    myprogress: "moje postępy",
    reallife: "z życia wzięte",
    mypojects: "strefa projektów WWW",
    irecommend: " mogę polecić",
    404: "Błąd 404 - nie znaleziono",
  };
  document.title = "rpuszkin.pl" + " | " + subpageHtmlTitle[menu];
  if (sub === "krs") {
    document.title += " /  1,5% podatku";
  } else if (sub === "foundation") {
    document.title += " /  fundacja";
  }
  if (menu === "aboutme" || menu === "myhistory") {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  loadFile(file);
  return "content loaded";
}
function scrollAndLoad(menuLoad, subLoad) {
  const toLoad = () => Promise.resolve(loadContent(menuLoad, subLoad));

  const scrollToTop = () => scrollIt("top", 5600);
  const scrollToContent = () => scrollIt(section, 8300);
  if (window.scrollY >= window.innerHeight) {
    scrollToTop()
      .then(() => {
        return toLoad();
      })
      .then((content) => {
        if (content === "content loaded") {
          return scrollToContent();
        }
      });
  } else {
    toLoad().then(() => {
      scrollToContent();
    });
  }
}
