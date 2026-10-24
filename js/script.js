const WEBHOOK_URL = "PEGA_AQUI_TU_WEBHOOK_DE_DISCORD";

const PAGES = [
  ["index.html", "Inicio"],
  ["javascritpt.html", "JavaScript"],
  ["jquery.html", "jQuery"],
  ["json.html", "JSON"],
  ["hosting.html", "Hosting"],
  ["herramientas.html", "IA de Google"],
  ["cuestionario.html", "Cuestionario"]
];

const saved = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", saved);

// Idioma actual (cookie que usa Google Translate)
const lang = (document.cookie.match(/googtrans=\/es\/(\w+)/) || [])[1] || "es";

document.addEventListener("DOMContentLoaded", () => {
  const cur = location.pathname.split("/").pop() || "index.html";

  document.getElementById("nav").innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top"><div class="container">
    <a class="navbar-brand notranslate" href="index.html">Elixir</a>
    <button class="navbar-toggler bg-light" data-bs-toggle="collapse" data-bs-target="#m"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="m">
      <ul class="navbar-nav ms-auto align-items-lg-center">
        ${PAGES.map(p => `<li class="nav-item"><a class="nav-link ${p[0] == cur ? "active" : ""}" href="${p[0]}">${p[1]}</a></li>`).join("")}
        <li><button id="tg" class="btn-theme"></button></li>
        <li><button id="lg" class="btn-theme notranslate"></button></li>
      </ul>
    </div>
  </div></nav>`;

  document.getElementById("foot").innerHTML =
    `<footer class="text-center py-3 mt-5">© 2026 <span class="notranslate">Elixir</span> · Proyecto Técnico · <a href="recursos.html" class="text-white">Recursos</a></footer>`;

  // El código no se traduce
  document.querySelectorAll("pre,code").forEach(e => e.classList.add("notranslate"));

  // Botón modo claro/oscuro
  const tg = document.getElementById("tg");
  const lbl = () => tg.textContent = document.documentElement.getAttribute("data-bs-theme") == "dark" ? "☀️" : "🌙";
  lbl();
  tg.onclick = () => {
    const n = document.documentElement.getAttribute("data-bs-theme") == "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", n);
    localStorage.setItem("theme", n);
    lbl();
  };

  // Botón idioma español / inglés
  const lg = document.getElementById("lg");
  lg.textContent = lang == "en" ? "ES" : "EN";
  lg.onclick = () => {
    const t = lang == "en" ? "es" : "en";
    document.cookie = `googtrans=/es/${t};path=/`;
    document.cookie = `googtrans=/es/${t};path=/;domain=${location.hostname}`;
    location.reload();
  };

  // Cargar Google Translate
  const gt = document.createElement("div");
  gt.id = "gt";
  gt.style.display = "none";
  document.body.appendChild(gt);
  window.googleTranslateElementInit = () =>
    new google.translate.TranslateElement({ pageLanguage: "es", includedLanguages: "en,es", autoDisplay: false }, "gt");
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);

  // Animación de aparición al hacer scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }), { threshold: .1 });
  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));

  // Formulario -> Webhook de Discord
  const f = document.getElementById("contacto");
  if (f) f.addEventListener("submit", async e => {
    e.preventDefault();
    const m = document.getElementById("msg"), d = new FormData(f);
    try {
      const r = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `📩 **Nuevo mensaje**\n**Nombre:** ${d.get("nombre")}\n**Correo:** ${d.get("correo")}\n**Mensaje:** ${d.get("mensaje")}` })
      });
      if (!r.ok) throw 0;
      m.innerHTML = '<div class="alert alert-success">¡Mensaje enviado!</div>';
      f.reset();
    } catch {
      m.innerHTML = '<div class="alert alert-danger">No se pudo enviar. Revisa el webhook.</div>';
    }
  });
});