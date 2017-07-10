'use strict';
var uuid = require('node-uuid');
var slug = require('slug')

module.exports = function(models, cb) {

  let categories = [
    { id:uuid.v4(), code: 'humor',    name: 'Humor'},
    { id:uuid.v4(), code: 'math',     name: 'Matemáticas'},
    { id:uuid.v4(), code: 'bio',      name: 'Biología'}

  ]

  models.Category.destroy({where: {}, truncate: true})
  .then(()=>{

    let cat_promises = categories.map(category=>{
      return models.Category.create(category)
    })

    Promise.all(cat_promises)
    .then(values=>{
      console.log('Categories created')
      cb()
    })

  })
}
