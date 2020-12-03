/**
 * Ba Web Frontend
 * 
 * @author Colin Rioux <crioux@scu.edu>
 * @author Horatio Xiao <hxiao@scu.edu>
 */

import Vue from 'vue';

// Map
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

Vue.component('l-map', LMap);
Vue.component('l-tilelayer', LTileLayer);
Vue.component('l-marker', LMarker);

// Buefy (styling assets) & Font Awesome
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
    customIconPacks: {
        fas: {
            sizes: {
                default: "lg",
                "is-small": "1x",
                "is-medium": "2x",
                "is-large": "3x"
            },
            iconPrefix: ""
        }
    }
});

// Router
import VueRouter from 'vue-router';
import App from './App';
import MapView from './MapView';
import LoginView from './LoginView';
import FeedbackView from './FeedbackView';
import RestaurantAddView from './RestaurantAddView';
import RestaurantView from './RestaurantView';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: MapView },
        { path: '/login', component: LoginView },
        { path: '/feedback', component: FeedbackView },
        { path: '/add-restaurant', component: RestaurantAddView },
        { path: '/restaurant', component: RestaurantView }
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    components: { App }
});