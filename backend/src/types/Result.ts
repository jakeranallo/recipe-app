import { objectType } from '@nexus/schema'

export const Result = objectType({
  name: 'Result',
  definition(t) {
    t.model.id()
    t.model.img()
    t.model.recipeId()
    t.model.recipe()
    t.model.userId()
    t.model.user()
  },
})