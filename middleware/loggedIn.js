module.exports = function(opts){

  return function(req,res,next){
    if(req.user){
      console.log("user is here", req.user)
      next()
    }else{
      res.redirect('/login')
    }
  }
}
