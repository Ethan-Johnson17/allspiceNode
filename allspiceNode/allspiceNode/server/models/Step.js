import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const StepSchema = new Schema({
  stepOrder: { type: Number, required: true },
  bodyText: { type: String, required: true },
  recipeId: { type: String, required: true },
  creatorId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

StepSchema.virtual('account', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
StepSchema.virtual('recipe', {
  localField: 'recipeId',
  foreignField: '_id',
  ref: 'Recipe'
})
