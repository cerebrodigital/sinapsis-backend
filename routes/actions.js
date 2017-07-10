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

  router.get('/publish/', (req, res, next)=>{
    req.params = {
      title:  "title a",
      url:            '',
      tags:           '',
      description:    '',
      category_code:  'math',
      post_type_code: 'article'
    }
    let data = req.params
    let p_array = []

    p_array.push(models.PostType.findOne({where: {code: data.post_type_code}}))
    p_array.push(models.Category.findOne({where: {code: data.category_code}}))
    Promise.all(p_array)
    .catch(err => { return next(err) })
    .then(values=>{
      let [postType, category] = values
      models.Post.create({
        title:          data.title,
        url:            data.url,
        tags:           data.tags,
        description:    data.description,
        category_id:    category.id,
        post_type_id:   postType.id
      })
      .catch(err => { return next(err) })
      .then(post => {
        res.json(post)
      })
    })
  })
  return router
}