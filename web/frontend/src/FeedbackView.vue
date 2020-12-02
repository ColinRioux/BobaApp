<template>
    <div id="app">
        <FeedbackForm />
        <Map />
    </div>
</template>

<script>
import FeedbackForm from './components/FeedbackForm'
import Map from './components/Map'

export default {
    name: 'MapView',
    components: {
        FeedbackForm,
        Map
    },
    created () {
        document.title = 'The Social Boba Experience - Feedback'
    }
}
</script>

<style scoped>

</style>