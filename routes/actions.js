var express = require('express');

/* GET users listing. */

module.exports = function(models){
  let router = express.Router();
  router.put('/editProfile/', function(req, res, next) {

    let user_id = req.params.user_id
    let allowed_columns = models.Profile.allowed_columns || []

    models.Profile.find({where: {user_id: user_id}})
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      found.update(req.body,{
        fields: allowed_columns
      })
      .catch(err => { return next(err) })
      .then(updated=>{
        res.json({message: `$Profile user_id: ${user_id} updated`, data: updated})
      })
    })

    .then(users => {
      res.json(users)
    })
  });

  router.post('/heart/', (req, res, next)=>{

    // check target
    // req.user

  })

  router.post('/publish/', (req, res, next)=>{
    // params {}
    let data = req.params.data

    models.Post.create({

    })

  })


  return router
}