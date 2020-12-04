<template>
    <div id="app">
        <RestaurantAddForm />
    </div>
</template>

<script>
import RestaurantAddForm from './components/RestaurantAddForm'

export default {
    name: 'MapView',
    components: {
        RestaurantAddForm
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
}
</script>

<style scoped>

</style>