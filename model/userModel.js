const User = require('./schemas/schUser')

const findUserById = async (id) => {
  try {
    const result = await User.findOne({ _id: id })
    return result
  } catch (error) {
    error.status = 400
    error.data = 'Bad request'
    throw error
  }
}

const findUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ email })
    return result
  } catch (error) {
    error.status = 400
    error.data = 'Bad request'
    throw error
  }
}

const createUser = async ({ email, password, verify, verifyToken }) => {
  const user = new User({ email, password, verify, verifyToken })
  return user.save()
}

const findByVerifyToken = async (verifyToken) => {
  try {
    const result = await User.findOne({ verifyToken })
    return result
  } catch (error) {
    error.status = 400
    error.data = 'Bad request'
    throw error
  }
}
const updateVeryfiToken = async (userId, verify, verifyToken) => {
  await User.updateOne({ _id: userId }, { verify, verifyToken })
}

const updateUserToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatarURL) => {
  await User.updateOne({ _id: id }, { avatarURL })
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  findByVerifyToken,
  updateVeryfiToken,
  updateUserToken,
  updateAvatar,
}
