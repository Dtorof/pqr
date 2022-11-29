<script setup>
import TraceabilityVue from '../components/traceability/Traceability.vue';
import { onMounted, ref } from "vue";
import LoginError from "../views/LoginError.vue"

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
        <TraceabilityVue/>
    </div>
    <div v-else>
  <LoginError/> 

</div>

    
</template>