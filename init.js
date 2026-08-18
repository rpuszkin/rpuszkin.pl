function initApp() {
  window.sectionConfig = {
    home: { title: "", serif: true, modifyUrl: false },
    news: { title: " | nowości/wydarzenia", serif: true, modifyUrl: true },
    supportme: { title: " | wesprzyj mnie", serif: false, modifyUrl: true },
    supportme_foundation: {
      title: " | wesprzyj mnie → fundacja",
      serif: false,
      modifyUrl: true,
    },
    supportme_krs: {
      title: " | wesprzyj mnie → 1,5% podatku",
      serif: false,
      modifyUrl: true,
    },
    mygallery: { title: " | galeria", serif: false, modifyUrl: true },
    aboutme: { title: " | o mnie", serif: true, modifyUrl: true },
    myhistory: { title: " | moja historia", serif: true, modifyUrl: true },
    myprogress: { title: " | moje postępy", serif: true, modifyUrl: true },
    reallife: { title: " | z życia wzięte", serif: true, modifyUrl: true },
    myprojects: { title: " | WWW", serif: true, modifyUrl: true },
    irecommend: { title: " | mogę polecić", serif: true, modifyUrl: true },
    404: {
      title: " | błąd 404 - nie znaleziono",
      serif: false,
      modifyUrl: false,
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
