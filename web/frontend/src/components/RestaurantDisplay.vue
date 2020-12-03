<template>
    <div class="restaurant-display">
        <h1 class="title">{{ restaurant.name }}</h1>
        <div class="card">
            <!-- TODO: Stickers -->
            <h5 class="title is-5">Address</h5>
            <p class="subtitle is-6">{{ restaurant.address }}</p>
            <h5 class="title is-5">Hours</h5>
            <p class="subtitle is-6">
                <span v-for="hour in restaurant.hours" :key="hour">{{ hour }}<br/></span>
            </p>
            <h5 class="title is-5">Owner</h5>
            <p class="subtitle is-6">{{ restaurant.owner }}</p>
            <!-- TODO: Feedback Button -->
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'RestaurantDisplay',
    components: {},
    methods: {
        getRestaurant(lat, lng) {
            axios.get(`http://127.0.0.1:3000/restaurant/get/${lat}/${lng}`)
                .then((response) => {
                    if (!response.data.success) {
                        return;
                    }
                    this.restaurant = response.data.result;
                    this.restaurant.hours = this.restaurant.hours.split('\n');
                }); 
        }
    },
    data() {
        return {
            restaurant: {}
        }
    },
    created() {
        if (this.$route.query.lat && this.$route.query.lng) {
            this.getRestaurant(this.$route.query.lat, this.$route.query.lng);
        }
    }
}
</script>

<style scoped>
/*  TODO  */
/*  Fix results list to be displayed vertically
    Add a little styling to the results list
*/
.restaurant-display {
    z-index: 1000;
    position: absolute;
    top: 3.5em;
    left: 1em;
    background-color: white;
    padding: 0.5em;
    border-radius: 10px;
    width: 25%;
    text-align: center;
}

.card {
    padding: 0.25em;
    text-align: left;
    color: white;
    background-color: rgba(0, 128, 128, 0.6);
}

h1 {
    color: rgba(0, 128, 128, 1);
}

.card h5, .card p {
    color: white;
}

</style>