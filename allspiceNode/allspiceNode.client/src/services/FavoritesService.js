import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FavoritesService {

  async createFavorite(accountId, favorite) {
    try {
      const res = await api.post('/api/favorites', favorite)
      AppState.favorites = res.data
      logger.log('fff', res.data)
    } catch (error) {
      logger.error('Add favorite failed', error)

    }
  }
}
export const favoritesService = new FavoritesService()