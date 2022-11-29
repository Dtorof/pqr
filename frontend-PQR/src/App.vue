<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/navbar/Navbar.vue'
import { useAuthenticationStore } from '../src/stores/authentication';
import HomeView from '../src/views/HomeView.vue'
import AdministrationView from '../src/views/AdministrationView.vue'

const user_name = useAuthenticationStore(); 
console.log(user_name)

</script>

<template>
  <Navbar/>
  <RouterView />
</template>

<style scoped>




</style>
