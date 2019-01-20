import React, {useContext} from 'react';
import {ErrorProvider, GoogleBooksApiProvider} from './contexts'
import {Body} from './components'

function AppProviders({children}) {
  return (
    <ErrorProvider>
      <GoogleBooksApiProvider>
        {children}
      </GoogleBooksApiProvider>
    </ErrorProvider>
  )
}

const App = () => {
  return (
    <AppProviders>
      <Body/>
    </AppProviders>
  )
}

export default App;
