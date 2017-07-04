$(($)=>{
  console.log('Cargando VueJS')
  $.get('/api/users', function(response) {
    app = new Vue({
      el: '#userslist',
      data: {
        users: response
      }
    })
  })

})

