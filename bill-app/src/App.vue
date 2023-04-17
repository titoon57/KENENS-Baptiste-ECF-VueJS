<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-between py-3 px-4 mb-4 border-bottom">
      <RouterLink
        :to="{
          name: 'home'
        }"
        class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-primary"
      >
        <i class="fa-solid fa-wallet fa-2x" />
        <span class="fs-3">Factures</span>
      </RouterLink>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <!-- RouterLink prend en charge la navigation interne avec les pages 
          déclarée dans ./router/index.js 
          on modifie la classe active sur chaque lien 
          pour utiliser les classes de bootstrap "active"
          -->

          <RouterLink to="/" exact-active-class="active" active-class="active" class="nav-link">
            <i class="fa-solid fa-house" /> Accueil
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            exact-active-class="active"
            active-class="active"
            to="/clients"
            class="nav-link"
          >
            Clients
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            exact-active-class="active"
            active-class="active"
            to="/about"
            class="nav-link"
          >
            A propos
          </RouterLink>
        </li>
      </ul>
    </header>

    <main class="container main-router-container">
      <!-- ici seront affichées les différentes "routes" ou "pages" de mon application -->
      <RouterView />
    </main>

    <footer class="py-3 my-4 border-top text-center">
      <span class="mb-3 mb-md-0 text-body-secondary maClassPerso"
        >© {{ currentYear }} Factures.app</span
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    currentYear() {
      //récupère la date courante
      const d = new Date()
      // retourne l'année pour l'affichage dans le template de currentYear
      return d.getFullYear()
    }
  }
}
</script>

<style scoped>
.maClassPerso {
  color: green;
}
</style>
