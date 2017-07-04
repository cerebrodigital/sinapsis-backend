$(($)=>{
  console.log('Haciendo login')
  $('#conectar').submit(function(e){
    e.preventDefault();

    data = $('#conectar').serialize();
    $.post('http://localhost:3003/auth/login', data, function(res) {

      localStorage.token = res.token
      window.location ="/?token=" + res.token;
    });

  })

})

