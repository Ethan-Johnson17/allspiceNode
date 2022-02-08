import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const FavoriteSchema = new Schema({
  recipeId: { type: String, required: true },
  accountId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

FavoriteSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
FavoriteSchema.virtual('recipe', {
  localField: 'recipeId',
  foreignField: '_id',
  ref: 'Recipe'
})
