export default function cargarOrganizacion() {
  fetch(`http://localhost:8080/api/org?org=the-palace-company`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener la organización");
      return res.json();
    })
    .then(({ organizacion: org }) => {
      console.log("Organización recibida:", org);

      const contenedor = document.getElementById("resultados");

      contenedor.innerHTML = `
        <div class="box fade-in has-text-centered mt-2">
          <figure class="image is-128x128 is-inline-block">
            <img class="is-rounded" src="${org.avatar_url}" alt="@${org.login}">
          </figure>
          <h1 class="title is-5">${org.name}</h1>
          <p class="subtitle is-6 mt-2">ID: ${org.id}</p>
          <p>Repositorios públicos: <strong>${org.public_repos}</strong></p>
          <p>Repositorios privados: <strong>${org.total_private_repos}</strong></p>
          <a href="${org.html_url}" class="button is-link mt-4" target="_blank">
            🔗 Ver organización en GitHub
          </a>
        </div>
      `;
    })
    .catch(() => {
      document.getElementById("resultados").innerHTML = `
        <div class="notification is-danger has-text-centered">
          ❌ No se pudo obtener la información de la organización
        </div>
      `;
    });
}
