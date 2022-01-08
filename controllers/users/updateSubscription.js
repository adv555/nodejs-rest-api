const { User } = require('../../models')

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user
  const { subscription } = req.body

  const newSubscription = await User.findOneAndUpdate({ _id }, { subscription }, { new: true })

  const { email } = newSubscription
  res.json({
    status: 'updated',
    code: 200,
    message: `subscription updated to ${subscription}`,
    data: { User: { email, subscription } },
  })
}

module.exports = updateSubscription
