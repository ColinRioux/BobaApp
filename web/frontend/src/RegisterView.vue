<template>
    <div id="app">
        <SearchBar />
        <RegisterForm />
    </div>
</template>

<script>
import SearchBar from './components/SearchBar';
import RegisterForm from './components/RegisterForm'

export default {
    name: 'RegisterView',
    components: {
        SearchBar,
        RegisterForm
    },
    created () {
        document.title = 'The Social Boba Experience'
    }
};
</script>

<style scoped>

</style>