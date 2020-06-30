import { objectType } from '@nexus/schema'

export const Ingredient = objectType({
  name: 'Ingredient',
  definition(t) {
    t.model.id()
    t.model.categoryId()
    t.model.category()
    t.model.name()
    t.model.amount()
  },
})