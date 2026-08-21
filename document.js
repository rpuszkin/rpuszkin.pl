function setTitle() {
  if (window.appState.menuOk === window.appState.subOk) {
    document.title =
      "rpuszkin.pl" + window.sectionConfig[window.appState.menuOk].title;
  } else {
    document.title =
      "rpuszkin.pl" +
      window.sectionConfig[window.appState.menuOk + "_" + window.appState.subOk]
        .title;
  }
}
function reloadRoboto() {
  if (!document.fonts.check("400 18px Roboto")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700;900&display=swap";

    document.head.appendChild(link);
  }
}
function loadSerif() {
  if (
    window.sectionConfig[window.appState.menuOk].serif &&
    !window.appState.serifLoaded
  ) {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    window.appState.serifLoaded = true;
  }
}
