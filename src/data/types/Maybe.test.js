import {fromNullable} from './Maybe'

it('fromNullable will return a Just type', () => {
  expect(fromNullable('a').val).toBe('a')
})

it('fromNullable will state it\' a Nothing type for an empty array', () => {
  expect(fromNullable([]).isNothing).toBe(true)
})

it('fromNullable will state it\' a Nothing type for an empty object', () => {
  expect(
    fromNullable({})
      .isNothing
  ).toBe(true)
})

it('Maybe will map a function over it\'s data structure', () => {
  expect(
    fromNullable('blah')
      .fmap((x) => x + ' haha')
      .val
  ).toBe('blah haha')
})

it('Maybe will chain a function if Just type', () => {
  expect(
    fromNullable('blah')
      .chain((x) => fromNullable(x + ' haha'))
      .val
  ).toBe('blah haha')
})

it('Maybe will not map a function over it\'s data structure if it is Nothing', () => {
  expect(
    fromNullable([])
      .fmap((x) => x.length)
      .isNothing
  ).toBe(true)
})

it('Maybe will not chain a function over it\'s data structure if it is Nothing', () => {
  expect(
    fromNullable([])
      .chain((x) => fromNullable((x) => x.length  + 1))
      .isNothing
  ).toBe(true)
})

