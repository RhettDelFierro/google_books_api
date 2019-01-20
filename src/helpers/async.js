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

  return right(`${url}${titleURI || ''}${authorURI}`)
}

// makeQueryRequest :: Url -> Either String [Item]
export async function makeQueryRequest(url) {
    const response = await axios.get(url)
    console.log(response.data)
    return (response.data.error)
      ? left(`Error processing request: ${response.data.error.code} - ${response.data.error.message}`)
      : right(response.data.items)
}

// parseVolumeQuery :: [Item] -> Either String [Item]
export function parseVolumeQuery(items) {
  if (items.length > 0) return right(items)
  return left('no items found')
}