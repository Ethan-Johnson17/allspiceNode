import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TriesService {
  async getTriesByAccount(accountId) {
    const tries = await dbContext.Try.find({ accountId }).populate('account game')
    return tries
  }

  async getById(id) {
    const oneTry = await dbContext.Try.findById(id).populate('recipe account')
    return oneTry
  }

  async create(body) {
    const oneTry = await dbContext.Try.create(body)
    // Need a populate here?
    return oneTry
  }

  async remove(tryId, userId) {
    const oneTry = await this.getById(tryId)
    if (oneTry.accountId.toString() !== userId) {
      throw new Forbidden('Access Denied')
    }
    await dbContext.Try.findByIdAndDelete(tryId)
  }
}
export const triesService = new TriesService()
