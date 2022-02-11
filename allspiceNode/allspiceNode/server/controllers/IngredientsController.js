import { Auth0Provider } from '@bcwdev/auth0provider'
import { ingredientsService } from '../services/IngredientsService'
import BaseController from '../utils/BaseController'

export class IngredientsController extends BaseController {
  constructor() {
    super('api/ingredients')
    this.router
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getById(req, res, next) {
    try {
      const ingredient = await ingredientsService.getById(req.params.id)
      return res.send(ingredient)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const ingredient = await ingredientsService.create(req.body)
      return res.send(ingredient)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const ingredient = await ingredientsService.edit(req.body)
      return res.send(ingredient)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.uesrInfo.id
      const ingredientId = req.params.id
      await ingredientsService.delete(ingredientId, userId)
      res.send('Ingredient has been removed')
    } catch (error) {
      next(error)
    }
  }
}
