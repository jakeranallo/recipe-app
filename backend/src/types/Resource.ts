import { objectType } from '@nexus/schema'

export const Resource = objectType({
  name: 'Resource',
  definition(t) {
    t.model.id()
    t.model.src()
    t.model.stepId()
    t.model.step()
    t.model.title()
  },
})