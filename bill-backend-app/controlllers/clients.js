const Client = require('../models/Clients')

// récupérer la liste, correspond à la route GET /bills
const getItems = (req, res)=> {
  // on interroge la base de donnée
  Client.find().then((clients)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(200).json(clients)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// récupérer un élément unique, correspond à la route GET /bills/:id
const getItem = (req, res)=> {
  const id = req.params.id
  // une variable qui vient du middleware précédent (verifyParams)
  console.log(req.foo)
  // requete la bdd
  Client.findOne({
    _id: id
  }).then((client)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(200).json(client)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// modifie un élément unique, correspond à la route PATCH /bills/:id
const patchItem = (req, res)=> {
  const id = req.params.id
  const updatedClient = req.body

  console.log(req.body)
  // trouve une facture et patch 
  Client.updateOne({
    _id: id
  }, {
    ...updatedClient
  }).then((client)=>{
    //on renvoie les résultats sous la forme de JSON
    res.status(201).json(client)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

// Crée un élément, correspond à la route POST /bills/
const postItem = (req, res)=> {
  // on fait des vérifications sur la donnée passée dans le body
  // console.log(req.body)
  const newClient = req.body

  // on check les valeurs requises dans notre modèle
  if(!newClient.clientNum || !newClient.clientPrenom || !newClient.clientNom || !newClient.clientFonction || !newClient.clientTelephone || !newClient.clientEmail || !newClient.clientEntreprise || !newClient.clientDateAjout || !newClient.clientAdresse1 || !newClient.clientCodePostal || !newClient.clientVille || !newClient.clientPays) {
    // si il y a une erreur, on interrompt l'opération
    // retour une erreur
    return res.status(400).json({error: 'Veuillez remplir les champs obligatoires.'})
  }
  //si la valdation est passée
  // on crée une nouvelle instance de Bill avec en paramètre
  // les données qui viennent de la requête req.body
  const client = new Client({ ...newClient })
  client.save().then(()=> {
    // le statut code 201 indique que la ressource a bien été créée
    res.status(201).json(client)
    // gestion des erreurs, on retourne le status 400 avec le code erreur
  }).catch(error => res.status(400).json({ error }))
}

// delete un élément unique, correspond à la route DELETE /bills/:id
const deleteItem = (req, res)=> {
  const id = req.params.id
  Client.deleteOne({
    _id: id
  }).then(()=>{
    //on renvoie les résultats sous la forme de JSON
    res.sendStatus(204)
    //si erreur...
  }).catch(error => res.status(400).json({ error }))
}

module.exports = { getItems, getItem, patchItem, postItem, deleteItem }