<template>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      class="map"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
      <l-control-zoom position="bottomright"></l-control-zoom>
    </l-map>
</template>

<script>
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
      zoom: 13,
      center: latLng(37.3382, -121.8863),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(37.3382, -121.8863),
      withTooltip: latLng(37.3382, -121.8863),
      currentZoom: 11.5,
      currentCenter: latLng(37.3382, -121.8863),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false
      },
      showMap: true
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
    innerClick() {
      alert("Click!");
    },
    getLocation() {
      if (!navigator.geolocation) {
        console.log("W3C Geolocation not supported by your browser!");
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        this.center = latLng(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        console.log("W3C Geolocation API unable to get your nearby location");
      }, {
        maximumAge: 30000
      })
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
</style>