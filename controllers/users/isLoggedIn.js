const isLoggedIn = async (req, res, next) => {
  const currentUser = req.user
  const { email, subscription, avatarURL } = currentUser

  res.json({
    email,
    subscription,
    avatarURL,
  })
}

module.exports = isLoggedIn
