import React, {useContext} from 'react';
import {GoogleBooksApiProvider} from './contexts'
import {Body} from './components'

function AppProviders({children}) {
  return (
    <GoogleBooksApiProvider>
      {children}
    </GoogleBooksApiProvider>
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
