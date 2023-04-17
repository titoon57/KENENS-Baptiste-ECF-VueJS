const express = require('express')
const router = express.Router()

//on charge un middleware externe
//ça permet d'intercepter la requete 
//pour globaliser la logique du traitement d'une requête
// ici ce middleware sert à contrôler qu'on a bien un params :id dans les requêtes
const verifyParams = require('../middleware/verifyParams')

// on importe le contrôleur des routes
const ctrl = require('../controlllers/bills')

// récupère la liste des bills
router.get('/', ctrl.getItems)
// récupère une bill en fonction de son id
router.get('/:id', verifyParams, ctrl.getItem)
// créer une nouvelle bill
router.post('/', ctrl.postItem)
// modifie une bill en fonction de son id
router.patch('/:id', verifyParams, ctrl.patchItem)
// supprime une bill en fonction de son id
router.delete('/:id', verifyParams, ctrl.deleteItem)

module.exports = router
