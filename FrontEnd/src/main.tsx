import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApolloProvider,ApolloClient,InMemoryCache} from "@apollo/client";


const client = new ApolloClient({
  uri:"http://127.0.0.1:9000/",
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
  </ApolloProvider>
)
