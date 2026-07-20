function updateUrlParams() {
  const valid_menu = [
    "home",
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
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const menuURL = pathSegments.length > 0 ? pathSegments[1] : null;
  const subURL = pathSegments.length > 1 ? pathSegments[2] : null;

  if (!menuURL && !subURL) {
    window.appState.menuOk = "home";
    window.appState.subOk = window.appState.menuOk;
    return;
  }
  if (menuURL && valid_menu.includes(menuURL)) window.appState.menuOk = menuURL;
  else {
    window.appState.menuOk = "404";
    window.appState.subOk = "404";
    return;
  }
  if (!subURL) {
    window.appState.subOk = window.appState.menuOk;
  } else if (
    (subURL === "krs" || subURL === "foundation") &&
    menuURL === "supportme"
  ) {
    window.appState.subOk = subURL;
  } else if (subURL) {
    window.appState.menuOk = "404";
    window.appState.subOk = window.appState.menuOk;
  }
}
