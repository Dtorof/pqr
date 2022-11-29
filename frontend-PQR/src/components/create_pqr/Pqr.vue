<script setup>
import { reactive, ref, onMounted, computed, onUpdated, watch} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'
import { useAuthenticationStore } from '../../stores/authentication';


const user_id = useAuthenticationStore(); 

const categories = ref([]);
const types = ref([]);

const form = ref({
  client: "",
  client_id: "",
  category: "",
  type:"",
  description: "",
  invalid:""
}); 

const customers = ref([]);


const getTypePQR = () => {
  const urlData = "https://pqrs01-production.up.railway.app/api/v1/pqr-type"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => types.value= data)
      console.log("types",types)
}


const getCustomer = async() => {
  const urlBD = "https://pqrs01-production.up.railway.app/api/v1/customer"
  try {
    const res = await fetch(urlBD)
    const data  = await res.json()
    customers.value = data
    console.log("state.customers...",customers) 
  }catch(error){
    console.log(error)
  }
}
onMounted(() => {
  getTypePQR();
  getCustomer();
  getCategories();
});
 
const getCategories = () => {
  const urlData = "https://pqrs01-production.up.railway.app/api/v1/pqr-category"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => categories.value= data)
}

const filterCategories = computed(() => {
  if (form.value.type === '') {
    return []
  }

 return categories.value.filter(category=> category.type_pqr_id === form.value.type)
});


const filterCustomers = computed(() => {
  if (form.value.client === '') {
    console.log(form.value.client)
    return []
  }

  let matches = 0

 return customers.value.filter(customer => {
    if (customer.names.toLowerCase().includes(form.value.client.toLowerCase()) && matches < 10) {
      matches++
      return customer
    } else {
      form.value.invalid = "no se encuentra el cliente registrado"
      alert("No se encuentra el cliente registrado")
    }
  })
});

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

// inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, form)

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
  const formData = new FormData();
  formData.append("client_id", form.value.client_id);
  formData.append("user_id", user_id.getUserId );
  formData.append("pqr_category_id", form.value.category);
  formData.append("description", form.value.description);

 console.log(formData)
  const urlDB = `https://pqrs01-production.up.railway.app/api/v1/register-pqr`;
  await fetch(urlDB, {
    method: "POST",
    body: formData,
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
   form.value.client = '';
   form.value.category = '';
   form.value.type = '';
   form.value.description = '';
}

const update = (name, id) => {
  form.value.client = name;
  form.value.client_id = id;
  console.log(form.value.client,  name, id)
  console.log(form.value.client_id)
}

</script>
<template>
    <form class="container my-5 form  px-5 py-3" @submit.prevent="submitForm()">
        <h2  class="title mb-3 py-3 text-center">Crear PQR</h2>
        <div class="mb-3">
            <label for="disabledTextInput" class="form-label">Cliente</label>
            <input type="text" id="disabledTextInput" class="form-control" placeholder="Nombre del cliente" v-model="form.client"/>
            <div class="bg-light mb-3" v-for="(item, i) in filterCustomers" :key="i">
              <div @click="update(item.names, item.id)">{{item.names}}</div>
            </div>
            <span v-for="error in v$.client.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
            <span v-show="form.invalid" style="color: red;"></span>
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Tipo PQR</label>
            <select id="disabledSelect" class="form-select" v-model="form.type">
                <!-- <option selected>Seleccione el tipo de PQR</option> -->
                <option v-for="(item,i) in types" :value="item.id" v-text="item.name" :key="i"></option>
            </select>
            <span v-for="error in v$.type.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Categoria</label>
            <select id="disabledSelect" class="form-select"  v-model="form.category">
              <!-- <option selected>Seleccione una categoria</option> -->
              <option v-for="(item,i) in filterCategories" :value="item.id" v-text="item.name" :key="i"></option>
            </select>
            <span v-for="error in v$.category.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        
        <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Descripción</label>
        <textarea name="message" rows="5" cols="10" class="form-control" placeholder="Ingrese una descripción" v-model="form.description">
        </textarea>
         <span v-for="error in v$.description.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <button type="submit" class="btn py-2 mt-2 mb-3">Guardar</button>
    </form>
</template>
<style scoped>
.form{
  width: 50%;
  justify-content: center;
  opacity: 0.8;
  border-radius: 30px;
  background: rgba(37,219,148,0.7);
  border: 1px solid rgba(37,219,148,0.35);
}
.form-control{
  border-color: #00c6ab;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border-radius: 10px;
  width: 100%;
}
.form-label{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin-left: 2%;
}
.btn{
  width:99% ;
  height: 100%;
  border-radius: 8px;
  background-color: #fff;
  color: #223026;
  font-weight: 600;
}
.btn:hover{
  background-color: #68da3e;
  color: #fff;
}
</style>


