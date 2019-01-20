import React, {useState} from 'react'

export const ErrorContext = React.createContext('error')

const ErrorProvider = (props) => {
  const [errors, setError] = useState([])

  const state = {
    errors,
    clearError: (error) => setError(errors.filter(err => err !== error)),
    clearErrors: () => setError([]),
    setError
  }

  return (
    <ErrorContext.Provider value={state}>
      {props.children}
    </ErrorContext.Provider>
  )
}

export default ErrorProvider