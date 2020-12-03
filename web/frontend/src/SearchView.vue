<template>
    <div id="app">
        <SearchBar/>
    </div>
</template>

<script>
import SearchBar from './components/SearchBar'

export default {
    name: 'SearchView',
    components: {
        SearchBar
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
}
</script>

<style scoped>

</style>