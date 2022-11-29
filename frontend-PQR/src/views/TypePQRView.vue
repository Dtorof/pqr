<script setup>
import Type from "../components/type_Pqr/Type.vue";
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
    <Type/>
  </div>
  <div v-else>
  <LoginError/> 

</div>
</template>