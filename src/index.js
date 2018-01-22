import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const app = <MuiThemeProvider>
                <App>

                </App>
            </MuiThemeProvider>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
