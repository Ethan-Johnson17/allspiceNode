import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


  async getFavorites(query = '') {
    const res = await api.get(query)
    AppState.favorites = res.data
    logger.log('service', res.data)
  }

  async removeFavorite(id) {
    try {
      const res = await api.delete('account/favorites/' + id)
      AppState.favorites = AppState.favorites.filter(r => r.id !== id)
    } catch (error) {
      logger.error('Remove favorite failed', error)
    }
  }
}

export const accountService = new AccountService()
