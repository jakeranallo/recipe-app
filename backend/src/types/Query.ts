import { intArg, queryType, stringArg } from '@nexus/schema'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.crud.recipe()
    t.crud.user()

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findOne({
          where: {
            id: Number(userId),
          },
        })
      },
    })

    t.list.field('difficultyFeed', {
      type: 'Recipe',
      args: {
        filter: stringArg({ nullable: true }),
      },
      resolve: (_, { filter }, ctx) => {
        return ctx.prisma.recipe.findMany({
          where: { difficulty: { contains: filter } },
        })
      },
    })

    t.list.field('singleRecipe', {
      type: 'Recipe',
      args: {
        recipeId: intArg({ nullable: true }),
      },
      resolve: (_, { recipeId }, ctx) => {
        return ctx.prisma.recipe.findMany({
          where: { id: { equals: recipeId } },
        })
      },
    })

    t.list.field('allUsers', {
      type: 'User',
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findMany()
      },
    })

    t.list.field('singleUser', {
      type: 'User',
      args: {
        userId: intArg({ nullable: true }),
      },
      resolve: (_, { userId }, ctx) => {
        return ctx.prisma.user.findMany({
          where: { id: { equals: userId } },
        })
      },
    })

    t.list.field('searchRecipes', {
      type: 'Recipe',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.recipe.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { description: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})