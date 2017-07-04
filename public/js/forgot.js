$(($)=>{
  console.log('Haciendo login')
  $('#forgot').submit(function(e){
    e.preventDefault();
    data = $('#forgot').serialize();
    $.post('http://localhost:3003/auth/forgot', data, function(res) {
      flash.success('Se ha enviado un correo para resetear')
    });

  })

})
