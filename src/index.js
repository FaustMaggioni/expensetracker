import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from './context/context'
import {SpeechProvider} from '@speechly/react-client'



ReactDOM.render((
    <SpeechProvider appId='8d7d2588-0843-4f1b-a91b-be934241651f' language='en-US'>
    <Provider>
        <App/>
    </Provider>
    </SpeechProvider>
    ), 
document.getElementById('root'))