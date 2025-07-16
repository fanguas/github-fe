import buscarRepositorio from './api/cargarRepositorio.js';
import cargarMiembros from './api/cargarMiembros.js';
import cargarRepositorios from './api/cargarRepositorios.js';
import cargarOrganizacion from './api/cargarOrganizacion.js';

document.addEventListener("DOMContentLoaded", () => {
  cargarOrganizacion();
  const repo = document.getElementById("repo");
  const org = document.getElementById("org");
  const btnBuscar = document.getElementById("btn-buscar");
  const btnMiembros = document.getElementById("btn-miembros");
  const btnRepos = document.getElementById("btn-repos");

  repo.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      buscarRepositorio();
    }
  });

  btnBuscar.addEventListener("click", buscarRepositorio);
  btnMiembros.addEventListener("click", cargarMiembros);
  btnRepos.addEventListener("click", cargarRepositorios);
});
