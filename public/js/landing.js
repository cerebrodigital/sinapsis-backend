$(($)=>{
  console.log('HELLO express-vue')
  $('#sliderejemplo').slick({
    slidesToShow: 5,
    centerPadding: '60px'
  });

  app = new Vue({
    el: '#app',
    data: {
      message: "old message"
    }
  })
  app.message = "new message"

})

