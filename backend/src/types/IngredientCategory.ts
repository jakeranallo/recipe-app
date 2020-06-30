import { objectType } from '@nexus/schema'

export const IngredientCategory = objectType({
  name: 'IngredientCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.recipeId()
    t.model.recipe()
    t.model.ingredients({
      pagination: false,
    })
  },
})