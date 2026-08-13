// Inicjalizacja kolejki danych i funkcji pomocniczej gtag
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Konfiguracja GA4 ze stemplem czasu
gtag("js", new Date());

// Rejestracja usługi z wyłączeniem automatycznego page_view na starcie
gtag("config", "G-VF1R248K06", {
  send_page_view: false,
});

// Funkcja wywoływana po podmianie zawartości w SPA
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
