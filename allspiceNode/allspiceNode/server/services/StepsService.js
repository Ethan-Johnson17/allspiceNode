import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class StepsService {
  async getAll(query) {
    const steps = await dbContext.Step.find(query)
    return steps
  }

  async getById(id) {
    const step = await dbContext.Step.findById(id).populate('account recipe')
    if (!step) {
      throw new BadRequest('Whatchu talkin bout Willis?')
    }
    return step
  }

  async create(body) {
    const step = await dbContext.Step.create(body)
    return step.populate('account recipe')
  }

  async edit(body) {
    const step = await this.getById(body.id)
    if (step.creatorId.toString() !== body.creatorId) {
      throw new Forbidden("Play nice, that's not yours.")
    }
    const myStep = await dbContext.Step.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return myStep
  }

  async delete(stepId, userId) {
    const step = await this.getById(stepId)
    if (step.creatorId.toString() !== userId) {
      throw new Forbidden("Play nice, that's not yours.")
    }
    await dbContext.Step.findByIdAndDelete(stepId)
  }
}
export const stepsService = new StepsService()
