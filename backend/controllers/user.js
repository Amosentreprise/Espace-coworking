const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

exports.signUp = (req, res, next) => {
  
  bcrypt
    .hash(req.body.Password, 10)
    .then((hash) => {
      const user = new User({
        Username: req.body.Username,
        Email: req.body.Email,
        Telephone: req.body.Telephone,
        Password: hash,
        Date:req.body.Date,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        
        .catch((error) => res.status(400).json({error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ Username: req.body.Username })
    .then(user => {
      if (user === null) {
        res.status(401).json({ message: "Identifiant ou mot de passe Incorrect" })
        
      } else {
        bcrypt.compare(req.body.Password, user.Password)
          .then(valid => {
            if (!valid) {
              res.status(401).json({message : "Identifiant ou mot de passe Incorrect"})
            } else {
              res.status(200).json({
                userId: user._id,
                username: user.Username,
                token: jwt.sign({
                  userId: user._id
                  
                },
                  'RANDOM_TOKEN_SECRET',
                {expiresIn:'24h'})

                
              })
            }
          
          })
        .catch(error=>res.status(500).json({ error}))
      }
    })
  .catch(error=>res.status(500).json({error}))
};


exports.users = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json({ users}))
  .catch(error=>res.status(404).json({error}))
}

exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.body.id })
  .then(()=>res.status(200).json({message:'compte supprimer'}))
  .catch((error)=>res.status(500).json({ error }))
}
