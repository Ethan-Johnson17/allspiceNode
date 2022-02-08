import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class RecipesService {
  async getAll(query = {}) {
    const recipes = await dbContext.Recipe.find(query)
    return recipes
  }

  async getById(id) {
    const recipe = await dbContext.Recipe.findById(id).populate('account')
    if (!recipe) {
      throw new BadRequest('Cannot find that recipe')
    }
    return recipe
  }

  async create(body) {
    const recipe = await dbContext.Recipe.create(body)
    return recipe.populate('account')
  }

  async edit(body) {
    const recipe = await this.getById(body.id)
    if (recipe.creatorId.toString() !== body.creatorId) {
      throw new Forbidden("Play nice, that's not yours.")
    }
    const myRecipe = await dbContext.Recipe.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return myRecipe
  }

  async delete(recipeId, userId) {
    const recipe = await this.getById(recipeId)
    if (recipe.creatorId.toString() !== userId) {
      throw new Forbidden('Access Denied')
    }
    await dbContext.Recipe.findByIdAndDelete(recipeId)
    await dbContext.Favorite.deleteMany({ recipeId: recipeId, creatorId: userId })
    await dbContext.Try.deleteMany({ recipeId: recipeId, creatorId: userId })
  }
}
export const recipesService = new RecipesService()
