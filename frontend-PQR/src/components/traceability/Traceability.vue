<script setup>
import { reactive, ref, onMounted, computed } from "vue";

const pqrs = ref([])

const dataPqrs = async () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/traceability/d482d41e-16f2-497c-a70d-deea10d5b7a1";
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (pqrs.value = data));
    console.log(pqrs.value)
};

onMounted(() => {
    dataPqrs();
  
});

</script>

<template>
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
              <tr v-for="item in  pqrs" :key="item.name">
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <a
                    class="navbar-brand"
                    href="#"
                  >
                    <i class="fa-solid fa-clock icon"></i
                  ></a>
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