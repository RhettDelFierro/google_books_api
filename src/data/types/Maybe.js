class Maybe {
  static just(a) {
    return new Just(a)
  }

  static nothing() {
    return new Nothing()
  }

  static pure(a) {
    return Maybe.just(a)
  }

  get isNothing() {
    return false
  }

  get isJust() {
    return false
  }
}

class Just extends Maybe {
  constructor(value) {
    super()
    this._value = value
  }

  get val() {
    return this._value
  }

  fmap(f) {
    return fromNullable(f(this._value))
  }

  // f :: a -> Maybe b
  chain(f) {
    return f(this._value)
  }


  get isJust() {
    return true
  }
}

class Nothing extends Maybe {
  fmap(f) {
    return this
  }

  chain(f) {
    return this
  }

  get val() {
    throw new TypeError('Nothing type')
  }

  get isNothing() {
    return true
  }
}

export function fromNullable(val) {
  if (typeof val === 'object') {
    return Object.keys(val).length > 0 ? Maybe.just(val) : Maybe.nothing()
  }
  return val !== null &&
    val !== undefined &&
    Boolean(val) &&
    val.length > 0
      ? Maybe.just(val)
      : Maybe.nothing()
}