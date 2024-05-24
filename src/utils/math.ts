import { evaluate as mathEval } from 'mathjs'

const evaluate = (input: string) => {
  try {
    const value = mathEval(input)
    return value
  } catch (error) {
    return null
  }
}

export { evaluate }
