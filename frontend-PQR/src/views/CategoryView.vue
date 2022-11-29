<script setup>
import Category from '../components/category_pqr/Category.vue'
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
      <Category/>
    </div>
    <div v-else>
  <LoginError/> 

</div>
</template>