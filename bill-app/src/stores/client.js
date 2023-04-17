import { defineStore } from 'pinia'
import clientInterface from '../interfaces/clientInterface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
const useClientStore = defineStore('client', {
  state: () => ({
    client: null,
    clients: []
  }),
  getters: {
    totalClients: (state) => state.clients.length
  },
  actions: {
    // éditer une facture existante à partir de son id
    async getAllClients() {
      try {
        // requête à l'API GET /bills
        const response = await axios.get('/clients')
        console.log(response.data)
        this.$patch({ clients: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // créer une nouvelle facture
    createClient() {
      console.log("Création d'un nouveau client")
      // dès que vous essayer de remplacer un objet ou un tableau dans le state, vous devez utiliser $patch
      // on place une nouvelle facture dans le store.bill (pour le formulaire)
      delete this.client._id
      this.$patch({ client: cloneDeep(clientInterface) })
    },

    // éditer une facture existante à partir de son id
    async getClient(id) {
      try {
        // requête à l'API GET /bills
        const response = await axios.get(`/clients/${id}`)
        console.log(response.data)
        // raffraichit la liste après suppression
        this.$patch({ client: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // enregistre les modifications d'une facture (nouvelle/en édition)
    async saveClient(client) {
      if (client._id) {
        try {
          const response = await axios.patch(`/clients/${client._id}`, client)
          console.log('patch response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("création d'un nouveau client")
        try {
          const response = await axios.post(`/clients`, client)
          console.log('post response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      }
    },

    // méthode pour supprimer une facture du tableau bills
    async deleteClient(id) {
      try {
        // requête à l'API GET /bills
        const response = await axios.delete(`/clients/${id}`)
        console.log('delete response ', response.data)
        // raffraichit la liste après suppression
        this.getAllClients()
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export { useClientStore }
