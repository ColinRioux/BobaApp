<template>
    <div id="app">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from "./components/LoginForm";

export default {
    name: "LoginView",
    components: {
        LoginForm,
    },
    created() {
        document.title = "The Social Boba Experience";
    }
};
</script>

<style scoped>

</style>