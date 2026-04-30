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
    window.menuOk = "home";
    window.subOk = window.menuOk;
    return;
  }
  if (menuURL && valid_menu.includes(menuURL)) window.menuOk = menuURL;
  else {
    window.menuOk = "404";
    window.subOk = "404";
    return;
  }
  if (!subURL) {
    window.subOk = window.menuOk;
  } else if (
    (subURL === "krs" || subURL === "foundation") &&
    menuURL === "supportme"
  ) {
    window.subOk = subURL;
  } else if (subURL) {
    window.menuOk = "404";
    window.subOk = window.menuOk;
  }
}
