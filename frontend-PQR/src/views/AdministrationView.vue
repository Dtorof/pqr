<script setup>
import Navbar from "../components/navbar/Navbar.vue";
import LoginError from "../views/LoginError.vue";
// // import CustomersView from '../views/CustomersView.vue'
import { useAuthenticationStore } from "../stores/authentication";
import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataPinea = useData1();
const { viewLogin } = storeToRefs(dataPinea);



const user_name = useAuthenticationStore();
const token_authen = useAuthenticationStore();

let URL = window.location;

const stateLocal = ref(false)

onMounted(() => {
  stateLocal.value = JSON.parse(localStorage.getItem("stateLocal"));
});


</script>
<template>
  <div v-if=" stateLocal">
    <Navbar />

    <div v-if="URL.pathname == '/administration'" class="container-main">
      <h2>
        Bienvenido <span>{{ user_name.getUserName }}</span>
      </h2>
      <img
        class="img"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slnsoftwares.com%2Fimages%2Fgif%2Fwebdevelopment10.gif&f=1&nofb=1&ipt=b13139b05e6ee422320b34cf1713cf1e31c4758181422de8a198787759858ada&ipo=images"
      />
    </div>
  </div>
  <div v-else>
    <LoginError />
  </div>
</template>
<style scoped>
.container-main {
  display: flex;
  flex-direction: column;
}
.img {
  width: 60%;
  margin: 2px auto;
}
</style>