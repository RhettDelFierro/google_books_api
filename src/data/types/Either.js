class Left {
  constructor(val) {
    this._value = val
  }

  static of (x) {
    return new Left(x)
  }

  fmap   = () => this
  join  = () => this
  chain = () => this
  ap    = () => this
  return = () => this._value
}

class Right {
  constructor(val) { this._value = val }
  static of(x) {
    return new Right(x)
  }

  fmap(fn) {
    return new Right(fn(this._value))
  }

  join() {
    if ((this._value instanceof Left) || (this._value instanceof Right)) {
      return this._value;
    }
    return this;
  }

  chain(fn) {
    return fn(this._value)
  }

  ap(otherEither) {
    const functionToRun = otherEither._value;
    return this.map(functionToRun);
  }

  return() {
    return this._value
  }
}



export function left(x) {
  return Left.of(x);
}

export function right(x) {
  return Right.of(x);
}

export function either(leftFunc, rightFunc, e) {
  return (e instanceof Left)
    ? leftFunc(e.return())
    : rightFunc(e.return());
}

export function liftA2(func) {
  return function runApplicativeFunc(a, b) {
    return b.ap(a.map(func));
  };
}

