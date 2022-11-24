<script setup>
import ModalResponseVue from "./ModalResponse.vue";
import { reactive, ref, onMounted, computed } from "vue";

const pqrs = ref([]);

const dataPqrs = async () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/pqr-users/1";
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
  console.log(pqrs.value);
};
const dataEstatusPqrs = async () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/traceability";
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
  console.log(pqrs.value);
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
              <tr v-for="item in pqrs" :key="item.name">
                <th v-text="item.customer.names"></th>
                <td v-text="item.pqrCategory.name"></td>
                <td v-text="item.updatedAt"></td>
                <td v-text="item.description"></td>
                <td v-text="item.status"></td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal999"
                  >
                    Launch demo modal
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
