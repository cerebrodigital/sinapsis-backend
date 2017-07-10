var express = require('express');
var middleware = require('../middleware')

/* GET users listing. */

module.exports = function(models){

  let router = express.Router();
  router.use(middleware.loggedIn())

  router.put('/editProfile/', (req, res, next)=>{

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

  router.get('/publish/', (req, res, next)=>{
    req.params = {
      title:          'test',
      url:            '',
      tags:           '',
      description:    '',
      post_type_code: 'article',
      category_code:  'bio'
    }

    let data = req.params
    Promise.all([
      models.PostType.findOne({where: {code: data.post_type_code}}),
      models.Category.findOne({where: {code: data.category_code}})
    ])
    .catch(err => { return next(err) })
    .then(([postType, category])=>{
      //console.log('user 2', req.user)
      if (!postType){ throw new Error(`postType with code "${data.post_type_code}" not found`)}
      if (!category){ throw new Error(`category with code "${data.category_code}" not found`)}
      models.Post.create({
        title:          data.title,
        url:            data.url,
        tags:           data.tags,
        description:    data.description,
        user_id:        req.user.id,
        category_id:    category.id,
        post_type_id:   postType.id
      })
      .catch(err => { return next(err) })
      .then(post => {
        res.json(post)
      })
    })
  })

  router.get('/publish/:post_slug/heart/', (req, res, next)=>{

    let data = req.params
    Promise.all([
      models.Post.findOne({where: {slug: data.post_slug}}),
      models.VoteType.findOne({where: {code: 'up'}})
    ])
    .catch(err => { return next(err) })
    .then(([post, vote_type])=>{
      if (!post){ throw new Error(`post with slug "${data.post_slug}" not found`)}
      if (!vote_type){ throw new Error(`vote_type with code "up" not found`)}

      vote_params = {
        vote_type_id: vote_type.id,
        user_id:      req.user.id,
        post_id:      post.id
      }

      models.Vote.findOne({ where: vote_params })
      .catch(err => { return next(err) })
      .then(existent_vote =>{
        if (existent_vote){ throw new Error(`user can't vote up this post again`) }
        models.Vote.create(vote_params)
        .catch(err => { return next(err) })
        .then(vote => {
          res.json(vote)
        })
      })

    })
  })

  return router
}