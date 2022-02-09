import { Auth0Provider } from '@bcwdev/auth0provider'
import { stepsService } from '../services/StepsService'
import BaseController from '../utils/BaseController'

export class StepsController extends BaseController {
  constructor() {
    super('api/steps')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const steps = await stepsService.getAll(query)
      return res.send(steps)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const step = await stepsService.getById(req.params.id)
      return res.send(step)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const step = await stepsService.create(req.body)
      return res.send(step)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const step = await stepsService.edit(req.body)
      return res.send(step)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.uesrInfo.id
      const stepId = req.params.id
      await stepsService.delete(stepId, userId)
      res.send('Step has been removed')
    } catch (error) {
      next(error)
    }
  }
}
