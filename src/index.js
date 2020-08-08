import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppContainer} from "react-hot-loader";

// global.FORM_URL = "/#test"
// global.LOCAL = "en"
// global.JSON_LOCATION = "/quiz"

window.RenderApp  = (outside) => {
    ReactDOM.render(
        // Wrap App inside AppContainer
        <AppContainer>
            <App config={outside}/>
        </AppContainer>,
        document.getElementById('root')
    );
};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// window.RenderApp({
//     FORM_URL:"/#test",
//     LOCAL:"en",
//     JSON_LOCATION:"/quiz"
// })

// if (module.hot) {
//     module.hot.accept('./App', () => {
//         window.RenderApp({
//             FORM_URL:"/#test",
//             LOCAL:"en",
//             JSON_LOCATION:"/quiz"
//         })
//     });
// }
