import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class FavoritesService {
  async getFavoritesByAccount(accountId) {
    const favorites = await dbContext.Favorite.find({ accountId }).populate('account game')
    return favorites
  }

  async getById(id) {
    const favorite = await dbContext.Favorite.findById(id).populate('recipe account')
    return favorite
  }

  async create(body) {
    const favorite = await dbContext.Favorite.create(body)
    // Need a populate here?
    return favorite
  }

  async remove(favoriteId, userId) {
    const favorite = await this.getById(favoriteId)
    if (favorite.accountId.toString() !== userId) {
      throw new Forbidden('Access Denied')
    }
    await dbContext.Favorite.findByIdAndDelete(favoriteId)
  }
}
export const favoritesService = new FavoritesService()
