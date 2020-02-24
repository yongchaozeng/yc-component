import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';
import './assets/style/media-queries.scss';
import BasicRoute from './router';
import * as serviceWorker from './serviceWorker';
import './utils/rem';
import $msg from './utils/message';
import 'swiper/swiper.scss';
import $ from 'jquery'
import 'fullpage.js'

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    if (window.orientation === 180 || window.orientation === 0) {
    }

    if (window.orientation === 90 || window.orientation === -90) {
        $msg('竖屏体验更佳哦~');
    }
}, false);

$(function () {
    $('#fullpage').fullpage({
        normalScrollElements: '.rule-text'
    });
    $('#mFullpage').fullpage({
        normalScrollElements: '.m-rule-box .rule-text'
    });

    window.onresize = () => {
        $.fn.fullpage.destroy('all');
        $('#fullpage').fullpage({
            normalScrollElements: '.rule-text'
        });
        $('#mFullpage').fullpage({
            normalScrollElements: '.m-rule-box .rule-text'
        });
    }

});
ReactDOM.render(

    <Provider store={store}>
        <BasicRoute />
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
