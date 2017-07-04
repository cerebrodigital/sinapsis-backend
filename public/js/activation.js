$(($)=>{
  console.log('Activando la cuenta')
  $('#activation').submit(function(e){
    e.preventDefault();
    console.log("Registrando");
    data = $('#activation').serialize();
    console.log(data);
    $.post('http://localhost:3003/auth/activation', data, function(res) {
      console.log("estos son los datos de activate", res);
      flash.success('Se ha activado satisfactoriamente')
      setTimeout(function() {
        window.location = '/login'
      }, 3000)
    });

  })

})