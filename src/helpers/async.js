import axios from 'axios'
import R from 'ramda'
const {
  compose,
  curry,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  over,
  set,
  view
} = R

import {
  either,
  fromNullable,
  left,
  liftA2,
  right
} from '../data'

const QUERY_URL = `https://www.googleapis.com/books/v1/volumes?q=`
const VOLUME_ID_URL = `https://www.googleapis.com/books/v1/volumes/`
export const buildURL = (baseUrl) => term => baseUrl + term

function generateSpecificIdUrl = id => VOLUME_ID_URL + id
function createAuthorQueryParam(authorURI) { return '+inauthor:' + authorURI }

function generateFieldsUrl(title, author, baseUrl) {
  if (!title && ! author) return left('you must enter some search query')
  let authorURI = ''
  let titleURI = ''
  if (title) titleURI = encodeURIComponent(title)
  if (author) authorURI = createAuthorQueryParam(encodeURIComponent(author))

  return right(`${baseUrl}${titleURI || ''}${authorURI}`
}

// this should be defined by the calling function:
function alertErrorMissingQueryParams(alertErrorFunc) {

}

async function makeQueryRequest(url){
  return await axios.get(url)
}

export const makeUrl = curry(generateFieldsUrl)
export const makeSafeIdUrl = compose(
  either(
    handleMissingQueryParams,
    makeQueryRequest
  ),
  generateFieldsUrl
)