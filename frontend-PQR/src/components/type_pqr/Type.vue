<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'



let type_PQR = reactive({
  name: ""
}); 


const rules = computed (() =>{
  return {  
    name: {
       required:helpers.withMessage("El campo tipo de PQR es obligatorio", required ) 
    }
  }
});

//inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, type_PQR)

const submitForm = async () => {
  const result = await v$.value.$validate();
  if(result) {
    RegistrationType_PQR();
    clear();
  } else {
    messageError("Verifique que el campos este lleno");
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
const RegistrationType_PQR = async () => {
  const formData = new FormData();
  formData.append("name", type_PQR.name);
 
  const urlDB = `https://pqr-production.up.railway.app/api/v1/pqr-type`;
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
   type_PQR.name = '';
}
</script>
<template>
     <form class="container my-5" @submit.prevent="submitForm()">
      <h2>Crear Tipo de PQR</h2>
      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Tipo PQR</label>
        <input type="text" id="disabledTextInput" class="form-control" placeholder="Ingrese el tipo de PQR" v-model="type_PQR.name">
        <span v-for="error in v$.name.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>