module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("authenticated: " + req.isAuthenticated())
      return next();
    } else {
      console.log("authenticated: " + req.isAuthenticated())
    }
    res.redirect("/users/login");
  },
};
