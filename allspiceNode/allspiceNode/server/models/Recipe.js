import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const RecipeSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  imgUrl: { type: String, required: true },
  creatorId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

RecipeSchema.virtual('account', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
