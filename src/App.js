import React, {useContext} from 'react';
import {ErrorProvider, GoogleBooksApiProvider, ModalControllerProvider} from './contexts'
import {QueryErrorModal, Body, ViewMoreResultsModal} from './components'

function AppProviders({children}) {
  return (
    <ErrorProvider>
      <GoogleBooksApiProvider>
        <ModalControllerProvider>
          {children}
        </ModalControllerProvider>
      </GoogleBooksApiProvider>
    </ErrorProvider>
  )
}

const App = () => {
  return (
    <AppProviders>
      <QueryErrorModal/>
      <ViewMoreResultsModal/>
      <Body/>
    </AppProviders>
  )
}

export default App;
