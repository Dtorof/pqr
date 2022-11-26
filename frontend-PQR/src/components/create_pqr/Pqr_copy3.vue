<script>
// import { reactive, ref, onMounted, computed } from 'vue'


// const  customers = reactive([]);
// const getCustomer = () => {
//   const urlBD = "https://pqr-production.up.railway.app/api/v1/customer"
//   fetch(urlBD)
//   .then(resp => resp.json())
//   .then(data => customers.value = data)
//   // console.log("state.customers...🎄",state.customers)
// }
// onMounted(() => {
//   getCustomer();
// })
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ]
      }
    }
  }
// import Multiselect from 'vue-multiselect'

// export default {
//   components: {
//     Multiselect
//   },
//   data () {
//     return {
//       value: { name: 'Vue.js', language: 'JavaScript' },
//       options: [
//         { name: 'Vue.js', language: 'JavaScript' },
//         { name: 'Rails', language: 'Ruby' },
//         { name: 'Sinatra', language: 'Ruby' },
//         { name: 'Laravel', language: 'PHP' },
//         { name: 'Phoenix', language: 'Elixir' }
//       ]
//     }
//   },
//   methods: {
//     nameWithLang ({ name, language }) {
//       return `${name} — [${language}]`
//     }
//   }
// }

</script>
<template>
  <!-- <form>
    <label for="mechanic_id">Mechanic</label>
    <multiselect
      v-model="selectedMechanic"
      id="mechanic_id" placeholder="Search mechanic"
      :options="mechanics" label="name" track-by="id"
      @search-change="onSearchMechanicsChange"
      @input="onSelectedMechanic"
      />
  </form> -->
  <div>
    <label class="typo__label">Select with search</label>
    <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name"></multiselect>
    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div>
   <div>
    <Multiselect
      v-model="value"
      :options="options"
    />
  </div>
</template>


