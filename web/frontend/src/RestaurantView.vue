<template>
    <div id="app">
        <Map/>
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
        document.title = 'The Social Boba Experience - Restaurant'
    }
}
</script>

<style scoped>

</style>