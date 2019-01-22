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

// createAuthorQueryParam :: String -> QueryParam
function createAuthorQueryParam(authorURI) {
  return '+inauthor:' + authorURI
}

// createAuthorQueryParam :: String -> QueryParam
function createCategoryQueryParam(authorURI) {
  return '+subject:' + authorURI
}

// generateQueryParams :: BaseURL -> String -> String -> Url
export function generateQueryParams(url, title, author, category) {
  if (!title && !author) return 'you must enter some search query'
  let authorURI = ''
  let titleURI = ''
  if (title) titleURI = encodeURIComponent(title)
  if (author) authorURI = createAuthorQueryParam(encodeURIComponent(author))
  if (category) authorURI = createCategoryQueryParam(encodeURIComponent(category))

  return `${url}${titleURI}${authorURI}&maxResults=40`
}

export function extractAndSetTableItemQuery(paths){
  // TODO: This should also handle duplicates
  return (item) => {
    const obj = {}
    paths.forEach(path => {
      const p = (typeof path === 'string') ? [path] : path
      if (p === 'id') obj['key'] = view(lensPath('id'), item)
      else obj[path[path.length - 1]] = view(lensPath(path), item)
    })
    return obj
  }
}