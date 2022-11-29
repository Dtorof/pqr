<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthenticationStore } from '../src/stores/authentication';

import AdministrationView from '../src/views/AdministrationView.vue'
import LoginVue from './components/login/Login.vue';

const user_name = useAuthenticationStore(); 


</script>

<template>
 <RouterView/>
</template>

<style scoped>




</style>
