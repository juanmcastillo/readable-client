import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReducerRegistry from './reducers/ReducerRegistry';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/App.css';

const middlewares = compose(applyMiddleware(thunk), 
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(ReducerRegistry,  middlewares);

const app = <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider>
                        <App />

                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider> ;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
