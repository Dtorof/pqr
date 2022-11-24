<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required,email} from "@vuelidate/validators";


const state = reactive({
  names: "",
  surnames: "",
  document:"",
  email: "",
  dateOfBirth: "",
  address: "",
  phone: "",
});


const customer = ref([])

const rules = computed(() => {
  return {
    names: {
      required,
    },
    surnames: {
      required,
    },
    email: {
      required,
      email
    },
    dateOfBirth: {
      required,
    },
    address: {
      required,
    },
    phone: {
      required,
    },
   
    document: {
      required,
    },
  };
});

const $v = useVuelidate(rules, state);

const sendValidations = async () => {
  console.log("entro1")
  const result = await $v.value.$validate();
  if (result) {
    sendData();
 
    
  } else {
    messageError(
      "Verifique que todos los campos este llenos",
    );
  }
};



const sendData = async () => {
  console.log("entro2")
  const formData = new FormData();
  formData.append("names", state.names);
  formData.append("surnames", state.surnames);
  formData.append("email", state.email);
  formData.append("dateOfBirth", state.dateOfBirth);
  formData.append("address", state.address);
  formData.append("phone", state.phone);
  formData.append("document", state.document);

  const urlDB = `https://pqr-production.up.railway.app/api/v1/customer`;
  await fetch(urlDB, {
    method: "POST",
    body: formData,
  })
    .then((response) => response)
    
    .catch((error) => {
      console.error("Error:", error);
    });

    messageCreate(
    "center",
    "Creación completada",
    "Se ha creado correctamente el registro",
    1500
  ); 
};

const messageError = ( text,) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

const dataCustomer= async () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/customer";
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (customer.value = data));
    console.log(customer.value)
};

const messageCreate = (position, title, text, time) => {
  Swal.fire({
    position: position,
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: time,
  });
};

const clear = () => {
  $v.value.$reset() // ayuda a que no este todo en rojo
  state.names= "";
  state.surnames= "";
  state.email= "";
  state.dateOfBirth= "";
  state.address= "";
  state.phone= "";
  state.document="";
};

onMounted(() => {
  dataCustomer();
  
});
</script>
<template>
  <div
    class="
      container
      justify-content-center
      text-center
      
      p-3
      mb-5
      mt-5
      
      
    "
  >
  <form @submit.prevent="sendValidations()">
    <h1 class="title mb-3">Crear clientes</h1>
    <div class="row">

      <div class="form-floating mb-3">
        <input
          v-model="state.names"
          type="text"
          class="form-control"
          id="floatingInput"
          :class="{ 'is-invalid': $v.names.$error }"
        />
        <label class="label1" for="floatingInput">Nombre</label>
        <span
              v-for="error in $v.names.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un nombre") }}
            </span>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="state.surnames"
          type="text"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.surnames.$error }"
        />
        <label class="label1" for="floatingPassword">Apellido</label>
        <span
              v-for="error in $v.surnames.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un apellido") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="state.email"
          type="email"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.email.$error }"

        />
        <label class="label1" for="floatingPassword">Email</label>
        <span
              v-for="error in $v.email.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un email") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
        v-model="state.dateOfBirth"
          type="date"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.dateOfBirth.$error }"

        />
        <label class="label1" for="floatingPassword">Fecha de nacimiento</label>
        <span
              v-for="error in $v.dateOfBirth.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese una fecha de nacimiento") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
        v-model="state.document"
          type="text"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.document.$error }"

        />
        <label class="label1" for="floatingPassword">Numero de documento</label>
        <span
              v-for="error in $v.document.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un documento") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
        v-model="state.address"
          type="text"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.address.$error }"

        />
        <label class="label1" for="floatingPassword">Dirección</label>
        <span
              v-for="error in $v.address.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese una dirección") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
        v-model="state.phone"
          type="number"
          class="form-control"
          id="floatingPassword"
          :class="{ 'is-invalid': $v.phone.$error }"

        />
        <label class="label1" for="floatingPassword">Teléfono</label>
        <span
              v-for="error in $v.phone.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un teléfono") }}
            </span>
      </div>
      <div class="col btn1">
        <button class="btn " type="submit" >Guardar</button>
      </div>
    </div>
  </form>
  </div>
</template>
<style scoped >

@import '../../assets/base.css';
.container {
  width: 50%;
  justify-content: center;
  opacity: 0.8;
  border-radius: 30px;
  background: rgba(37,219,148,0.7);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(37,219,148,0.35);
  
}
.form-control{
  border-color: var(--blue);
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border-radius: 10px;
 
}
.label1{
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin-left: 2%;
}
body{
  background: var(--blue-black);
}
.btn1 .btn{
  width:99% ;
  height: 100%;
  border-radius: 8px;
  background-color: var(--white);
  color: var( --gray-black);
  font-weight: 600;
}
.btn:hover{
  background-color: var(--green);
  color: var(--white);
}

</style>