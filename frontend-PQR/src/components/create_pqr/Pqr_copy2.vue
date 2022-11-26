<script setup>
import { reactive, ref, onMounted, computed } from 'vue'

// const customers = reactive(['One','Two','Three']);
// console.log(customers)
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'

// export default {
//   name: 'my-vue-component',
//   components: {
//     SimpleTypeahead
//   }
// }
const  customers = reactive([]);
const getCustomer = () => {
  const urlBD = "https://pqr-production.up.railway.app/api/v1/customer"
  fetch(urlBD)
  .then(resp => resp.json())
  .then(data => customers.value = data)
  // console.log("state.customers...🎄",state.customers)
}
onMounted(() => {
  getCustomer();
})
</script>
<template>

  <vue3-simple-typeahead
  id="demo"
  placeholder="Type Something..."
  :items="customers.value"
  :minInputLength="1"
  :itemProjection="itemProjectionFunction"
  @selectItem="selectItemEventHandler"
>
</vue3-simple-typeahead>

</template>

