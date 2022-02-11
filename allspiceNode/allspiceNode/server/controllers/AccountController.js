import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { favoritesService } from '../services/FavoritesService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/favorites', this.getFavoritesByAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFavoritesByAccount(req, res, next) {
    try {
      const favorites = await favoritesService.getFavoritesByAccount(req.userInfo.id)
      return res.send(favorites)
    } catch (error) {
      next(error)
    }
  }
}
