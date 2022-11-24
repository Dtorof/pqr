<script setup>
import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";

const dataPinea = useData1(); //no olvidar los parentisis
const {data1} = storeToRefs(dataPinea);
console.log(data1.value)

</script>
<template>
<div class="modal fade " id="exampleModal999" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Responder PQR</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h5>Cliente:{{data1}} </h5>
       <textarea class="mt-2" placeholder="Descripción"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn2">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>

textarea{
    width: 100%;
}
.modal-header{
    background: var( --blue-purple);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(37,219,148,0.35);
  color: var(--white);
}
.btn2{
  background-color:  rgba(37, 219, 148, 0.7);
}

</style>