<template>
    <div id="app">
        <RegisterForm class="Right_Half"></RegisterForm>
        <!-- <SearchBar class="Left_Half"></SearchBar> -->
        <Map class="Left_Half"></Map>
    </div>
</template>

<script>
import RegisterForm from './components/RegisterForm'
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";

export default {
    name: 'RegisterView',
    components: {
        RegisterForm,
        Map
    },
    created () {
        document.title = 'The Social Boba Experience - Register'
    }
};
</script>

<style scoped>
.Left_Half {
  width: 70%;
  height: 100%;
}

.Right_Half {
  width: 30%;
  height: 100%;
}
</style>