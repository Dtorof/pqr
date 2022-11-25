<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'

const categorys = reactive([]);

const formCreatePQR = reactive({
  client: "",
  category: "",
  type:"",
  description: "",
}); 

const state = reactive ({
    customers: [],
    filterCustomers: computed(()=> searchCustomers())
})

const searchCustomers = () => {
  // return state.customers.filter((customer) => customer.names.includes(state.names.toLowerCase()))
  let search = state.customers.filter((customer) => customer.names.includes(formCreatePQR.client))
  console.log("search...🔎",search)
   return search 
}

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
  .then(data => state.customers.value = data)
  console.log(state.customers)
}
onMounted(() => {
  getCategorys();
  getCustomer();
})
const rules = computed (() =>{
  return {  
    client: { 
      required:helpers.withMessage("El campo cliente es obligatorio", required ), 
    },
    category: {
       required:helpers.withMessage("El campo Cateroria es obligatorio", required ) 
    },
    type: { 
      required:helpers.withMessage("El campo tipo de PQR es obligatorio", required ), 
    },
    description: {
       required:helpers.withMessage("El campo descripción es obligatorio", required ) 
    }
  }
});

//inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, formCreatePQR)

const submitForm = async () => {
  const result = await v$.value.$validate();
  if(result) {
    RegistrationCreatePQR();
    clear();
  } else {
    messageError("Verifique que todos los campos este llenos");
  }
};

const message = (position, title, text, time) => {
  Swal.fire({
    position: position,
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: time,
  });
};

const messageError = ( text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};
const RegistrationCreatePQR = async () => {
    let createPQR = {
        client_id: formCreatePQR.client,
        user_id: "",
        pqr_category_id: formCreatePQR.category,
        description: formCreatePQR.description
    } 
 console.log(createPQR)
  const urlDB = `https://pqr-production.up.railway.app/api/v1/pqr-category`;
  await fetch(urlDB, {
    method: "POST",
    body: JSON.stringify(createPQR),
  })
    .then((response) => {
      console.log(response)
      message(
        "center",
        "Registro completo",
        "Se ha creado correctamente el registro",
        1500
      );
      return response.json();
    })
    .then((data) => {
      console.log(data)
    })
}
const clear=() =>{
   v$.value.$reset()
   formCreatePQR.client = '';
   formCreatePQR.category = '';
   formCreatePQR.type = '';
   formCreatePQR.description = '';
}
</script>
<template>
    <form class="container my-5" @submit.prevent="submitForm()">
        <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Cliente</label>
        <input type="text" id="disabledTextInput" class="form-control" placeholder="Nombre del cliente"  v-model="formCreatePQR.client">
        <span v-for="error in v$.client.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        {{state.filterCustomers}}
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Categoria</label>
            <select id="disabledSelect" class="form-select"  v-model="formCreatePQR.category">
              <option>Seleccione una categoria</option>
              <option v-for="(item,i) in categorys.value" :value="item.id" v-text="item.name" :key="i"></option>
            </select>
            <span v-for="error in v$.category.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Tipo PQR</label>
            <select id="disabledSelect" class="form-select" v-model="formCreatePQR.type">
                <option>Seleccione el tipo de PQR</option>
            </select>
            <span v-for="error in v$.type.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Descripción</label>
        <textarea name="message" rows="10" cols="30" class="form-control" placeholder="Ingrese una descripción" v-model="formCreatePQR.description">
         
        </textarea>
        <span v-for="error in v$.description.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>