<script setup>
import Navbar from '../components/navbar/Navbar.vue'
import { useAuthenticationStore } from '../stores/authentication';


const user_name = useAuthenticationStore(); 
const token_authen = useAuthenticationStore(); 

let URL = window.location;
</script>
<template>
  <div>
   <Navbar/> 
    <div v-if="URL.pathname =='/administration' "   class="container-main">
        <h2 class="title text-center my-5">Bienvenido <span>{{user_name.getUserName}}</span></h2>
        <img class="img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slnsoftwares.com%2Fimages%2Fgif%2Fwebdevelopment10.gif&f=1&nofb=1&ipt=b13139b05e6ee422320b34cf1713cf1e31c4758181422de8a198787759858ada&ipo=images"/>
    </div>
  </div>
    <!-- <RouterView /> -->
</template>
<style scoped>
.container-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.title{
   color: #00c6ab;
   font-size: 1.5rem;
}
.img {
    width: 95%;
    margin: 2px auto;
}
@media (min-width: 481px) {
 .img {
    width: 75%;
}
}
@media (min-width: 576px) {
.container-main {
    width: 700px;
}
}
@media (min-width:  768px) {
.container-main {
    width: 900px;
}
}
@media (min-width: 1023px) {
 .img {
    width: 50%;
    margin: 2px auto;
}
.container-main {
    width: 1200px;
}
} 
</style>