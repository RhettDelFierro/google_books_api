import {left, either, liftA2, right, } from './Either'

const testAddOne = val => val + 1
const wrapLeftFunction = val => left(testAddOne(val))
const wrapLeftErrorStringFunction = val => left('errorString')
const wrapRightFunction = val => right(testAddOne(val))
it('Left.val() - will have Left._value', () => {
  expect(
    left('foo')
      .val()
  )
  .toBe('foo')
})

it('Left.fmap(testAddOne) - will do nothing', () => {
  expect(
    left(0)
      .fmap(testAddOne)
      .val()
  ).toBe(0)
})

it('Left.join() - will do nothing', () => {
  expect(
    left(0)
      .fmap((x) => left('x'))
      .join()
      .val()
  ).toBe(0)
})

it('Left.chain() - will do nothing', () => {
  expect(
    left(0)
      .chain(wrapLeftFunction)
      .val()
  ).toBe(0)
})



it('Right.val() - will have Right._value', () => {
  expect(
    right('foo')
      .val()
  )
    .toBe('foo')
})

it('Right.fmap(testAddOne) - will add one', () => {
  expect(
    right(0)
      .fmap(testAddOne)
      .val()
  ).toBe(1)
})

it('Right.fmap() will nest', () => {
  expect(
    right(0)
      .fmap(wrapRightFunction)
      .val()
  ).not.toBe(1)
})


it('Right.join() with a left - will short circuit the calculation', () => {
  expect(
    right(0)
      .fmap(wrapLeftErrorStringFunction)
      .join()
      .val()
  ).toBe('errorString')
})

it('Right.chain() - will do nothing', () => {
  expect(
    right(0)
      .chain(wrapLeftErrorStringFunction)
      .val()
  ).toBe('errorString')
})

it('either() will return a left applied function', () => {
  expect(either((x) => x + 1, (x) => x + 2, left(0))).toBe(1)
})

it('either() will return a right applied function', () => {
  expect(either((x) => x + 1, (x) => x + 2, right(0))).toBe(2)
})