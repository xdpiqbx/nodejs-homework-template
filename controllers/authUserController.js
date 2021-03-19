const jwt = require('jsonwebtoken')
const { HttpCode } = require('../helpers/constants')
const EmailService = require('../service/email')
const authModel = require('../model/authModel')
const userModel = require('../model/userModel')

const { v4: uuidv4 } = require('uuid')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const registration = async (request, response, next) => {
  const { email, password } = request.body
  const user = await userModel.findUserByEmail(email)
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'Email in use',
    })
  }
  try {
    const verifyToken = uuidv4()
    const emailService = new EmailService(process.env.NODE_ENV)
    await emailService.sendEmail(verifyToken, email)
    const newUser = await userModel.createUser({
      email,
      password,
      verify: false,
      verifyToken,
    })
    return response.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatarURL,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (request, response, next) => {
  const { email, password } = request.body
  const user = await userModel.findUserByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword || !user.verify) {
    next({
      status: HttpCode.UNATHORIZED,
      message: 'Not verified',
    })
  }
  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  try {
    const result = await authModel.login({
      id,
      token,
    })
    if (result) {
      return response.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token: result.token,
          user: {
            email: result.userEmail,
            subscription: result.subscription,
          },
        },
      })
    }
    next({
      status: HttpCode.UNATHORIZED,
      message: 'Email or password is wrong',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (request, response, next) => {
  const userId = request.user.id
  await authModel.logout(userId)
  return response
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.NO_CONTENT, message: 'Nothing' })
}

const verify = async (request, response, next) => {
  try {
    const user = await userModel.findByVerifyToken(request.params.token)
    if (user) {
      await userModel.updateVeryfiToken(user.id, true, null)
      return response.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: `Verification successful.`,
      })
    }
    next({
      status: HttpCode.NOT_FOUND,
      code: HttpCode.NOT_FOUND,
      data: 'Bad request',
      message: `Link is not valid, user not found`,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registration,
  login,
  logout,
  verify,
}
