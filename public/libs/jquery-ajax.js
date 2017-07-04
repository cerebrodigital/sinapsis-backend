
$(document).ajaxError((event, xhr, ajaxOptions, thrownError)=>{

  console.log('ajax error', xhr)
  console.log(xhr.status,xhr.responseText)
  switch(xhr.status) {
    case 401:
      if (window.location.pathname != '/ingreso'){
        window.location = '/ingreso'
        return
      }
      flash.error("Email o contraseña incorrectos")
      break

    case 420:
      console.log('420', xhr)
      flash.error(xhr.responseText)

      break

    default:
  }

})
jQuery.each( [ "put", "delete",'patch' ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});
