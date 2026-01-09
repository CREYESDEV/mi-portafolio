document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-lista");
  if (!blogContainer) return;

  // OJO: tu carpeta se llama "Entradas" (E mayúscula)
  const entradas = ["Entradas/entrada1.json"];

  entradas.forEach(async (archivo) => {
    try {
      const res = await fetch(archivo, { cache: "no-store" });
      if (!res.ok) throw new Error(`No se pudo cargar ${archivo} (HTTP ${res.status})`);

      const data = await res.json();

      // Tu JSON usa "Título" (con tilde). Esto lo soporta.
      const titulo = data.titulo ?? data.Titulo ?? data["Título"] ?? "Sin título";
      const fecha = data.fecha ?? "";
      const resumen = data.resumen ?? "";
      const contenidoHTML = data.contenido ?? "";

      const article = document.createElement("article");
      article.className = "entrada";

      article.innerHTML = `
        <h3>${titulo}</h3>
        <p class="fecha">${fecha}</p>
        <p>${resumen}</p>
        <button class="leer-mas" type="button" aria-expanded="false">Leer más</button>
        <div class="contenido" style="display:none;">
          ${contenidoHTML}
        </div>
      `;

      const btn = article.querySelector(".leer-mas");
      const contenido = article.querySelector(".contenido");

      btn.addEventListener("click", () => {
        const abierto = contenido.style.display === "block";
        contenido.style.display = abierto ? "none" : "block";
        btn.textContent = abierto ? "Leer más" : "Leer menos";
        btn.setAttribute("aria-expanded", String(!abierto));
      });

      blogContainer.appendChild(article);
    } catch (err) {
      console.error(err);
      const div = document.createElement("div");
      div.className = "entrada";
      div.innerHTML = `
        <h3>Error</h3>
        <p>No pude cargar: <b>${archivo}</b></p>
        <p class="muted">${String(err.message || err)}</p>
      `;
      blogContainer.appendChild(div);
    }
  });
});


