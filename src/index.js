import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const app = <BrowserRouter>
                <MuiThemeProvider>
                    <App>

                    </App>
                </MuiThemeProvider>
            </BrowserRouter>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
