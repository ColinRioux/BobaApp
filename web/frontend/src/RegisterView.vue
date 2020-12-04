<template>
    <div id="app">
        <RegisterForm class="Right_Half"></RegisterForm>
    </div>
</template>

<script>
import RegisterForm from './components/RegisterForm'

export default {
    name: 'RegisterView',
    components: {
        RegisterForm
    },
    created () {
        document.title = 'The Social Boba Experience - Register'
    }
};
</script>

<style scoped>

</style>