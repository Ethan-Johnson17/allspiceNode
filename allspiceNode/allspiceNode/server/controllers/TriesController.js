import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { triesService } from '../services/TriesService'

export class TriesController extends BaseController {
  constructor() {
    super('/api/tries')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getById(req, res, next) {
    try {
      const oneTry = await triesService.getById(req.params.id)
      return res.send(oneTry)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const oneTry = await triesService.create(req.body)
      res.send(oneTry)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tryId = req.params.id
      await triesService.remove(tryId, userId)
      res.send('Recipe removed from tries')
    } catch (error) {
      next(error)
    }
  }
}
