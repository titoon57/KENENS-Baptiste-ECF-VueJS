<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h1 class="mb-4"><i class="fas fa-angle-down me-2" />Accueil</h1>
      <BButton size="sm" iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1 } }">
        Ajouter une facture
      </BButton>
    </div>
    <!-- ./titre + bouton -->

    <p v-if="!bills || !bills.length" class="text-primary my-5">Aucune facture pour l'instant.</p>

    <!-- tableau des factures -->
    <BillList v-else>
      <BillListItem
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        message="test"
        @delete="deleteBill($event)"
        @edit="editBill($event)"
      />
    </BillList>

    <!-- ./tableau des factures -->

    <p class="text-center text-muted">
      {{ totalBills }} facture<span v-if="totalBills > 1">s</span>
    </p>
  </div>
</template>

<script>
import BillList from '@/components/BillList.vue'
import BillListItem from '@/components/BillListItem.vue'
// on charge le store des bills
import { useBillStore } from '@/stores/bill.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    BillList,
    BillListItem
  },
  computed: {
    // fait une correspondance du la variable state.bills qui vient du store
    //vers une variable locale computed 'bills' ici dans le composant
    ...mapState(useBillStore, ['bills', 'totalBills'])
  },
  mounted() {
    // récupérer la liste des bills depuis l'API et le store
    this.getAllBills()
  },
  methods: {
    ...mapActions(useBillStore, ['deleteBill', 'getAllBills']),

    // méthode appelée lorsque le composant enfant envoie
    // l'évémenent onEditBill
    editBill(id) {
      console.log('edit bill with id : ', id)
      this.$router.push({
        name: 'bill',
        params: { id }
      })
    }
  }
}
</script>
