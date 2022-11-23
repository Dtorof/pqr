<script setup>
import { reactive, ref, onMounted, computed} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'

const formLogin = reactive({
  user: "",
  password: "",
}); 
const loguedUser = ref({})
const users = reactive([]);

const rules = computed (() =>{
  return {
    user: { 
      required:helpers.withMessage("El campo usuario es obligatorio", required ), 
    },
    password: {
       required:helpers.withMessage("El campo password es obligatorio", required ) 
    }
  }
});

//inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, formLogin)

const submitForm = async (user, key) => {
  const result = await v$.value.$validate();
  if(result) {
    authen(user, key);
    message(
      "center",
      "Se inicio sesión correctamente",
      "¡Bienvenido!",
      1500
    );
    clear();
  } else {
    messageError("Verifique que todos los campos este llenos y que las credenciales sean las correctas");
  }
};

const getUsers = () => {
  const urlData = "https://pqr-production.up.railway.app/api/v1/user"
      fetch(urlData)
      .then(resp => resp.json())
      .then(data => users.value= data) 
      console.log(users)
}

onMounted(() => {
  getUsers();
})

const authen = (user, key) => {
   let session = users.value.filter((userName, password )=> userName === user && password === key)
   loguedUser.value = { ...formLogin}
   console.log(loguedUser.value)
}
const clear=() =>{
   v$.value.$reset()
   formLogin.user = '';
   formLogin.password = '';
}
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

</script>
<template>
    <div>
      <form class="form" @submit.prevent="submitForm(user, key)">
        <h2 class="form-title my-3">Inicio de Sesión</h2>
        <div class="mb-3">
          <label for="exampleInputUser" class="form-label">Usuario</label>
          <input type="text" class="form-control" id="exampleInputUser" aria-describedby="userHelp" v-model="formLogin.user">
          <span v-for="error in v$.user.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="formLogin.password">
          <span v-for="error in v$.password.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
        </div>
        <button type="submit" class="btn">Ingresar</button>
      </form>
    </div>
</template>
<style scoped>
@import '../../assets/base.css';

label {
  color: #3f3d56;
}
input {
  border: 1px solid #6c63ff;
}
.form {
  margin: 20%;
}
.form-title {
  color: #ccc;
  font-weight: bolder;
}
.btn{
  /* background-color: var(--color-text); */
  background-color: #6c63ff;
  color: white;
}
</style>