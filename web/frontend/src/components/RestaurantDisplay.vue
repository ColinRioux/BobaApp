<template>
    <div class="restaurant-display">
        <div class="control-view">
            <div class="card-title">
                <b-button type="is-light" class="card-title-button" @click="goBack" title="Back...">
                    <b-icon pack="fas" icon="backspace"></b-icon>
                </b-button>
                <h1 class="title">{{ restaurant.name }}</h1>
            </div>
            <div class="card">
                <!-- TODO: Stickers -->
                <div class="stickers">
                    <b-icon pack="fas" icon="smile" class="is-small" title="Favorited"></b-icon>
                    <span>&nbsp;&nbsp;</span>
                    <b-icon pack="fas" icon="icicles" class="is-small" title="Iced Tea Options"></b-icon>
                    <span>&nbsp;&nbsp;</span>
                    <b-icon pack="fas" icon="seedling" class="is-small" title="Vegan Options"></b-icon>
                </div>
                <hr style="margin-bottom: 10px; margin-top: 10px;">
                <h5 class="title is-5">Address</h5>
                <p class="subtitle is-6">{{ restaurant.address }}</p>
                <h5 class="title is-5">Hours</h5>
                <p class="subtitle is-6">
                    <span v-for="hour in restaurant.hours" :key="hour">{{ hour }}<br/></span>
                </p>
                <h5 class="title is-5">Owner</h5>
                <p class="subtitle is-6 no-bottom">{{ restaurant.owner }}</p>
                <hr style="margin-bottom: 10px;">
                <b-button type="is-light" class="card-button" @click="toggleFeedback" title="Feedback">
                    <b-icon pack="fas" icon="comments"></b-icon>
                </b-button>
                <!-- TODO: If logged in, see bookmark/edit button -->
                <b-button type="is-light" class="card-button" @click="gotoBookmark" title="Bookmark">
                    <b-icon pack="fas" icon="bookmark"></b-icon>
                </b-button>
                <b-button type="is-light" class="card-button" @click="gotoSuggest" title="Suggest Edit">
                    <b-icon pack="fas" icon="pen-square"></b-icon>
                </b-button>
                <b-button type="is-light" class="card-button" @click="toggleMenu" title="Menu">
                    <b-icon pack="fas" icon="book-open"></b-icon>
                </b-button>
            </div>
        </div>
        <div class="menu-view">
            <div class="card-title">
                <b-button type="is-light" class="card-title-button" @click="closeMenu" title="Close">
                    <b-icon pack="fas" icon="times"></b-icon>
                </b-button>
                <h1 class="title" v-if="menuView">Menu</h1>
                <h1 class="title" v-else>Feedback</h1>
            </div>
            <div class="card">
                <div class="menu-card" v-if="menuView">
                    <h5 class="title is-5">Menu</h5>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div class="feedback-card" v-else>
                    <form ref="form" class="feedback-form" @submit.prevent="submitFeedback">
                        <br/>
                        <b-input 
                            class="feedback-input" 
                            v-model="feedbackTitle" 
                            minlength="5"
                            maxlength="20"
                            placeholder="Feedback Title"></b-input>
                        <b-input 
                            class="feedback-input" 
                            v-model="feedbackSummary" 
                            placeholder="Feedback Summary" 
                            minlength="10"
                            maxlength="200" 
                            type="textarea"></b-input>
                        <hr style="margin-bottom: 10px; margin-top: 10px; opacity: 0;">
                        <b-button type="is-light" class="card-button feedback-form-button" @click.prevent="submitFeedback" icon-left="arrow-circle-up">Submit</b-button>
                    </form>
                </div>
            </div>
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
            // Disable menu
            this.closeMenu();
            axios.get(`http://127.0.0.1:3000/restaurant/get/${lat}/${lng}`)
                .then((response) => {
                    if (!response.data.success) {
                        return;
                    }
                    this.restaurant = response.data.result;
                    this.restaurant.hours = this.restaurant.hours.split('\n');
                }); 
        },
        submitFeedback() {
            var body = {
                title: this.feedbackTitle,
                summary: this.feedbackSummary
            };

            // Example query url /feedback?lat=35&lng=30
            // This will be used when we ditch the menu bar feedback button in favor of a feedback link
            // on the boba restaurant card
            var lat = (this.$route.query.lat) ? this.$route.query.lat : 37.349667;
            var lng = (this.$route.query.lng) ? this.$route.query.lng : -121.9477423;

            // Must use arrow function in the "then" to inherit "this"
            axios.post(`http://127.0.0.1:3000/feedback/add/${lat}/${lng}`, body)
                .then(response => {
                    if (!response.data.success) {
                        // this.submissionResponse = "Your feedback failed to submit! Please try again later!";
                    } else {
                        alert("Successfully submitted your feedback!");
                        // this.exitView();
                    }
                });
        },
        gotoBookmark() {
            // TODO
        },
        gotoSuggest() {

        },
        toggleFeedback() {
            var menu = document.getElementsByClassName('menu-view')[0];
            if (this.feedbackView) {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
            this.feedbackView = !this.feedbackView;
            this.menuView = false;
        },
        toggleMenu() {
            var menu = document.getElementsByClassName('menu-view')[0];
            if (this.menuView) {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
            this.menuView = !this.menuView;
            this.feedbackView = false;
        },
        closeMenu() {
            document.getElementsByClassName('menu-view')[0].style.display = 'none';
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    watch: {
        '$route.query.lat'() {
            if (this.$route.query.lat && this.$route.query.lng) {
                this.getRestaurant(this.$route.query.lat, this.$route.query.lng);
            }
        },
        '$route.query.lng'() {
            if (this.$route.query.lat && this.$route.query.lng) {
                this.getRestaurant(this.$route.query.lat, this.$route.query.lng);
            }
        }
    },
    data() {
        return {
            restaurant: {},
            feedbackView: false,
            menuView: true
        }
    },
    mounted() {
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
    display: block;
}

.control-view {
    background-color: white;
    padding: 0.5em;
    border-radius: 10px;
    text-align: center;
    width: 25em;
    float: left;
}

.menu-view {
    background-color: white;
    padding: 0.5em;
    padding-left: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
    width: 25em;
    float: right;
    display: none;
    margin-top: 1em;
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

.stickers { 
    margin-left: 10px;
    margin-top: 10px;
    display: inline-block;
}

.stickers .is-small:hover {
    cursor: help;
}
</style>