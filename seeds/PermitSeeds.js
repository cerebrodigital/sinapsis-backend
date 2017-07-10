'use strict';
var uuid = require('node-uuid');

module.exports = function(models, cb) {
models.Permit.destroy({where: {}, truncate: true})
  .then(()=>{
    models.Category.findAll()
    .then(categories=>{
      models.ActionType.findAll()
      .then(actionTypes=>{
        let p_array = []
        categories.forEach(category=>{
          actionTypes.forEach(actionType=>{
            p_array.push(models.Permit.create({
              action_type_id: actionType.id,
              category_id:    category.id
            }))
          })
        })
        Promise.all(p_array)
        .catch(err=>{ console.log("error in populate permit")})
        .then(permits=>{
          console.log('Permits created :)')
          cb()
        })

      })
    })
  })
}
