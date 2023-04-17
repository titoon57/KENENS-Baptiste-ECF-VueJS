import { defineStore } from 'pinia'
import billInterface from '../interfaces/billInterface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
const useBillStore = defineStore('bill', {
  state: () => ({
    bill: null,
    bills: []
  }),
  getters: {
    totalBills: (state) => state.bills.length
  },
  actions: {
    // éditer une facture existante à partir de son id
    async getAllBills() {
      try {
        // requête à l'API GET /bills
        const response = await axios.get('/bills')
        console.log(response.data)
        this.$patch({ bills: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // créer une nouvelle facture
    createBill() {
      console.log("Création d'une nouvelle facture")
      // dès que vous essayer de remplacer un objet ou un tableau dans le state, vous devez utiliser $patch
      // on place une nouvelle facture dans le store.bill (pour le formulaire)
      delete this.bill._id
      this.$patch({ bill: cloneDeep(billInterface) })
    },

    // éditer une facture existante à partir de son id
    async getBill(id) {
      try {
        // requête à l'API GET /bills
        const response = await axios.get(`/bills/${id}`)
        console.log(response.data)
        // raffraichit la liste après suppression
        this.$patch({ bill: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // enregistre les modifications d'une facture (nouvelle/en édition)
    async saveBill(bill) {
      if (bill._id) {
        try {
          const response = await axios.patch(`/bills/${bill._id}`, bill)
          console.log('patch response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("création d'une nouvelle facture")
        try {
          const response = await axios.post(`/bills`, bill)
          console.log('post response ', response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      }
    },

    // méthode pour supprimer une facture du tableau bills
    async deleteBill(id) {
      try {
        // requête à l'API GET /bills
        const response = await axios.delete(`/bills/${id}`)
        console.log('delete response ', response.data)
        // raffraichit la liste après suppression
        this.getAllBills()
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export { useBillStore }
