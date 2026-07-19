function init_appState() {
  if (!window.appState)
    window.appState = {
      menuOk: null,
      subOk: null,
      previousMenu: null,
      previousSub: null,
      scroll: {
        isScrolling: false,
        skipScrolling: false,
        stopScrollNow: false,
      },
    };
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
  document.title = "rpuszkin.pl" + subpageHtmlTitle[window.appState.menuOk];
  if (window.appState.subOk === "krs") {
    document.title += " →	1,5% podatku";
  } else if (window.appState.subOk === "foundation") {
    document.title += " → fundacja";
  }
}
