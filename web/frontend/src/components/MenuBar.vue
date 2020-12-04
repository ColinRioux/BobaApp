<template>
    <div class="menu">
        <a class="logo" @click="goHome">
            <span>The Social Boba Experience</span>
        </a>
        <ul>
            <li class="menu-button">
                <router-link to="/">
                    <b-icon pack="fas" icon="home"></b-icon>
                </router-link>
            </li> 
            <li class="menu-button">
                <b-dropdown :triggers="['hover']" aria-role="menu" class="is-right">
                    <b-icon pack="fas" icon="user-circle" slot="trigger"></b-icon>
                    <b-dropdown-item aria-role="menuitem">
                        <router-link to="/login">Login</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="menuitem">
                        <router-link to="/register">Register</router-link>
                    </b-dropdown-item>
                </b-dropdown>
            </li> 
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MenuBar',
        components: {},
        methods: {
            goHome() {
                this.$router.push({ path: '/' });
            }
        }
    };
</script>

<style>
.menu {
    background-color: rgba(255, 255, 255, 0.6);
    height: 3em;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    float: left;
    color: black;
    vertical-align: middle;
    margin-left: 0.5em;
    cursor: pointer;
}

.menu ul {
    list-style-type: none;
    display: inline-flex;
}

.menu-button {
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: pointer;
    color: black;
}

.logo:hover, .menu-button:hover {
    color: gray;
}
</style>