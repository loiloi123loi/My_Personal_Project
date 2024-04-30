import { Router } from 'express'
import {
  changePasswordController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendVefiryEmailController,
  resetPasswordController,
  unfollowController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  verifyForgotPasswordTokenValidator,
  changePasswordValidator,
  resetPasswordValidator,
  verifiedUserValidator,
  updateMeValidator,
  followValidator,
  unfollowValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'
const usersRouter = Router()

usersRouter.route('/login').post(loginValidator, wrapRequestHandler(loginController))
usersRouter.route('/oauth/google').get(wrapRequestHandler(oauthController))
usersRouter.route('/register').post(registerValidator, wrapRequestHandler(registerController))
usersRouter.route('/logout').post(accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
usersRouter.route('/refresh-token').post(refreshTokenValidator, wrapRequestHandler(refreshTokenController))
usersRouter
  .route('/verify-email')
  .post(accessTokenValidator, emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))
usersRouter.route('/resend-verify-email').post(accessTokenValidator, wrapRequestHandler(resendVefiryEmailController))
usersRouter.route('/forgot-password').post(forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
usersRouter
  .route('/verify-forgot-password')
  .post(verifyForgotPasswordTokenValidator, wrapRequestHandler(verifyForgotPasswordController))
usersRouter.route('/reset-password').post(resetPasswordValidator, wrapRequestHandler(resetPasswordController))
usersRouter
  .route('/me')
  .get(accessTokenValidator, wrapRequestHandler(getMeController))
  .patch(
    accessTokenValidator,
    verifiedUserValidator,
    updateMeValidator,
    filterMiddleware<UpdateMeReqBody>([
      'name',
      'date_of_birth',
      'bio',
      'location',
      'website',
      'username',
      'avatar',
      'cover_photo'
    ]),
    wrapRequestHandler(updateMeController)
  )
usersRouter.route('/:username').get(wrapRequestHandler(getProfileController))
usersRouter
  .route('/follow')
  .post(accessTokenValidator, verifiedUserValidator, followValidator, wrapRequestHandler(followController))
usersRouter
  .route('/follow/:user_id')
  .delete(accessTokenValidator, verifiedUserValidator, unfollowValidator, wrapRequestHandler(unfollowController))
usersRouter
  .route('/change-password')
  .put(accessTokenValidator, changePasswordValidator, wrapRequestHandler(changePasswordController))

export default usersRouter
