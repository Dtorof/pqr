<script setup>
import { useData1 } from "../stores/ensayo";

const useData = useData1(); //no olvidar los parentisis

//desestructurar


const {pqrs} = useData;
const {dataPqrs} = useData;
</script>

<template>
<button @click="peticiones">aprtar</button>
  <h1>{{pqrs}}</h1>
</template>