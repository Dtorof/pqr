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
  const urlData = "https://pqrs01-production.up.railway.app/api/v1/pqr-type"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => types_PQR.value= data)

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
    
  const urlDB = `https://pqrs01-production.up.railway.app/api/v1/pqr-category`;
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
    <form class="container my-5 form px-5 py-3" @submit.prevent="submitForm()">
    <h2 class="title mb-3 py-3 text-center">Crear Categoria </h2>
    <div class="mb-3">
      <label for="disabledSelect" class="form-label">Tipo PQR</label>
      <select id="disabledSelect" class="form-select" v-model="formCategory.type">
         <option v-for="(item,i) in types_PQR.value" :value="item.id" v-text="item.name" :key="i"></option>
      </select>
        <span v-for="error in v$.type.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput"  v-model="formCategory.name">
        <label for="floatingInput">Nombre del servicio</label>
        <span v-for="error in v$.name.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
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