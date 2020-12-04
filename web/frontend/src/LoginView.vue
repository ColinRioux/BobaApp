<template>
    <div id="app">
        <LoginForm class="Right_Half"></LoginForm>
        <!-- <SearchBar class="Left_Half"></SearchBar> -->
        <Map class="Left_Half"></Map>
    </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";

export default {
    name: "LoginView",
    components: {
        LoginForm,
        Map,
        // SearchBar,
    },
    created() {
        document.title = "The Social Boba Experience - Login";
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