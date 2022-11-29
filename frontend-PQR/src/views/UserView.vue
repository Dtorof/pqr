<script setup>
import UserVue from "../components/users/User.vue";
import LoginError from "../views/LoginError.vue";

import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataPinea = useData1();
const { viewLogin } = storeToRefs(dataPinea);
const stateLocal = ref(false)

onMounted(() => {
  stateLocal.value = JSON.parse(localStorage.getItem("stateLocal"));
});
</script>
<template>
  <div v-if="stateLocal">
    <UserVue />
  </div>
  <div v-else>
    <LoginError />
  </div>
</template>