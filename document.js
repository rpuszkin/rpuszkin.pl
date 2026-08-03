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
    console.log("loadSerif(): Załadowano font Roboto Serif");
    window.appState.serifLoaded = true;
  }
}
