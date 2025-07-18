document.addEventListener("DOMContentLoaded", () => {
  fetch('eventos.json')
    .then(response => response.json())
    .then(eventos => {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0]; // Formato: "2025-07-12"

    eventos = eventos
      .filter(e => e.fecha >= hoyStr) // Comparación directa en formato YYYY-MM-DD
      .sort((a, b) => a.fecha.localeCompare(b.fecha));


      const contenedor = document.getElementById('eventos-lista');

      if (eventos.length === 0) {
        contenedor.innerHTML = "<p>No hay eventos próximos disponibles.</p>";
        return;
      }

      eventos.forEach(evento => {
        const card = document.createElement('div');
        card.classList.add('evento');

        if (evento.categoria === "rosa"){
          card.classList.add('evento-rosa');
        } else if (evento.categoria === "simple"){card.classList.add('evento-simple');

        }

        card.innerHTML = `
          <img src="${evento.imagen}" alt="${evento.titulo}" class="evento-img">
          <h3>${evento.titulo}</h3>
          <p><strong>📅 Fecha:</strong> ${evento.fecha}</p>
          <p><strong>🕒 Horario:</strong> ${evento.horario || 'Horario no disponible'}</p>
          <p><strong>📍 Lugar:</strong> ${evento.ubicacion}</p>
          <p>${evento.descripcion}</p>
          ${evento.maps ? `<a href="${evento.maps}" target="_blank" class="btn-maps">Ver en Google Maps</a>` : ''}
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar los eventos:", error);
    });
});
