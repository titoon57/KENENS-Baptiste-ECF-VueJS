const veryfyParams = (req, res, next) => {
  console.log(req.params)
  // si je n'ai pas d'id dans les paramètres de la requête...
  if(!req.params.id) {
    // erreur
    res.status(400).json({ error: 'le paramètre {id} est manquant.'})
  } else {
    // sinon...
    // on peut passer des nouvelles variables au prochain contrôleur
    req.foo="bar"
    // passe au prochain middleware/ou traitement de la requête
    next()
  }
  
}

module.exports = veryfyParams