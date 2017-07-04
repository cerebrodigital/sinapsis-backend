var express = require('express');
var router = express.Router();
var middleware = require('../middleware')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Home' , user: req.user});
});

router.get('/login', function(req, res, next) {
  if(req.user){
    res.redirect('/?token=')
  }else{
    res.render('auth/login', { title: 'Conectar' });
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
  res.render('auth/profile', { title: 'Profile'});
});

router.get('/perfil-editar', function(req, res, next) {
  res.render('auth/profile_edit', { title: 'Editar Perfil'});
});

router.get('/usuarios', function(req, res, next) {
  res.render('users', { title: 'Usuarios'});
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

module.exports = router;
