<template>
    <div class="client">
      <header class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
        <h1>
          {{ isNewClient ? 'Créer un nouveau ' : 'Modifier le' }} client
          <span v-if="!isNewClient" class="text-primary">#{{ id }}</span>
        </h1>
        <div class="d-flex gap-2">
          <BButton
            v-if="!isNewClient"
            size="sm"
            variant="outline-danger"
            icon-left="trash"
            @click="onDeleteClient()"
            >Supprimer</BButton
          >
          <BButton to="/" size="sm" variant="outline-secondary" icon-left="angle-left"
            >Annuler</BButton
          >
        </div>
      </header>
  
      <!-- j'attends que bill existe pour afficher le formulaire -->
      <section v-if="client">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="mb-3 row">
              <label for="clientPrenom" class="col-sm-4 col-form-label">Prénom</label>
              <div class="col-sm-8">
                <input v-model.number="client.clientPrenom" class="form-control" id="clientPrenom" />
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4">
            <div class="mb-3 row">
              <label for="clientNom" class="col-sm-4 col-form-label">Nom</label>
              <div class="col-sm-8">
                <input v-model="client.clientNom" class="form-control" id="clientNom" />
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4">
            <div class="mb-3 row">
              <label for="clientDateAjout" class="col-sm-4 col-form-label">Date d'ajout</label>
              <div class="col-sm-8">
                <input v-model="client.clientDateAjout" class="form-control" id="clientDateAjout" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-5">
            <div class="mb-3 row">
              <label for="clientFonction" class="col-sm-4 col-form-label">Fonction</label>
              <div class="col-sm-8">
                <input v-model="client.clientFonction" class="form-control" id="clientFonction" />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-5">
            <div class="mb-3 row">
              <label for="clientTelephone" class="col-sm-4 col-form-label">Téléphone</label>
              <div class="col-sm-8">
                <input v-model="client.clientTelephone" class="form-control" id="clientTelephone" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-10">
            <div class="mb-3 row">
              <label for="clientEmail" class="col-sm-4 col-form-label">Email</label>
              <div class="col-sm-8">
                <input v-model="client.clientEmail" class="form-control" id="clientEmail" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-10">
            <div class="mb-3 row">
              <label for="clientEntreprise" class="col-sm-4 col-form-label">Entreprise</label>
              <div class="col-sm-8">
                <input v-model="client.clientEntreprise" class="form-control" id="clientEntreprise" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-10">
            <div class="mb-3 row">
              <label for="clientAdresse1" class="col-sm-4 col-form-label">Adresse 1</label>
              <div class="col-sm-8">
                <input v-model="client.clientAdresse1" class="form-control" id="clientAdresse1" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-10">
            <div class="mb-3 row">
              <label for="clientAdresse2" class="col-sm-4 col-form-label">Adresse 2</label>
              <div class="col-sm-8">
                <input v-model="client.clientAdresse2" class="form-control" id="clientAdresse2" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-5">
            <div class="mb-3 row">
              <label for="clientCodePostal" class="col-sm-4 col-form-label">Code postal</label>
              <div class="col-sm-8">
                <input v-model="client.clientCodePostal" class="form-control" id="clientCodePostal" />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-5">
            <div class="mb-3 row">
              <label for="clientVille" class="col-sm-4 col-form-label">Ville</label>
              <div class="col-sm-8">
                <input v-model="client.clientVille" class="form-control" id="clientVille" />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-5">
            <div class="mb-3 row">
              <label for="clientPays" class="col-sm-4 col-form-label">Pays</label>
              <div class="col-sm-8">
                <input v-model="client.clientPays" class="form-control" id="clientPays" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="row">

          <div class="col text-end">
            <b-button @click="onSaveClient()" icon-right="fas fa-floppy-disk">
              {{ isNewClient ? 'Enregistrer' : 'Modifier' }}
            </b-button>
          </div>
        </div>
      </section>
  
    </div>
  </template>
  
  <script>
  import { clientOptions } from '../libs/clientOptions.js'
  import prestationInterface from '../interfaces/prestationInterface.js'
  
  import { mapState, mapActions } from 'pinia'
  import { useClientStore } from '../stores/client.js'
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        debug: false,
        clientOptions
      }
    },
    computed: {
      // on connecte le state de bill avec mapWritableState
      ...mapState(useClientStore, ['client']),
  
      // est-ce une nouvelle facture ? ou est-on en train de modifier une facture enregistrée ?
      isNewClient() {
        return !this.id || this.id < 0
      }
    },
    async mounted() {
      // console.log(this.$route.params.id)
      console.log(this.id)
      // au chargement du composant, en fonction de l'id passé dans la route, sous forme de props..
      if (this.isNewClient) {
        // soit je crée un nouveau formulaire (venant du store)
        await this.createClient()
      } else {
        // soit je remplis le formulaire avec les données d'une facture existante (venant du store)
        await this.getClient(this.id)
      }
    },
    methods: {
      // on importe les méthodes du store bill
      ...mapActions(useClientStore, ['createClient', 'getClient', 'saveClient', 'deleteClient']),
  
      onDeleteClient() {
        this.deleteClient(this.id)
        this.$router.push('/')
      },
      async onSaveClient() {
        await this.saveClient({
          ...this.client
        })
        this.$router.push('/')
      }
    }
  }
  </script>
  