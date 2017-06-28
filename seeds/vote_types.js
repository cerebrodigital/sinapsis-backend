'use strict';
var uuid = require('node-uuid');
module.exports = function(models) {
  models.VoteType.destroy({where: {}, truncate: true})
  .then(()=>{
    models.VoteType.bulkCreate([
      {id:uuid.v4(), code: 'up', name: 'Up'},
      {id:uuid.v4(), code: 'down', name: 'Down'},
      ])
    .spread((affectedCount, affectedRows)=>{
        console.log('VoteType created')
    })
  })
}