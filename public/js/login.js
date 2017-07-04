$(($)=>{
  console.log('Haciendo login')
  $('#conectar').submit(function(e){
    e.preventDefault();

    data = $('#conectar').serialize();
    $.post('/api/auth/login', data, function(res) {
      console.log(response)
    });

  })

})

