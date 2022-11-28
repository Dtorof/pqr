<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import LineTime from "./LineTime.vue"

import { useAuthenticationStore } from '@/stores/authentication';




import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";

// user_id.addId()
const user_id = useAuthenticationStore(); 




const dataPinea = useData1(); //no olvidar los parentisis

//desestructurar

const {add} = dataPinea;

//a las variables reactivas que vienen de pinia debo colocarle .value ademas se desestructuran con storeToRefs(xxx)
const {data1} = storeToRefs(dataPinea);




const pqrs = ref([]);
const idUrl = ref("");



const dataPqrs = async () => {
  const urlData = `https://pqrs01-production.up.railway.app/api/v1/pqr-users/${user_id.getUserId}`;
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
console.log(urlData)
};
const dataEstatusPqrs = async () => {
  const urlData = `https://pqrs01-production.up.railway.app/api/v1/traceability/${idUrl.value}`;
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
    data1.value = pqrs.value
   
  // console.log("url", urlData);
};

const sendData = (data) => {
  idUrl.value = data.id;


  dataEstatusPqrs();


};

onMounted(() => {

  dataPqrs();
});
</script>

<template>
  

<LineTime/>


  <div class="col m-5">
    <div class="row" id="tabla">
      <div class="container pe-4 ps-4">
        <div class="table-responsive">
          <table class="table">
            <thead class="table-header">
              <tr>
                <th class="col-2">Cliente</th>
                <th class="col-2">Tipo</th>
                <th class="col-2">Fecha</th>
                <th class="col-2">Descripción</th>
                <th class="col-2">Estado</th>
                <th class="col-2">Linea tiempo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pqrs" :key="item.client_id">
                <th v-text="item.customer.fullName"></th>
                <td v-text="item.pqrCategory.name"></td>
                <td v-text="item.updatedAt"></td>
                <td v-text="item.description"></td>
                <td v-text="item.status"></td>
                <td>
                  <a
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                    class="navbar-brand"  
                    href="#"
                    @click="sendData(item)"
                  >
                    <i class="fa-solid fa-clock icon"></i
                  ></a>
                  <!-- <button @click="sendData(item)" type="button">hola</button> --| -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> 

</template>
<style scoped>
.table-header {
  background: rgba(37, 219, 148, 0.7);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(37, 219, 148, 0.35);
  justify-content: center;
}
.btn2 {
  background-color: var(--blue-purple);
}
.icon {
  color: var(--blue-purple);
  font-size: 2rem;
}
.container {
  justify-content: center;
  text-align: center;
}
</style>
