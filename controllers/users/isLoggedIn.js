const isLoggedIn = async (req, res, next) => {
  const currentUser = req.user
  const { email, subscription } = currentUser

  res.json({
    email,
    subscription,
  })
}

module.exports = isLoggedIn
