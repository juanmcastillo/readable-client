import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReducerRegistry from './reducers/ReducerRegistry';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(ReducerRegistry, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = <BrowserRouter>
                <Provider store={store}>
                    <MuiThemeProvider>
                        <App>

                        </App>
                    </MuiThemeProvider>
                </Provider>
            </BrowserRouter>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
