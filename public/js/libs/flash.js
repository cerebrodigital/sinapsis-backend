window.flash={
  error: (text)=>{
    console.log(text)
    $('#notification-container').append($('#danger-notification-template').html()).find('.danger-message').last().text(text)
  },
  success: (text)=>{
    $('#notification-container').append($('#success-notification-template').html()).find('.success-message').last().text(text)
  },
  info: (text)=>{
    $('#notification-container').append($('#info-notification-template').html()).find('.info-message').last().text(text)
  },
  warning: (text)=>{
    $('#notification-container').append($('#warning-notification-template').html()).find('.warning-message').last().text(text)
  }

}
