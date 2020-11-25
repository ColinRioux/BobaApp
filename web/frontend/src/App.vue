<template>
    <div id="app">
        <MenuBar/>
        <router-view/>
    </div>
</template>

<script>
import MenuBar from './components/MenuBar'

export default {
    name: 'App',
    components: {
        MenuBar
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