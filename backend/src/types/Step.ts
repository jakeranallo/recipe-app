import { objectType } from '@nexus/schema'

export const Step = objectType({
  name: 'Step',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.duration()
    t.model.src()
    t.model.recipeId()
    t.model.recipe()
    t.model.notify()
    t.model.resources({
      pagination: false,
    })
  },
})