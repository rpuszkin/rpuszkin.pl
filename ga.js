window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

if (
  window.location.hostname !== "127.0.0.1" &&
  window.location.hostname !== "localhost"
) {
  gtag("js", new Date());
  gtag("config", "G-9NTHTCJ0M5", {
    send_page_view: false,
  });
}

function ga_script() {
  if (
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
  )
    return;
  if (typeof gtag === "function") {
    gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    });
  }
}
