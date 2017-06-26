module.exports = function(opts){
  return function (req,res,next){

    let token = req.query.token || req.body.token

    if(token){
      jwt.verify(token, 'some secreto', function(err, decoded){
        if(err){
          return res.status(401).json({message: 'bad token'})
        }
        User.findById(decoded.id)
        .catch(err=>{ return res.stataus(401).json({message: 'bad token'})})
        .then(found=>{
          req.user = found
          next()
        })
      })
    }else{
      next()
    }
  }
}
