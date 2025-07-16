export default function cargarMiembros() {
  fetch("http://localhost:8080/api/org/miembros?org=the-palace-company")
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener miembros");
      return res.json();
    })
    .then((miembros) => {
      console.log("Miembros recibidos:", miembros);

      const contenedor = document.getElementById("resultados");
      contenedor.innerHTML = `
      <h2 class="title is-5">Miembros de la organización 🧑🏻‍💻</h2>
      <div class="columns is-multiline">
        ${miembros
          .map(
            (m) => `
              <div class="column is-3 fade-in">
                <div class="card">
                  <div class="card-content has-text-centered">
                    <figure class="image is-96x96 is-inline-block mb-3">
                      <img class="is-rounded" src="${m.avatar_url}" alt="@${m.login}">
                    </figure>
                    <p class="title is-5">${m.login}</p>
                    <h6 class="subtitle is-6">${m.id}</h6>
                    <a href="${m.html_url}" class="button is-small is-link mt-2" target="_blank">
                      Ver perfil
                    </a>
                  </div>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
    })
    .catch(() => {
      document.getElementById("resultados").innerHTML = `
      <p class="has-text-danger">❌ No se pudieron obtener los miembros</p>
    `;
    });
}
