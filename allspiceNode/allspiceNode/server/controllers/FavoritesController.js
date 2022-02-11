import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { favoritesService } from '../services/FavoritesService'

export class FavoritesController extends BaseController {
  constructor() {
    super('/api/favorites')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getById(req, res, next) {
    try {
      const favorite = await favoritesService.getById(req.params.id)
      return res.send(favorite)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      console.log('hello')
      const favorite = await favoritesService.create(req.body)
      res.send(favorite)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const favoriteId = req.params.id
      await favoritesService.remove(favoriteId, userId)
      res.send('Recipe removed from favorites')
    } catch (error) {
      next(error)
    }
  }
}
