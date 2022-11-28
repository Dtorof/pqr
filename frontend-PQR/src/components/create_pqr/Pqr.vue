<script>
import { reactive, ref, onMounted, computed, onUpdated} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'

const categorys = reactive([]);
const types = reactive([]);

const formCreatePQR = reactive({
  client: "",
  category: "",
  type:"",
  description: "",
}); 

const getTypePQR = () => {
  const urlData = "https://pqrs01-production.up.railway.app/api/v1/pqr-type"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => types.value= data)
      console.log("types",types)
}

let  customers = reactive([]);

const getCustomer = async() => {
  const urlBD = "https://pqrs01-production.up.railway.app/api/v1/customer"
  try {
    const res = await fetch(urlBD)
    const data  = await res.json()
    customers = data
    console.log("state.customers...",customers) 
  }catch(error){
    console.log(error)
  }
}

onMounted(() => {
  // console.log("state.customers...🎄",customers)
  getTypePQR();
  getCustomer();
})

onUpdated(() => {
  getCategorys();
})
console.log(formCreatePQR)

const filterCustomers = computed(() => {
  if (formCreatePQR.client === '') {
    console.log(formCreatePQR.client)
    return []
  }

  let matches = 0

 return customers.filter(customer => {
    if (
      customer.names.toLowerCase().includes(formCreatePQR.client.toLowerCase())
      && matches < 10
    ) {
      matches++
      return customer
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
  const formData = new FormData();
  formData.append("client_id", formCreatePQR.client);
  formData.append("user_id", formCreatePQR.type);
  formData.append("pqr_category_id", formCreatePQR.category);
  formData.append("description", formCreatePQR.description);

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
   formCreatePQR.client = '';
   formCreatePQR.category = '';
   formCreatePQR.type = '';
   formCreatePQR.description = '';
}

const update = (name, id) => {
  formCreatePQR.client = id;
  console.log(formCreatePQR.client)
}

</script>
<template>
    <form class="container my-5 form  px-5 py-3" @submit.prevent="submitForm()">
        <h2  class="title mb-3 pb-3">Crear PQR</h2>
        <div class="mb-3">
            <label for="disabledTextInput" class="form-label">Cliente</label>
            <input type="text" id="disabledTextInput" class="form-control" placeholder="Nombre del cliente"  v-model="formCreatePQR.client">
            <span v-for="error in v$.client.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
         <div v-for="(item, i) in filterCustomers" :key="i">
          <div @click="update(item.name, item.id)" :value="item.name">{{item.names}}</div>
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Tipo PQR</label>
            <select id="disabledSelect" class="form-select" v-model="formCreatePQR.type">
                <option>Seleccione el tipo de PQR</option>
                <option v-for="(item,i) in types.value" :value="item.id" v-text="item.name" :key="i"></option>
            </select>
            <span v-for="error in v$.type.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <div class="mb-3">
            <label for="disabledSelect" class="form-label">Categoria</label>
            <select id="disabledSelect" class="form-select"  v-model="formCreatePQR.category">
              <option>Seleccione una categoria</option>
              <option v-for="(item,i) in categorys.value" :value="item.id" v-text="item.name" :key="i"></option>
            </select>
            <span v-for="error in v$.category.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        
        <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Descripción</label>
        <!-- <textarea name="message" rows="10" cols="30" class="form-control" placeholder="Ingrese una descripción" v-model="formCreatePQR.description">
         
        </textarea> -->
        <!-- <span v-for="error in v$.description.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span> -->
        </div>
        <button type="submit" class="btn py-2 my-2">Guardar</button>
    </form>
</template>
<style scoped>
.form{
  width: 50%;
  justify-content: center;
  opacity: 0.8;
  border-radius: 30px;
  background: rgba(37,219,148,0.7);
  /* -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px); */
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


