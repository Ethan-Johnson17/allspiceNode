import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class IngredientsService {
  async getIngredientsByRecipe(id) {
    return await dbContext.Ingredient.find({ id }).populate('recipe')
  }

  async getById(id) {
    const ingredient = await dbContext.Ingredient.findById(id).populate('account recipe')
    if (!ingredient) {
      throw new BadRequest('Whatchu talkin bout Willis?')
    }
    return ingredient
  }

  async create(body) {
    const ingredient = await dbContext.Ingredient.create(body)
    return ingredient.populate('account recipe')
  }

  async edit(body) {
    const ingredient = await this.getById(body.id)
    if (ingredient.creatorId.toString() !== body.creatorId) {
      throw new Forbidden("Play nice, that's not yours.")
    }
    const myIngredient = await dbContext.Ingredient.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return myIngredient
  }

  async delete(ingredientId, userId) {
    const ingredient = await this.getById(ingredientId)
    if (ingredient.creatorId.toString() !== userId) {
      throw new Forbidden("Play nice, that's not yours.")
    }
    await dbContext.Ingredient.findByIdAndDelete(ingredientId)
  }
}

export const ingredientsService = new IngredientsService()
