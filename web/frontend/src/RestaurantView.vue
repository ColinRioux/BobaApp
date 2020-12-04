<template>
    <div id="app">
        <RestaurantDisplay/>
    </div>
</template>

<script>
import Map from './components/Map'
import RestaurantDisplay from './components/RestaurantDisplay'

export default {
    name: 'RestaurantView',
    components: {
        Map,
        RestaurantDisplay
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
}
</script>

<style scoped>

</style>