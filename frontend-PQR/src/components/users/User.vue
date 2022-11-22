<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required} from "@vuelidate/validators";

const state = reactive({
  name: "",
  userName: "",
  document: "",
  password: "",
});

const user = ref([])
const rules = computed(() => {
  return {
    name: {
      required,
    },
    userName: {
      required,
    },
    document: {
      required,
    },
    password: {
      required,
    },
    
  };
});

const $v = useVuelidate(rules, state);

const sendValidations = async () => {
  const result = await $v.value.$validate();
  if (result) {
    sendData();
 
    
  } else {
    messageError(
      "Verifique que todos los campos este llenos",
    );
  }
};

const todo = ref([])

const sendData = async () => {
  
  const formData = new FormData();
  formData.append("name", state.name);
  formData.append("userName", state.userName);
  formData.append("document", state.document);
  formData.append("password", state.password);

  const urlDB = `https://pqr-production.up.railway.app/api/v1/user`;
  
  await fetch(urlDB, {
    method: "POST",
    body: formData,
  })
  
    .then((response) => response)
    .then((response) => { 
      

    })
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

const dataUser = async () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/user";
  await fetch(urlData)
    .then((resp) => resp.json())
    .then((data) => (user.value = data));
    console.log(user.value)
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
  state.name= "";
  state.userName= "";
  state.document= "";
  state.password= "";
};

onMounted(() => {
  dataUser();
  
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
    <h1 class="title mb-3">Crear usuarios</h1>
    <div class="row">

      <div class="form-floating mb-3">
        <input
          v-model="state.name"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          :class="{ 'is-invalid': $v.name.$error }"
        />
        <label class="label1" for="floatingInput">Nombre</label>
        <span
              v-for="error in $v.name.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un nombre") }}
            </span>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="state.userName"
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          :class="{ 'is-invalid': $v.userName.$error }"
        />
        <label class="label1" for="floatingPassword">Usuario</label>
        <span
              v-for="error in $v.userName.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un usuario") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="state.document"
          type="text"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          :class="{ 'is-invalid': $v.document.$error }"

        />
        <label class="label1" for="floatingPassword">Documento</label>
        <span
              v-for="error in $v.document.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese un numero de documento") }}
            </span>
      </div>
      <div class="form-floating mb-3">
        <input
        v-model="state.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          :class="{ 'is-invalid': $v.password.$error }"

        />
        <label class="label1" for="floatingPassword">Contraseña</label>
        <span
              v-for="error in $v.password.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese una contraseña") }}
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