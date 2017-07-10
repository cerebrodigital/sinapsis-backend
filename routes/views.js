var express = require('express');
var middleware = require('../middleware')
var helpers = require('../helpers')

/* GET home page. */
module.exports = function(models){
  let router = express.Router();
  router.get('/', function(req, res, next) {
    res.render('landing', helpers.baseLocals(req, { title: 'Landing' }));
  });

  router.get('/login', function(req, res, next) {
    if(req.user){
      res.redirect('/')
    }else{
      //console.log('flash', req.flash('error'))
      res.render('auth/login', helpers.baseLocals(req, {title: 'Conectar'}));
    }
  });

  router.get('/register', function(req, res, next) {
    res.render('auth/register', { title: 'Registro' });
  });

  router.get('/forgot', function(req, res, next) {
    res.render('auth/forgot', { title: 'Forgot Pass'});
  });

  router.get('/activation', function(req, res, next) {
    let vhash = req.query.vhash
    res.render('auth/activation', { title: 'Activacion', vhash: vhash});
  });

  router.get('/publicar', function(req, res, next) {
    res.render('publish', { title: 'Publicar' });
  });

  router.get('/perfil', function(req, res, next) {
    res.render('auth/profile', helpers.baseLocals(req, {title: 'Mi Perfil'}));
  });

  router.get('/perfil/:slug', function(req, res, next) {
    models.User.findOne({ where: {slug: req.params.slug}})
    .catch(err=>{next(err)})
    .then(found=>{res.render('auth/profile', { title: 'Profile', vuser: found})}) 
  });

  router.get('/perfil-editar', function(req, res, next) {
    res.render('auth/profile_edit', { title: 'Editar Perfil'});
  });

  router.get('/usuarios', function(req, res, next) {
    res.render('users', helpers.baseLocals(req, {title: 'Lista de Usuarios'}));
  });

  router.get('/buscar', function(req, res, next) {
    res.render('search', { title: 'Search'});
  });

  router.get('/post', function(req, res, next) {
    res.render('post', { title: 'Post'});
  });

  router.get('/reglas', function(req, res, next) {
    res.render('static/rules', { title: 'Reglas'});
  });

  router.get('/private', middleware.loggedIn(), function(req, res, next){
    res.render('private', {user: req.user})
  })

  router.get('/admin_stats', function(req, res, next) {
    res.render('admin/stats', { title: 'Estadisticas totales' });
  });
  return router
}
