'use strict';
var uuid = require('node-uuid');
module.exports = function(models) {
  models.ActionType.destroy({where: {}, truncate: true})
  .then(()=>{
    models.ActionType.bulkCreate([
      {id:uuid.v4(), code: 'profileUpdated', name: 'Profile Updated'}
      {id:uuid.v4(), code: 'comment', name: 'Comment'},
      {id:uuid.v4(), code: 'post', name: 'Post'},
      {id:uuid.v4(), code: 'upVote', name: 'Up Vote'},
      ])
    .spread((affectedCount, affectedRows)=>{
        console.log('Actions created')
    })
  })
}
