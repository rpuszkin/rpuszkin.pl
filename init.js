function initApp() {
  window.sectionConfig = {
    home: { title: "", serif: true },
    news: { title: " | nowości/wydarzenia", serif: true },
    supportme: { title: " | wesprzyj mnie", serif: false },
    supportme_foundation: {
      title: " | wesprzyj mnie → fundacja",
      serif: false,
    },
    supportme_krs: { title: " | wesprzyj mnie → 1,5% podatku", serif: false },
    mygallery: { title: " | galeria", serif: false },
    aboutme: { title: " | o mnie", serif: true },
    myhistory: { title: " | moja historia", serif: true },
    myprogress: { title: " | moje postępy", serif: true },
    reallife: { title: " | z życia wzięte", serif: true },
    myprojects: { title: " | WWW", serif: true },
    irecommend: { title: " | mogę polecić", serif: true },
    404: { title: " | błąd 404 - nie znaleziono", serif: false },
  };
  if (!window.appState)
    window.appState = {
      menuOk: null,
      subOk: null,
      previousMenu: null,
      previousSub: null,
      serifLoaded: false,
      scroll: {
        isScrolling: false,
        skipScrolling: false,
        stopScrollNow: false,
      },
    };
}
