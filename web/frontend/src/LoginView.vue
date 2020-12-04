<template>
    <div id="app">
        <SearchBar />
        <LoginForm />
    </div>
</template>

<script>
import SearchBar from './components/SearchBar';
import LoginForm from "./components/LoginForm";

export default {
    name: "LoginView",
    components: {
        SearchBar,
        LoginForm
    },
    created() {
        document.title = "The Social Boba Experience";
    }
};
</script>

<style scoped>

</style>