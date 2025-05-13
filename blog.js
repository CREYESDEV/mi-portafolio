const blogContainer = document.getElementById('blog-lista');

const entradas = [
  'entradas/entrada1.json'
];

entradas.forEach((archivo, index) => {
  fetch(archivo)
    .then(response => response.json())
    .then(data => {
      const entradaHTML = `
        <article class="entrada">
          <h3>${data.titulo}</h3>
          <p class="fecha">${data.fecha}</p>
          <p>${data.resumen}</p>
          <button class="leer-mas" data-index="${index}">Leer más</button>
          <div class="contenido" id="contenido-${index}" style="display: none;">
            ${data.contenido}
          </div>
        </article>
      `;
      blogContainer.innerHTML += entradaHTML;

      // Agregar evento al botón
      setTimeout(() => {
        const btn = document.querySelector(`button[data-index="${index}"]`);
        const contenido = document.getElementById(`contenido-${index}`);
        btn.addEventListener('click', () => {
          const visible = contenido.style.display === 'block';
          contenido.style.display = visible ? 'none' : 'block';
          btn.textContent = visible ? 'Leer más' : 'Leer menos';
        });
      }, 0);
    });
});
