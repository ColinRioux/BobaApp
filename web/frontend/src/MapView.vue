<template>
    <div id="app">
        <Map/>
    </div>
</template>

<script>
import Map from './components/Map'

export default {
    name: 'MapView',
    components: {
        Map
    },
    created () {
        document.title = 'The Social Boba Experience - Map'
    }
}
</script>

<style scoped>

</style>