module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/') //home page
    }
  }, //* (below) so they don't see login the login if logged in
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard') //! what the page after login is
    } else {
      return next()
    }
  }
}
