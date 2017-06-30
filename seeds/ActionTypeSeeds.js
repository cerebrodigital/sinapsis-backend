'use strict';
var uuid = require('node-uuid');
module.exports = function(models, cb) {
  models.ActionType.destroy({where: {}, truncate: true})
  .then(()=>{
    models.ActionType.bulkCreate([

      {id:uuid.v4(), code: 'editSelfPost', name: 'Edit my profile'},
      {id:uuid.v4(), code: 'editSelfProfile', name: 'Edit my profile'},
      {id:uuid.v4(), code: 'editSelfComment', name: 'Edit my profile'},

      {id:uuid.v4(), code: 'editAnyPost' , name: 'Edit Any profile'},
      {id:uuid.v4(), code: 'editAnyProfile' , name: 'Edit Any profile'},
      {id:uuid.v4(), code: 'editAnyComment' , name: 'Edit Any profile'},

      {id:uuid.v4(), code: 'comment'        , name: 'Comment'},
      {id:uuid.v4(), code: 'post'           , name: 'Post'},
      {id:uuid.v4(), code: 'upVote'         , name: 'Up Vote'},
      {id:uuid.v4(), code: 'ban'            , name: 'Ban'},
      {id:uuid.v4(), code: 'report'         , name: 'Report'},
      {id:uuid.v4(), code: 'removeContent'  , name: 'Report'},

      ])
    .spread((affectedCount, affectedRows)=>{
        console.log('Actions created')
        cb()
    })
  })
}
