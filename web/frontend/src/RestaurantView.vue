<template>
    <div id="app">
        <Map/>
        <!-- <SearchBar/> -->
    </div>
</template>

<script>
import Map from './components/Map'
// import SearchBar from './components/SearchBar'

export default {
    name: 'RestaurantView',
    components: {
        Map,
    },
    created () {
        document.title = 'The Social Boba Experience - Restaurant'
    }
}
</script>

<style scoped>

</style>