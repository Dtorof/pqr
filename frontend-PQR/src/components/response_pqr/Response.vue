<script setup>
const arrayFrutas = [
  {
    id: "1",
    name: "Manzana",
    price: "$1.00",
    description: "Una manzana",
  },
  {
    id: "2",
    name: "Pera",
    price: "$2.00",
    description: "Una pera",
  },
  {
    id: "3",
    name: "Naranja",
    price: "$3.00",
    description: "Una naranja",
  },
];
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
                <th class="col-2">Responder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button
                    type="button"
                    class="btn btn2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
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
}
.btn2{
  background-color:  var( --blue-purple);
}
.container{
    justify-content: center;
    text-align: center;
}
</style>