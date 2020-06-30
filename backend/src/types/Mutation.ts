import { intArg, mutationType, stringArg } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { APP_SECRET } from '../utils'

export const Mutation = mutationType({
  definition(t) {

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        userName: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { userName, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            userName,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.crud.createOneResult()

    t.field('createResult', {
      type: 'Result',
      args: {
        img: stringArg({ nullable: false }),
        recipeId: intArg(),
        userId: intArg(),
      },
      resolve: (_, { img, recipeId, userId }, ctx) => {
        return ctx.prisma.result.create({
          data: {
            img,
            recipe: {
              connect: { id: recipeId },
            },
            user: {
              connect: { id: userId },
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