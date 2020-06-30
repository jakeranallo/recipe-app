import { objectType } from '@nexus/schema'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.createdAt()
    t.model.difficulty()
    t.model.imgOne()
    t.model.imgTwo()
    t.model.imgThree()
    t.model.userId()
    t.model.user()
    t.model.ingredientCategories({
      pagination: false,
    })
    t.model.results({
      pagination: false,
    })
    t.model.steps({
      pagination: false,
    })
  },
})