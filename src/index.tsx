import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

// Should be imported before first access to the reducers
import store from './store'

// Import components
import { App } from './components/App'

// Import main css
import './index.css'

const containerRoot = document.getElementById('react-root')!
const root = createRoot(containerRoot)

root.render(
  <Provider store={store}>
    <App>
    </App>
  </Provider>
)
