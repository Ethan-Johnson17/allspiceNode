import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrySchema = new Schema({
  recipeId: { type: String, required: true },
  accountId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TrySchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TrySchema.virtual('recipe', {
  localField: 'recipeId',
  foreignField: '_id',
  ref: 'Recipe'
})
