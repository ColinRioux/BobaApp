<template>
    <div id="app">
        <MenuBar/>
        <Map/>
        <router-view/>
    </div>
</template>

<script>
import MenuBar from './components/MenuBar'
import Map from './components/Map'

export default {
    name: 'App',
    components: {
        MenuBar,
        Map
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
}
</script>

<style>
#app {
    text-align: center;
    color: blue;
    padding: 0 !important;
    height: 100%;
    position: relative;
}
html, body {
    margin: 0 !important;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
}
</style>