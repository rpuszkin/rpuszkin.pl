let file;
let section;
let menuURL;
let subURL;

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
    //tu krs
    menu = "main";
    sub = "main";
  } else if (menu && !valid_menu.includes(menu)) {
    menu = "404";
    sub = "404";
  } else if (
    !sub &&
    subURL &&
    (subURL === "krs" || subURL === "foundation") &&
    (menuURL === "supportme" || menuURL === "supportme")
  ) {
    sub = subURL;
  } else if (
    (sub && (sub !== "krs" || sub !== "foundation") && menu === "supportme") ||
    (subURL &&
      (subURL !== "krs" || subURL !== "foundation") &&
      (menuURL === "supportme" || menuURL === "supportme"))
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
            window.location.href = "?menu=404";
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

  loadFile(file);
  return "content loaded";
}
