import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import ReducerRegistry from './reducers/ReducerRegistry';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
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
