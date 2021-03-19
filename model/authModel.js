require('dotenv').config()

const userModel = require('../model/userModel')

const login = async ({ id, token }) => {
  await userModel.updateUserToken(id, token)
  const user = await userModel.findUserById(id)
  return { token, userEmail: user.email, subscription: user.subscription }
}

const logout = async (id) => {
  await userModel.updateUserToken(id, null)
}

module.exports = {
  login,
  logout,
}
