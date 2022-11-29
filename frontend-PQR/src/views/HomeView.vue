<script setup>
import Login from '../components/login/Login.vue'
import Navbar from '../components/navbar/Navbar.vue'


</script>
<template>
<div>
<div class="container-main">
    <img  class="container-main__img" src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="imagen home" srcset="">
   <div class="container_login">
    <Login/>
   </div>
 </div>
</div>
</template>
<style scoped>
@import '../assets/base.css';
 .container-main {
   display: flex;
   flex-direction: column-reverse;
   width: 100%;
   margin: 2px 2px;
}
.container-main__img{
/* display: none; */
}
.container_login {
   width: 100%;
}
@media (min-width: 768px) {
 .container-main {
   display: flex;
   flex-direction: row;
   width: 95%;
   margin: 0px 2px;
}
.container-main__img{
 width: 50%;
 /* visibility: visible; */
}
.container_login {
   width: 50%;
}
}
</style>