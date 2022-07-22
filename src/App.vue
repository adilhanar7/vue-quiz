<template>
  <Main/>
</template>

<script>
import Main from '@/components/Main.vue'
export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="scss">
body {
  background: rgb(0, 140, 255);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: #2c3e50;
}
</style>
