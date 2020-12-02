<template>
    <div class="search">
        <form ref="form" class="search-form" @submit.prevent="search">
            <b-field class="search-bar">
                <b-input class="search-bar-input" v-model="searchQuery" placeholder="Search" rounded></b-input>
            </b-field>
            <b-button class="button" type="is-text" @click.prevent="search">
                <b-icon pack="fas" icon="search"></b-icon>
            </b-button>
        </form>
    </div>
</template>

<script src ="https://unpkg.com/axios/dist/axios.min.js">
// Axios added via CDN
// TODO
// Add Axios to package manager

import axios from 'axios';

const BASE_URL = 'https://localhost:3000';

export default {
    name: 'SearchBar',
    components: {},
    methods: {
        search() {
            // Block queries of length 0
            if (this.searchQuery.length == 0) return;
            // console.log(this.searchQuery); // use this log if you want to see if the search is working
            // TODO
            // 1. Send query to SBE API with search word
            // 2. Parse responses
            axios
                .get('$(BASE_URL)/search/' + this.searchQuery)
                .then((response) => {this.restaurants = response.results})
                .catch(function (error) {
                    console.log(error);
                })

            if (this.restaurants.length == 0) {

            }
            // 3. Append results in a "card" format to the .search div
            // 3.a. Could make a component for card or just manually do it, whichever is quicker
        }
    },
    data() {
        return {
            searchQuery: ""
        }
    }
}
</script>

<style scoped>
.search {
    z-index: 1000;
    position: absolute;
    display: flex;
    top: 3.5em;
    left: 1em;
    background-color: white;
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-bottom: 0.1em;
    padding-right: 0.25em;
    border-radius: 10px;
}

.search-form {
    display: flex;
}

.search-bar {
    width: 20em;
}

.button {
    color: gray;
}

.button:hover {
    background: none;
}
</style>