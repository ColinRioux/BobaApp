<template>
    <div id="app">
        <TestTemplate/>
    </div>
</template>

<script>
import TestTemplate from './components/TestTemplate'

export default {
    name: 'App',
    components: {
        TestTemplate
    }
}
</script>

<style>
#app {
    text-align: center;
    color: blue;
    margin-top: 5em;
}
</style>