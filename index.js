document.querySelectorAll("nav a.menu-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
document.getElementById("main-content").addEventListener("click", (event) => {
  const link = event.target.closest(".click-prevent");
  if (link) {
    event.preventDefault();
  }
});

function showHideSupportmeMore() {
  const supportmeCheckbox = document.getElementById("supportme-checkbox");
  if (supportmeCheckbox) {
    supportmeCheckbox.checked = !supportmeCheckbox.checked;
  }
}
window.addEventListener("popstate", (event) => {
  goTo(null, null, "pop").then(ga_script);
});
window.addEventListener("load", function () {
  init_appState();
  goTo();
});
