export default function buscarRepositorio() {
  const nombre = document.getElementById("repo").value.trim();
  fetch(`http://localhost:8080/api/org/repositorio?org=the-palace-company&repo=${encodeURIComponent(nombre)}`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al buscar repositorio");
      return res.json();
    })
    .then((data) => {
      console.log("Datos recibidos:", data);

      const { repositorio, colaboradores } = data;
      const contenedor = document.getElementById("resultados");

      contenedor.innerHTML = `
        <div class="box mt-4 fade-in multiline">
          <p>📦 <strong>Nombre:</strong> ${repositorio.name}</p>
          <p>🆔 <strong>ID:</strong> ${repositorio.id}</p>
          <p>🗒️ <strong>Descripción:</strong> ${repositorio.description || "Sin descripción"}</p>
          <p>💡 <strong>Lenguaje:</strong> ${repositorio.language}</p>
          <p>🍁 <strong>Rama por defecto:</strong> ${repositorio.default_branch}</p>
          <p>🔗 <strong>URL:</strong> 
            <a href="${repositorio.html_url}" target="_blank">${repositorio.html_url}</a>
          </p>
          
        </div>
      `;

      if (colaboradores && colaboradores.length > 0) {
        const colaboradoresHTML = colaboradores
          .map(
            (colab) => `
              <div class="column is-3 fade-in">
                <div class="card">
                  <div class="card-content has-text-centered">
                    <figure class="image is-96x96 is-inline-block mb-3">
                      <img class="is-rounded" src="${colab.avatar_url}" alt="${colab.login}">
                      <figcaption class="has-text-centered">${colab.id}</figcaption>
                    </figure>
                    <p class="title is-5">${colab.login}</p>
                    <a class="button is-link is-small mt-2" href="${colab.html_url}" target="_blank">
                      Ver perfil
                    </a>
                  </div>
                </div>
              </div>
            `
          )
          .join("");

        contenedor.innerHTML += `
          <h3 class="title is-4 mt-4">Colaboradores 🧑🏻‍💻</h3>
          <div class="columns is-multiline mt-2">
            ${colaboradoresHTML}
          </div>
        `;
      }
    })
    .catch(() => {
      document.getElementById("resultados").innerHTML = `
        <p class="has-text-danger">❌ Repositorio no encontrado</p>
      `;
    });
}