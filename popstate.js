window.addEventListener("popstate", (event) => {
  goTo(null, null, "pop").then(ga_script);
});
function setUrlState(nopush) {
  let newUrl;
  if (window.appState.subOk && window.appState.subOk !== window.appState.menuOk)
    newUrl = `/${window.appState.menuOk}/${window.appState.subOk}`;
  else newUrl = `/${window.appState.menuOk}`;

  if (!nopush && !window.appState.isLoadedOrDoubleClick)
    window.history.pushState({}, "", newUrl);
  return Promise.resolve();
}
