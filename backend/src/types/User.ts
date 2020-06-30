import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.userName()
    t.model.avatar()
    t.model.email()
    t.model.recipes({
      pagination: false,
    })
    t.model.results({
      pagination: false,
    })
  },
})