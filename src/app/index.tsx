import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import stores from '~/stores';
import Home from '~/scenes/Home';
import GlobalStyles from '~/styles/globals';

const element = window.document.getElementById('react-page');

if (element) {
    const App = () => (
        <React.StrictMode>
            <Provider {...stores}>
                <GlobalStyles />
                <Home />
            </Provider>
        </React.StrictMode>
    );
    ReactDOM.render(<App />, element);
}
