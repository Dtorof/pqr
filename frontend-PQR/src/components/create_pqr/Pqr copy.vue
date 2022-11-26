<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
// import { useVuelidate } from '@vuelidate/core'
// import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'

const categorys = reactive([]);
const searchQuery = ref("");

const customers = reactive([]);

const getCategorys = () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/pqr-category"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => categorys.value= data)
      console.log(categorys)
}

const getCustomer = () => {
  const urlBD = "https://pqr-production.up.railway.app/api/v1/customer"
  fetch(urlBD)
  .then(resp => resp.json())
  .then(data => customers.value = data)
  // .then(data => state.customers.value = data)
  console.log(customers)
}
onMounted(() => {
  getCategorys();
  getCustomer();
})

const searchedProducts = computed(() => {
      return customers.value.filter((customer) => {
        return (
          customer.names
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
});

</script>
<template>
      <div style="width: 100%">
        <input type="text" placeholder="Search..."  v-model="searchQuery"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </div>
      <div v-for="(item) in searchedProducts[0].names" :key="item.id" style="margin: 0"></div>
      {{searchedProducts[0].names}}
    <div class="box">
      <!-- <h2>{{customers.value}}</h2> -->
    <div v-for="customer in customers.value" :key="customer.id">
      <div>
        <div>{{customer.names }}</div>
        <div>
          {{ customer.document }} | {{ customer.email }} Kg |
          {{ customer.fullName }} pack
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  background: red;
  width: 1200px;
  /* height: 200px; */
}
</style>