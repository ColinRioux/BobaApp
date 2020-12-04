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
        <ul class="rests">
            <li v-for="(rest, index) in results" :key="rest.id" class="item" @click="viewRestaurant(index)">
                {{ rest.name }}
            <p v-for="rest in results" :key="rest.location" class="iteminfo">
                {{ rest.address }}
            </p></li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'SearchBar',
    components: {},
    methods: {
        search() {
            // Block queries of length 0
            if (this.searchQuery.length == 0) return;
            // console.log(this.searchQuery); // use this log if you want to see if the search is working
            var query = this.searchQuery;

            axios.get(`http://127.0.0.1:3000/search/${query}`)
                .then((response) => {
                    this.results = response.data.result;
                    document.getElementsByClassName('rests')[0].style.display = 'block';
                });      
        },
        viewRestaurant(index) {
            this.$router.push({ path: `/restaurant?lat=${this.results[index].lat}&lng=${this.results[index].lng}`});
        }
    },
    data() {
        return {
            searchQuery: "",
            submissionResponse: "",
            results: []
        }
    }
}
</script>

<style scoped>

.search {
    z-index: 1000;
    position: absolute;
    display: flex;
    flex-direction: column;
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

.rests {
    display: none;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.25em;
    padding-right: 0.25em;

}

.item {
    color: rgba(0, 128, 128, 1);
    background-color: rgba(0, 128, 128, 0.4);
    padding-top: 0.1em;
    padding-left: 0.5em;
    padding-bottom: 0.1em;
    padding-right: 0.25em;
    border-radius: 10px;
    display: inline-block;
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: larger;
}

.iteminfo {
    color: white;
    font-weight: normal;
    font-size: medium;
}

.item:hover {
    cursor: pointer;
}
</style>