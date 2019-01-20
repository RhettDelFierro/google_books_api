import axios from 'axios'
import {
  compose,
  curry,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  over,
  set,
  view
} from 'ramda'

import {
  either,
  fromNullable,
  left,
  liftA2,
  right
} from '../data'

// createAuthorQueryParam :: String -> QueryParam
function createAuthorQueryParam(authorURI) {
  return '+inauthor:' + authorURI
}

// generateQueryParams :: BaseURL -> String -> String -> Url
export function generateQueryParams(url, title, author) {
  if (!title && !author) return left('you must enter some search query')
  let authorURI = ''
  let titleURI = ''
  if (title) titleURI = encodeURIComponent(title)
  if (author) authorURI = createAuthorQueryParam(encodeURIComponent(author))

  return `${url}${titleURI || ''}${authorURI}`
}

export function extractAndSetItemQuery(paths){
  return (item) => {
    const obj = {}
    paths.forEach(path => {
      const p = (typeof path === 'string') ? [path] : path
      obj[path[path.length - 1]] = view(lensPath(path), item)
    })
    return obj
  }
}