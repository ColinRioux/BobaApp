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
            <li v-for="(rest, index) in results" :key="rest.id" class="item" @click="restView(index)">
                {{ rest.name }}
            </li>
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
        restView(index) {
            // TODO
            // Add redirect route for restaurant view
            console.log(index);
            // this.$router.push({ path: `/restaurant?id=${this.results[index]}`});
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
/*  TODO  */
/*  Fix results list to be displayed vertically
    Add a little styling to the results list
*/
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

.rests {
    display: none;
}

.item:hover {
    cursor: pointer;
}
</style>