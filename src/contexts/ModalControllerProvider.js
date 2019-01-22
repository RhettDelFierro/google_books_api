import React, {useState} from 'react'

export const ErrorContext = React.createContext('error')

const ModalControllerProvider = (props) => {
  const modalsInitial = {
    queryErrorModal: false,
    viewMoreResultsModal: false
  }
  const [modals, setModals] = useState(modalsInitial)

  const state = {
    modals,
    clearModals: setModals(modalsInitial),

    setError
  }

  return (
    <ErrorContext.Provider value={state}>
      {props.children}
    </ErrorContext.Provider>
  )
}

export default ModalControllerProvider