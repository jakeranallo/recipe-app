export interface Recipe {
  createdAt?: string
  description?: string
  difficulty?: string
  id: number
  imgOne?: string
  imgThree?: string
  imgTwo?: string
  title: string
  userId?: number
  user?: User
  results: Result[]
  ingredients: Ingredient[]
}

export interface Resource {
  id: number
  src: string
  stepId?: number
  step?: Step
  title: string
}

export interface Result {
  id: number
  img: string
  recipeId?: number
  userId?: number
  recipe?: Recipe
  user?: User
}

export interface Ingredient {
  amount?: string
  category?: string
  id: number
  name: string
  recipeId?: number
  recipe?: Recipe
}

export interface User {
  avatar?: string
  email: string
  userName: string
  id: number
  results: Result[]
  recipes: Recipe[]
}

export interface Step {
  description?: string
  duration?: number
  id: number
  recipeId?: number
  src?: string
  title: string
  recipe?: Recipe
  notify?: number
}