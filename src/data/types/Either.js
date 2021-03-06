import {curry} from 'ramda'
class Left {
  constructor(val) {
    this._value = val
  }

  static pure (x) {
    return new Left(x)
  }

  fmap   = () => this
  join  = () => this
  chain = () => this
  ap    = () => this
  val = () => this._value
  get isLeft() {
    return true
  }

  get isRight() {
    return false
  }
}

class Right {
  constructor(val) { this._value = val }
  static pure(x) {
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

  val() {
    return this._value
  }

  get isLeft() {
    return false
  }

  get isRight() {
    return true
  }
}


export function left(x) {
  return Left.pure(x);
}

export function right(x) {
  return Right.pure(x);
}

function eitherFull(leftFunc, rightFunc, e) {
    return (e.isLeft)
      ? leftFunc(e.val())
      : rightFunc(e.val());
}

export const either = curry(eitherFull)

export function liftA2(func) {
  return function runApplicativeFunc(a, b) {
    return b.ap(a.map(func));
  };
}

