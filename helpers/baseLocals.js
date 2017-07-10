module.exports = function (req,locals){
  console.log('helpers')
  return Object.assign({
    user:           req.user,
    flash_errors:   req.flash('error'),
    flash_infos:    req.flash('info'),
    flash_success:  req.flash('success'),
    flash_warnings: req.flash('warning'),
  }, locals)
}
