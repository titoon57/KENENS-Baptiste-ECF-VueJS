import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // Ajoutons une route pour l'édition et la création d'une facture
    {
      path: '/client/:id', //route dynamique qui passe un paramètre id
      name: 'client',
      props: true, //remvoie le paramètre en tant que props
      component: () => import('../views/ClientView.vue')
    },
    {
      path: '/bill/:id', //route dynamique qui passe un paramètre id
      name: 'bill',
      props: true, //remvoie le paramètre en tant que props
      component: () => import('../views/BillView.vue')
    },
    // Nous ajoutons ici une route avec une expression régulière pour gérer les erreurs de navigation
    // ATTTENTION À BIEN METTRE CETTE ROUTE EN DERNIER DANS LE TABLEAU DU ROUTER
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
