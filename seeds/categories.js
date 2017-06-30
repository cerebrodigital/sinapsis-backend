'use strict';
var uuid = require('node-uuid');

module.exports = function(models) {

  let categories = [
    { id:uuid.v4(), code: 'humor',    name: 'Humor'},
    { id:uuid.v4(), code: 'math',     name: 'Matemáticas'},
    { id:uuid.v4(), code: 'bio',      name: 'Biología'}

  ]


  models.Category.destroy({where: {}, truncate: true})
  .then(()=>{
    models.Category.bulkCreate(categories)
    .spread((affectedCount, affectedRows)=>{
        console.log('Categories created')
    })
  })
}
