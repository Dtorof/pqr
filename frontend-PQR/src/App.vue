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
  <RouterView />
</template>

<style scoped>




</style>
