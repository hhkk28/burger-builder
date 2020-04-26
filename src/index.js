import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const appRouter = (
    <Provider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(appRouter, document.getElementById('root'));
registerServiceWorker();
