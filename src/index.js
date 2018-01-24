import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReducerRegistry from './reducers/ReducerRegistry';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/App.css';

const store = createStore(ReducerRegistry, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider>
                        <App />

                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider> ;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
