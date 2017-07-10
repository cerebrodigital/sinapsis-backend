'use strict';
var uuid = require('node-uuid');

let counts = [ 1, 5, 10, 25, 100 ]
console.log("in here")
module.exports = function(models, cb) {
  console.log("in hereeee")
  models.Achievement.destroy({where: {}, truncate: true})
  .then(()=>{
    Promise.all([models.Category.findAll(), models.ActionType.findAll()])
    .then(([categories,actionTypes])=>{
      let p_array = []
      counts.forEach(count=>{
        categories.forEach(category=>{
          actionTypes.forEach(actionType=>{
            p_array.push(models.Achievement.create({
              action_type_id: actionType.id,
              category_id:    category.id,
              target_count:   count,
              code:           `${count}-${actionType.code}-${category.code}`,
              name:           `${count} ${actionType.name} in ${category.name}`

            }))
          })
        })
      })
      Promise.all(p_array)
      .catch(err=>{ console.log("Error in populate Achievements", err)})
      .then(achievements=>{
        console.log("Achievements Created :)")
        cb()
      })

    })

  })
}
