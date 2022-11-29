<script setup>


import Pqr from "../components/create_pqr/Pqr.vue"
import LoginError from "../views/LoginError.vue"
import { onMounted, ref } from "vue";


import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";

const dataPinea = useData1(); 
const {viewLogin} = storeToRefs(dataPinea);
const stateLocal = ref(false)

onMounted(() => {
  stateLocal.value = JSON.parse(localStorage.getItem("stateLocal"));
});
</script>
<template>
    <div v-if="stateLocal">
      <Pqr/>
    </div>
    <div v-else>
  <LoginError/> 

</div>
</template>