function initApp() {
  window.sectionConfig = {
    home: { title: "", serif: true, changeUrl: false },
    news: { title: " | nowości/wydarzenia", serif: true, changeUrl: true },
    supportme: { title: " | wesprzyj mnie", serif: false, changeUrl: true },
    supportme_foundation: {
      title: " | wesprzyj mnie → fundacja",
      serif: false,
      changeUrl: true,
    },
    supportme_krs: {
      title: " | wesprzyj mnie → 1,5% podatku",
      serif: false,
      changeUrl: true,
    },
    mygallery: { title: " | galeria", serif: false, changeUrl: true },
    aboutme: { title: " | o mnie", serif: true, changeUrl: true },
    myhistory: { title: " | moja historia", serif: true, changeUrl: true },
    myprogress: { title: " | moje postępy", serif: true, changeUrl: true },
    reallife: { title: " | z życia wzięte", serif: true, changeUrl: true },
    myprojects: { title: " | WWW", serif: true, changeUrl: true },
    irecommend: { title: " | mogę polecić", serif: true, changeUrl: true },
    404: {
      title: " | błąd 404 - nie znaleziono",
      serif: false,
      changeUrl: false,
    },
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
