import React, {useState} from 'react'
import {generateQueryParams, makeQueryRequest} from '../helpers'
import {either} from '../data'
import {compose, curry} from 'ramda'

export const GoogleBooksApiContext = React.createContext('googleBooksApi')

const GoogleBooksApiProvider = (props) => {
  const [items, setItems] = useState()

  const state = {
    items,
    getItems: (errorHandleFunc) =>
      either(
        errorHandleFunc,
        makeQueryRequest
      ),
    setItems
  }

  return (
    <GoogleBooksApiContext.Provider value={state}>
      {props.children}
    </GoogleBooksApiContext.Provider>
  )
}

export default GoogleBooksApiProvider