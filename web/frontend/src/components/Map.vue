<template>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      class="map">
      <l-tile-layer
        :url="url"
        :attribution="attribution" />
      <l-marker v-for="(loc, index) in nearbyLocations" :key="loc.id" :lat-lng="latLngToObject(loc.lat, loc.lng)" @click="restView(index)" class="boba-marker">
        <l-tooltip :options="{ interactive: true }">
          <div>
            {{ loc.name }}
          </div>
        </l-tooltip>
      </l-marker>
      <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
</template>

<script>
import axios from 'axios';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LControlZoom } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LControlZoom
  },
  data() {
    return {
      zoom: 16,
      center: latLng(37.349646, -121.9411762),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11.5,
      currentCenter: latLng(37.349646, -121.9411762),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false
      },
      showMap: true,
      lat: 37.349646,
      lng: -121.9411762,
      nearbyLocations: []
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    getLocation() {
      if (!navigator.geolocation) {
        console.log("W3C Geolocation not supported by your browser!");
        this.getNearbyRestaurants();
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.center = latLng(this.lat, this.lng);
        this.getNearbyRestaurants();
      }, (error) => {
        console.log("W3C Geolocation API unable to get your nearby location");
        this.getNearbyRestaurants();
      }, {
        maximumAge: 30000
      })
    },
    getNearbyRestaurants() {
      axios.get(`http://127.0.0.1:3000/search/${this.lat}/${this.lng}`)
        .then((response) => {
          if (!response.data.success) {
            return;
          }

          this.nearbyLocations = response.data.result;
          console.log(this.nearbyLocations);
        }); 
    },
    latLngToObject(lat, lng) {
      return latLng(lat, lng);
    },
    restView(index) {
      this.$router.push({ path: `/restaurant?id=${this.nearbyLocations[index].id}` });
    }
  }
};
</script>

<style scoped>
.map {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.boba-marker:hover {
  cursor: pointer;
}
</style>