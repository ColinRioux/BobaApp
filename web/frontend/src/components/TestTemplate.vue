<template>
    <div class="hello">
        <h1> {{ msg }} </h1>
    </div>
</template>

<script>
export default {
    name: 'TestTemplate',
    data () {
        return {
            msg: 'Hello Horatio!'
        }
    }
}
</script>

<style scoped>
h1 {
    font-weight: bold;
}
</style>