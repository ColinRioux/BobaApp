<template>
    <div id="app">
        <Map/>
        <SearchBar/>
    </div>
</template>

<script>
import Map from './components/Map'
import SearchBar from './components/SearchBar'

export default {
    name: 'MapView',
    components: {
        Map,
        SearchBar
    },
    created () {
        document.title = 'The Social Boba Experience - Map'
    }
}
</script>

<style scoped>

</style>