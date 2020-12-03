<template>
    <div class="restaurant-display">
        <div class="card-title">
            <b-button type="is-light" class="card-title-button" @click="goBack">
                <b-icon pack="fas" icon="backspace"></b-icon>
            </b-button>
            <h1 class="title">{{ restaurant.name }}</h1>
        </div>
        <div class="card">
            <!-- TODO: Stickers -->
            <h5 class="title is-5">Address</h5>
            <p class="subtitle is-6">{{ restaurant.address }}</p>
            <h5 class="title is-5">Hours</h5>
            <p class="subtitle is-6">
                <span v-for="hour in restaurant.hours" :key="hour">{{ hour }}<br/></span>
            </p>
            <h5 class="title is-5">Owner</h5>
            <p class="subtitle is-6 no-bottom">{{ restaurant.owner }}</p>
            <hr style="margin-bottom: 10px;">
            <b-button type="is-light" class="card-button" @click="gotoFeedback">
                <b-icon pack="fas" icon="comments"></b-icon>
            </b-button>
            <!-- TODO: If logged in, see bookmark button -->
            <b-button type="is-light" class="card-button" @click="gotoBookmark">
                <b-icon pack="fas" icon="bookmark"></b-icon>
            </b-button>
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
        },
        gotoFeedback() {
            this.$router.push({ path: `/feedback?lat=${this.restaurant.lat}&lng=${this.restaurant.lng}`})
        },
        gotoBookmark() {
            // TODO
        },
        goBack() {
            this.$router.go(-1);
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

.card-title {
    display: block;
    padding-bottom: 10px;
}

.card-title-button {
    float: left;
    background-color: rgba(0, 128, 128, 0.6);
    color: white;
}

h1 {
    color: rgba(0, 128, 128, 1);
    padding-right: 1em;
}

.card h5, .card p {
    color: white;
}

.card-button {
    background-color: rgba(0, 94, 94, 0.6);
    color: white;
}

.no-bottom {
    padding-bottom: 0px !important;
    margin-bottom: 5px;
}

.is-6 {
    padding-bottom: 10px;
}
</style>