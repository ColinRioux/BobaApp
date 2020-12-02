<template>
    <div id="app">
        <RestaurantAddForm />
        <Map />
    </div>
</template>

<script>
import RestaurantAddForm from './components/RestaurantAddForm'
import Map from './components/Map'

export default {
    name: 'MapView',
    components: {
        RestaurantAddForm,
        Map
    },
    created () {
        document.title = 'The Social Boba Experience - Create Restaurant'
    }
}
</script>

<style scoped>

</style>