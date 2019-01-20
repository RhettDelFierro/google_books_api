import React, {useState, useContext} from 'react'
import axios from 'axios'
import {ErrorContext} from '../contexts'
import {lensIndex, lensProp, lensPath, over, set, view,} from 'ramda'
import {extractAndSetItemQuery} from '../helpers'
export const GoogleBooksApiContext = React.createContext('googleBooksApi')

const GoogleBooksApiProvider = (props) => {
  const [items, setItems] = useState()
  const {errors, setError} = useContext(ErrorContext)

  const state = {
    items,
    getItems: async (url) => {
      const response = await axios.get(url)
      if (response.error) return setError([...errors, response.error.message])
      const items = response.data.items

      setItems(response.data.items)
    },
    setItems
  }

  return (
    <GoogleBooksApiContext.Provider value={state}>
      {props.children}
    </GoogleBooksApiContext.Provider>
  )
}

export default GoogleBooksApiProvider