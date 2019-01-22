import React, {useState} from 'react'

export const ErrorContext = React.createContext('error')

const ErrorProvider = (props) => {
  const errorInitial = {
    noResults: '',
    apiErrorMessage: ''
  }
  const [errors, setError] = useState({})

  const state = {
    errors,
    clearError: (error) => setError(errorInitial),
    clearErrors: () => setError(errorInitial),
    setError
  }

  return (
    <ErrorContext.Provider value={state}>
      {props.children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider