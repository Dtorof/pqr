<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'

const types_PQR = reactive([]);

const formCategory = reactive({
  type: "",
  name: "",
}); 
const getTypes_PQR = () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/pqr-type"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => types_PQR.value= data)
      console.log(types_PQR)
}

onMounted(() => {
  getTypes_PQR();
})


const rules = computed (() =>{
  return {  
    name: { 
      required:helpers.withMessage("El campo nombre es obligatorio", required ), 
    },
    type: {
       required:helpers.withMessage("El campo tipo de PQR es obligatorio", required ) 
    }
  }
});

//inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, formCategory)

const submitForm = async () => {
  const result = await v$.value.$validate();
  if(result) {
    RegistrationCategory();
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
const RegistrationCategory = async () => {
  const formData = new FormData();
  formData.append("type_pqr_id", formCategory.type);
  formData.append("name", formCategory.name);
    
  const urlDB = `https://pqr-production.up.railway.app/api/v1/pqr-category`;
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
   formCategory.type = '';
   formCategory.name = '';
}
</script>
<template>
    <!-- {{categorys.value[0].pqrType.name}} -->
    <form class="container my-5" @submit.prevent="submitForm()">
        <h2>Crear Categoria </h2>
    <div class="mb-3">
      <label for="disabledSelect" class="form-label">Tipo PQR</label>
      <select id="disabledSelect" class="form-select" v-model="formCategory.type">
        <option>Seleccione el tipo de PQR</option>
         <option v-for="(item,i) in types_PQR.value" :value="item.id" v-text="item.name" :key="i"></option>
      </select>
        <span v-for="error in v$.type.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
    </div>
    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">Nombre del servicio</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Ingrese el nombre del servicio" v-model="formCategory.name">
      <span v-for="error in v$.name.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
</template>