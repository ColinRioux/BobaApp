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
          <li class="item">test</li>
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
            // TODO
            // 1. Send query to SBE API with search word
            // 2. Parse responses
            axios.get(`http://127.0.0.1:3000/search/${query}`)
                .then((response) => {
                    this.results = response.data.result;

                    let x, t;
                    var rests = document.getElementsByClassName('rests')[0];
                    rests.style.display = 'block';
                    for (x in this.results) {
                        var li =document.createElement('li');
                        li.setAttribute('class','item');
                        li.setAttribute('v-on:click', 'restView(' +x+')');
                        console.log(x);
                        rests.appendChild(li);
                        var p = this.results[x];

                        li.innerHTML=li.innerHTML + p.name;
                    }
                    var search = document.getElementsByClassName('search')[0];
                        search.appendChild(rests);
                })



                      
            // 3. Append results in a "card" format to the .search div

            // 3.a. Could make a component for card or just manually do it, whichever is quicker
        },
        restView(index) {
            // TODO
            // Add redirect route for restaurant view
            this.$router.push()
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
</style>