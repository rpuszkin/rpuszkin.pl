/**
 * Google Analytics 4 – własny skrypt page_view
 * Measurement ID: G-9KM42DQC1Y
 */

// Inicjalizacja kolejki danych i funkcji pomocniczej gtag
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Inicjalizacja GA4 (poza localhost)
if (
  window.location.hostname !== "127.0.0.1" &&
  window.location.hostname !== "localhost"
) {
  gtag("js", new Date());
  gtag("config", "G-9KM42DQC1Y", {
    send_page_view: false, // wyłączamy automatyczny page_view
  });
}

// Ręczne wysyłanie page_view
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
