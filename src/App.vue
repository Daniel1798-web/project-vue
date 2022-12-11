<template>
  <formulario></formulario>

  
</template>

<script>
import formulario from './components/formulario.vue';

export default {
  components: {  
    formulario 
  },

name: 'App',



methods: {

}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.box{
  border: 2px solid black;
  width: 250px !important;
  height: 150px !important;
  margin: auto;
}
</style>
