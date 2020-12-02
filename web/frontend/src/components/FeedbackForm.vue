<template>
    <div class="feedback" @click="exitView">
        <form ref="form" class="feedback-form" @submit.prevent="submitFeedback">
            <b-field class="feedback-title-field" label="Title">
                <b-input 
                    class="feedback-title-input" 
                    v-model="feedbackTitle" 
                    minlength="5"
                    maxlength="20"
                    placeholder="Feedback Title"></b-input>
            </b-field>
            <b-field class="feedback-summary-field" label="Summary">
                <b-input 
                    class="feedback-summary-input" 
                    v-model="feedbackSummary" 
                    placeholder="Feedback Summary" 
                    minlength="10"
                    maxlength="200" 
                    type="textarea"></b-input>
            </b-field>
            <b-button class="button" type="is-success" @click.prevent="submitFeedback">Submit</b-button>
            <b-button class="button" type="is-danger is-light" @click="exitView">Back</b-button>
            <p class="submission-response">{{ submissionResponse }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FeedbackForm',
    components: {},
    methods: {
        submitFeedback() {
            var body = {
                title: this.feedbackTitle,
                summary: this.feedbackSummary
            };

            // Example query url /feedback?lat=35&lng=30
            // This will be used when we ditch the menu bar feedback button in favor of a feedback link
            // on the boba restaurant card
            var lat = (this.$route.query.lat) ? this.$route.query.lat : 35;
            var lng = (this.$route.query.lng) ? this.$route.query.lng : 30;

            // Must use arrow function in the "then" to inherit "this"
            axios.post(`http://127.0.0.1:3000/feedback/add/${lat}/${lng}`, body)
                .then(response => {
                    if (!response.data.success) {
                        this.submissionResponse = "Your feedback failed to submit! Please try again later!";
                    } else {
                        alert("Successfully Submitted your feedback!");
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
            feedbackTitle: "",
            feedbackSummary: "",
            submissionResponse: ""
        }
    }
}
</script>

<style scoped>
.feedback {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(165, 161, 161, 0.8);
    height: 100%;
}

.feedback-form {
    margin-top: 3.5em;
    margin-left: 1em;
    padding-right: 1em;
}

.feedback-title-field, .feedback-summary-field {
    text-align: left;
}

.submission-response {
    color: red;
}
</style>