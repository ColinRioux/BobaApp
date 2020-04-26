/**
 * Ba Web Frontend
 * 
 * @author Colin Rioux <crioux@scu.edu>
 * @author Horatio Xiao <hxiao@scu.edu>
 */

 import Vue from 'vue'
 import L from 'leaflet'
 import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
 import App from './App'
 import 'leaflet/dist/leaflet.css'

 delete L.Icon.Default.prototype._getIconUrl

 L.Icon.Default.mergeOptions({
     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
     iconUrl: require('leaflet/dist/images/marker-icon.png').default,
     shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
 })

Vue.component('l-map', LMap)
Vue.component('l-tilelayer', LTileLayer)
Vue.component('l-marker', LMarker)

 new Vue({
     el: '#app',
     render: h => h(App)
 })