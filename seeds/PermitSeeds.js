'use strict';
var uuid = require('node-uuid');

module.exports = function(models) {
models.Permit.destroy({where: {}, truncate: true})
  .then(()=>{
    models.Category.findAll()
    .then(categories=>{
      models.ActionType.findAll()
      .then(actionTypes=>{
        categories.forEach(category=>{
          actionTypes.forEach(actionType=>{
            models.Permit.create()
            .then(permit=>{
              permit.setActionType(actionType).then(()=>{
                permit.setCategory(category).then(()=>{
                  console.log(`permit created :) ${actionType.code} , ${category.code}`)
                })
              })
            })
          })
        })
      })
    })
  })
}
