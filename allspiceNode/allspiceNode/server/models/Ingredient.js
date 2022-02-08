import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const IngredientSchema = new Schema({
  inName: { type: String, required: true },
  quantity: { type: String, required: true },
  recipeId: { type: String, required: true },
  creatorId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

IngredientSchema.virtual('account', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
IngredientSchema.virtual('recipe', {
  localField: 'recipeId',
  foreignField: '_id',
  ref: 'Recipe'
})
