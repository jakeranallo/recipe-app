import { nexusPrismaPlugin } from 'nexus-prisma'
import { intArg, makeSchema, objectType, stringArg } from '@nexus/schema'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.firstName()
    t.model.lastName()
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

const Recipe = objectType({
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
    t.model.ingredients({
      pagination: false,
    })
    t.model.results({
      pagination: false,
    })
  },
})

const Result = objectType({
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

const Resource = objectType({
  name: 'Resource',
  definition(t) {
    t.model.id()
    t.model.src()
    t.model.stepId()
    t.model.step()
    t.model.title()
  },
})

const Ingredient = objectType({
  name: 'Ingredient',
  definition(t) {
    t.model.id()
    t.model.category()
    t.model.name()
    t.model.amount()
    t.model.recipeId()
    t.model.recipe()
  },
})

const Step = objectType({
  name: 'Step',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.duration()
    t.model.src()
    t.model.recipeId()
    t.model.recipe()
  },
})


const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.recipe()
    t.crud.user()

    t.list.field('beginnerRecipes', {
      type: 'Recipe',
      resolve: (_, args, ctx) => {
        return ctx.prisma.recipe.findMany({
          where: { difficulty: "Beginner" },
        })
      },
    })

    t.list.field('allRecipes', {
      type: 'Recipe',
      resolve: (_, args, ctx) => {
        return ctx.prisma.recipe.findMany()
      },
    })
    
    t.list.field('allUsers', {
      type: 'User',
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findMany()
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

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.createOneRecipe()

    t.field('createRecipe', {
      type: 'Recipe',
      args: {
        title: stringArg({ nullable: false }),
        createdAt: stringArg(),
        userEmail: stringArg(),
        difficulty: stringArg(),
        description: stringArg(),
      },
      resolve: (_, { title, createdAt, difficulty, description, userEmail }, ctx) => {
        return ctx.prisma.recipe.create({
          data: {
            title,
            createdAt,
            description,
            difficulty,
            user: {
              connect: { email: userEmail },
            },
          },
        })
      },
    })

    t.field('updateRecipe', {
      type: 'Recipe',
      nullable: true,
      args: {
        id: intArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.recipe.update({
          where: { id: Number(id) },
          data: { ...ctx },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User, Recipe, Result, Resource, Step, Ingredient],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})