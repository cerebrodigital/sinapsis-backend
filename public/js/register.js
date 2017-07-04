$(($)=>{
  console.log('Registrando el usuario')
  $('#register').submit(function(e){
    e.preventDefault();
    console.log("Registrando");
    data = $('#register').serialize();
    console.log(data);
    $.post('http://localhost:3003/auth/register', data, function(res) {
      console.log("dando click en registrar", res);
    });

  })

})