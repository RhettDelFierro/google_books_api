import React, {useState, useContext} from 'react'
import axios from 'axios'
import {ErrorContext} from '../contexts'
import {lensIndex, lensProp, lensPath, over, set, view,} from 'ramda'
import {TABLE_ITEMS} from '../constants'
import {extractAndSetTableItemQuery} from '../helpers'

export const GoogleBooksApiContext = React.createContext('googleBooksApi')

const GoogleBooksApiProvider = (props) => {
  const [items, setItems] = useState()
  const [tableItems, setTableItems] = useState()
  const [viewMoreModalTableItems, setViewMoreModalTableItems] = useState()
  const [viewMoreItems, setViewMoreItems] = useState()
  const {errors, setError, clearErrors} = useContext(ErrorContext)

  const state = {
    items,
    getItems: async (url) => {
      const response = await axios.get(url)
      if (response.error) return setError({...errors, apiErrorMessage: response.error.message})

      clearErrors()
      const {items} = response.data
      if (items && items.length > 0) {
        setItems(items)
        setTableItems(items.map(extractAndSetTableItemQuery(TABLE_ITEMS)))
      }
      else {
        setError({...errors, noResults: 'No results were found for your query.'})
        setItems([])
        setTableItems([])
      }
    },
    getViewMoreTableItems: async ({category}) => {
      const response = await axios.get(url)
      if (response.error) return setError({...errors, apiErrorMessage: response.error.message})

      clearErrors()
      const {items} = response.data
      if (items && items.length > 0) {
        setItems(items)
        setTableItems(items.map(extractAndSetTableItemQuery(TABLE_ITEMS)))
      }
      else {
        setError({...errors, noResults: 'No results were found for your query.'})
        setItems([])
        setTableItems([])
      }
    },
    setItems,
    setTableItems,
    tableItems,
  }

  return (
    <GoogleBooksApiContext.Provider value={state}>
      {props.children}
    </GoogleBooksApiContext.Provider>
  )
}

export default GoogleBooksApiProvider