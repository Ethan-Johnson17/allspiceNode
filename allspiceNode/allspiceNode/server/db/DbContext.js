import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { RecipeSchema } from '../models/Recipe'
import { IngredientSchema } from '../models/Ingredient'
import { StepSchema } from '../models/Step'
import { FavoriteSchema } from '../models/Favorite'
import { TrySchema } from '../models/Try'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Recipe = mongoose.model('Recipe', RecipeSchema)
  Ingredient = mongoose.model('Ingredient', IngredientSchema)
  Step = mongoose.model('Step', StepSchema)
  Favorite = mongoose.model('Favorite', FavoriteSchema)
  Try = mongoose.model('Try', TrySchema)
}

export const dbContext = new DbContext()
