const { User } = require('../../models')
const path = require('path')
const fs = require('fs').promises
const editAvatar = require('../../helpers/avatarEditor')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file

  const [extention] = filename.split('.').reverse()
  const newFileName = `${req.user._id}.${extention}`
  const fileUpload = path.join(avatarsDir, newFileName)

  await editAvatar(tempUpload)
  await fs.rename(tempUpload, fileUpload)
  const avatarURL = path.join('avatars', newFileName)
  await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true })

  await res.status(200).json({ avatarURL })
}
module.exports = updateAvatar
