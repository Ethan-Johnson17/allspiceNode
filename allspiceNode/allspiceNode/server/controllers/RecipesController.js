import { Auth0Provider } from '@bcwdev/auth0provider'
import { recipesService } from '../services/RecipesService'
import { stepsService } from '../services/StepsService'
import { ingredientsService } from '../services/IngredientsService'
import BaseController from '../utils/BaseController'

export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/steps', this.getRecipeSteps)
      .get('/:id/ingredients', this.getRecipeIngredients)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const recipes = await recipesService.getAll(query)
      return res.send(recipes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const recipe = await recipesService.getById(req.params.id)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

  async getRecipeSteps(req, res, next) {
    try {
      // const query = req.query
      const steps = await stepsService.getStepsByRecipe(req.params.id)
      return res.send(steps)
    } catch (error) {
      next(error)
    }
  }

  async getRecipeIngredients(req, res, next) {
    try {
      // const query = req.query
      const ingredients = await ingredientsService.getIngredientsByRecipe(req.params.id)
      return res.send(ingredients)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const recipe = await recipesService.create(req.body)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const recipe = await recipesService.edit(req.body)
      return res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const recipeId = req.params.id
      await recipesService.delete(recipeId, userId)
      res.send('Recipe has been removed')
    } catch (error) {
      next(error)
    }
  }
}
