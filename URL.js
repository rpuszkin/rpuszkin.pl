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
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  const menuURL = params.get("menu");
  const subURL = params.get("sub");
  if (!menuURL && !subURL) {
    window.menuOk = "home";
    window.subOk = window.menuOk;
    return;
  } if (menuURL && valid_menu.includes(menuURL)) window.menuOk = menuURL;
  else {
    window.menuOk = "404";
    window.subOk = "404";
    return;
  }
  if (!subURL) {
    window.subOk = window.menuOk;
  } else if (
    (subURL === "krs" || subURL === "foundation") && menuURL==='supportme'
  ) {
    window.subOk = subURL;
  } else if (subURL) {
    window.menuOk = "404";
    window.subOk = window.menuOk;
  }
}
