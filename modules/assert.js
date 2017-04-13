import inspect from 'object-inspect'

const formatString = (string, args) => {
  let index = 0
  return string.replace(/%s/g, () => inspect(args[index++]))
}

const assert = (condition, createMessage, ...extraArgs) => {
  if (condition)
    return

  const message = (typeof createMessage === 'string')
    ? formatString(createMessage, extraArgs)
    : createMessage(extraArgs)

  throw new Error(message)
}

const ANY = { inspect() { return 'ANY' }, toString() { return 'ANY' } }
if (Object.defineProperty) { Object.defineProperty(ANY, 'inspect', { enumerable: false }) }
if (Object.defineProperty) { Object.defineProperty(ANY, 'toString', { enumerable: false }) }
if (Object.setPrototypeOf) { Object.setPrototypeOf(ANY, null) }
if (Object.freeze) { Object.freeze(ANY) }
export { ANY }

export default assert
