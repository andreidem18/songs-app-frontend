import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import "bootswatch/dist/cyborg/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Provider store={store}>
                <App />
            </Provider>
        </SkeletonTheme>
    </React.StrictMode>
);
