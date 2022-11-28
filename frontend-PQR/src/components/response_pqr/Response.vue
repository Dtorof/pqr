<script setup>
import ModalResponseVue from "./ModalResponse.vue";
import { reactive, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useData1 } from "@/stores/ensayo";
import { useAuthenticationStore } from '@/stores/authentication';

const dataPinea = useData1(); //no olvidar los parentisis
const user_id = useAuthenticationStore(); 

const {pqrsPinia} = storeToRefs(dataPinea);

const pqrs = ref([]);

const pqrsFilter = ref([]);

const dataPqrs = async () => {
  const urlData = `https://pqrs01-production.up.railway.app/api/v1/register-pqr/${user_id.getUserId}`;
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
    console.log(pqrs.value);

    // pqrsFilter.value = pqrs.value.filter(prqr => pqrs.status === "Proceso")

   
  
};


const sendData = (data) => {
  pqrsPinia.value=data
  console.log(pqrsPinia.value)


};

onMounted(() => {
  dataPqrs();
});
</script>


<template>
  <ModalResponseVue />
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
              <tr v-for="item in pqrs" :key="item.id">
                <th v-text="item.customer.fullName"></th>
                <td v-text="item.pqrCategory.name"></td>
                <td v-text="item.date_register"></td>
                <td v-text="item.description"></td>
                <td v-text="item.status"></td>
                <td>
                  <button
                    type="button"
                    class="btn btn2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal999"
                    @click="sendData(item)"
                  >
                    Responder
                  </button>
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
  color: var(--white);
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
