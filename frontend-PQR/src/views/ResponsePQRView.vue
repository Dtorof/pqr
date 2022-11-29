<script setup>
import ResponseVue from '../components/response_pqr/Response.vue';
import ModalResponseVue from '../components/response_pqr/ModalResponse.vue';
import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";
import LoginError from "../views/LoginError.vue"
import { onMounted, ref } from "vue";


const dataPinea = useData1(); 
const {viewLogin} = storeToRefs(dataPinea);
const stateLocal = ref(false)

onMounted(() => {
  stateLocal.value = JSON.parse(localStorage.getItem("stateLocal"));
});
</script>

<template>
     <div v-if="stateLocal">
        <ResponseVue/>
        <ModalResponseVue/>
    </div>
    <div v-else>
        <LoginError/>
    </div>

</template>