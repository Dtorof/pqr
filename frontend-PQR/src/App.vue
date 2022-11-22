<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UserVue from './components/users/User.vue';
import CustomerVue from './components/customers/Customer.vue';
import ResponsePQRViewVue from './views/ResponsePQRView.vue';
</script>

<template>
  <!-- <UserVue/> -->
  <!-- <CustomerVue/> -->
  <ResponsePQRViewVue/>
  
  <!-- <header>
    <div class="wrapper">
      <nav> -->
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      <!-- </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped>




</style>
