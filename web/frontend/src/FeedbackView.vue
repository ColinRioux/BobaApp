<template>
    <div id="app">
        <FeedbackForm />
    </div>
</template>

<script>
import FeedbackForm from './components/FeedbackForm'

export default {
    name: 'MapView',
    components: {
        FeedbackForm
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
}
</script>

<style scoped>

</style>