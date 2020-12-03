<template>
    <div class="add-restaurant">
        <form ref="form" class="add-restaurant-form" @submit.prevent="submit">
            <b-field class="add-restaurant-field" label="Name">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="name" 
                    minlength="2"
                    maxlength="20"
                    placeholder="Restaurant Name"></b-input>
            </b-field>
            <b-field class="add-restaurant-field" label="Latitude">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="lat" 
                    placeholder="Latitude"></b-input>
            </b-field>
            <b-field class="add-restaurant-field" label="Longitude">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="lng" 
                    placeholder="Restaurant Name"></b-input>
            </b-field>
            <b-field class="add-restaurant-field" label="Address">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="address" 
                    placeholder="Restaurant Address" 
                    minlength="10"
                    maxlength="200"></b-input>
            </b-field>
            <b-field class="add-restaurant-field" label="Hours">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="hours" 
                    placeholder="Restaurant Hours" 
                    minlength="10"
                    maxlength="200" 
                    type="textarea"></b-input>
            </b-field>
            <b-field class="add-restaurant-field" label="Owner">
                <b-input 
                    class="add-restaurant-input" 
                    v-model="owner" 
                    placeholder="Owner" 
                    minlength="5"
                    maxlength="20"></b-input>
            </b-field>
            <b-button class="button" type="is-success" @click.prevent="submit">Submit</b-button>
            <b-button class="button" type="is-danger is-light" @click="exitView">Back</b-button>
            <p class="submission-response">{{ submissionResponse }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RestaurantAddForm',
    components: {},
    methods: {
        submit() {
            var body = {
                name: this.name,
                address: this.address,
                hours: this.hours,
                owner: this.owner
            };

            // Must use arrow function in the "then" to inherit "this"
            axios.post(`http://127.0.0.1:3000/restaurant/add/${this.lat}/${this.lng}`, body)
                .then(response => {
                    if (!response.data.success) {
                        this.submissionResponse = "Your request failed to submit! Please try again later!";
                    } else {
                        alert("Successfully Submitted your restaurant!");
                        this.exitView();
                    }
                });
        },
        exitView() {
            this.$router.go(-1);
        }
    },
    data() {
        return {
            name: "",
            address: "",
            lat: 0,
            lng: 0,
            hours: "",
            owner: "",
            submissionResponse: ""
        }
    }
}
</script>

<style scoped>
.add-restaurant {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(165, 161, 161, 0.8);
    height: 100%;
}

.add-restaurant-form {
    margin-top: 3.5em;
    margin-left: 1em;
    padding-right: 1em;
}

.add-restaurant-field, .add-restaurant-field {
    text-align: left;
}

.submission-response {
    color: red;
}
</style>