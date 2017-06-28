'use strict';
var uuid = require('node-uuid');
module.exports = function(models) {
  models.PostType.destroy({where: {}, truncate: true})
  .then(()=>{
    models.PostType.bulkCreate([
      {id:uuid.v4(), code: 'img', name: 'Image'},
      {id:uuid.v4(), code: 'link', name: 'Link'},
      {id:uuid.v4(), code: 'article', name: 'Article'},
      {id:uuid.v4(), code: 'video', name: 'Video'}
      ])
    .spread((affectedCount, affectedRows)=>{
        console.log('PostType created')
    })
  })
}
