export default function cargarRepositorios() {
  fetch("http://localhost:8080/api/org/repositorios?org=the-palace-company")
    .then((res) => res.json())
    .then((repos) => {
      console.log("Repositorios recibidos:", repos);

      const contenedor = document.getElementById("resultados");
      contenedor.innerHTML = `
        <h2 class="title is-5">Repositorios de la organización 📦</h2>
        <div class="columns is-multiline">
          ${repos
          .map(
            (r) => `
                <div class="column is-3 fade-in">
                  <div class="card">
                    <div class="card-content has-text-centered">
                      <figure class="image is-96x96 is-inline-block mb-3">
                        <img class="is-rounded" src="${r.owner.avatar_url}" alt="@${r.owner.login}">
                      </figure>
                      <p class="title is-5">${r.name}</p>
                      <p class="subtitle is-6">ID: ${r.id}</p>
                      <p class="subtitle is-6">${r.language ?? "Lenguaje no definido"}</p>
                      <p class="subtitle is-6">
                        Rama por defecto: <strong>${r.default_branch}</strong>
                      </p>
                      <a href="${r.html_url}" target="_blank" class="button is-small is-link mt-2">
                        Ver en GitHub
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
        <p class="has-text-danger">❌ Error al cargar los repositorios</p>
      `;
    });
}
