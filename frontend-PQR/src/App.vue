<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/navbar/Navbar.vue'
import LoginYeniVue from './components/LoginYeni.vue';
// import { onMounted } from 'vue'

// const  router = useRouter();

// onMounted(() => {
//   if(localStorage.getItem("loguedUserName")){
//      router.push('/administration')
//   } else {
//      router.push('/')
//   }
// })




</script>

<template>
  <!-- <LoginYeniVue/> -->
  <Navbar/>
  <RouterView />
</template>

<style scoped>




</style>
