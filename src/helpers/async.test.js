import { buildURL, makeUrl} from './async'

const QUERY_URL = `https://www.googleapis.com/books/v1/volumes?q=`
const VOLUME_ID_URL = `https://www.googleapis.com/books/v1/volumes/`

it('makeURL will make a url', () => {
  expect(makeUrl('TITLE')('AUTHOR')(QUERY_URL)).toBe('https://www.googleapis.com/books/v1/volumes?q=TITLE+inauthor:AUTHOR')
})
