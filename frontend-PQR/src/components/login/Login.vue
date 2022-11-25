<script setup >
import { reactive, ref, onMounted, computed} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'
import {useRouter } from 'vue-router';
import { useAuthenticationStore } from '../../stores/authentication';


const addData = ref([])

const userAuthentication = useAuthenticationStore(); 

const  router = useRouter();

const formLogin = reactive({
  userName: "",
  password: "",
}); 

const rules = computed (() =>{
  return {
    userName: { 
      required:helpers.withMessage("El campo usuario es obligatorio", required ), 
    },
    password: {
       required:helpers.withMessage("El campo password es obligatorio", required ) 
    }
  }
});

//inicializar para ver el la data dentro del componente
const v$ = useVuelidate(rules, formLogin)

const submitForm = async () => {
  const result = await v$.value.$validate();
  if(result) {
    LoginData();
    clear();
  } else {
    messageError("Verifique que todos los campos este llenos y que las credenciales sean las correctas");
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

const clear=() =>{
   v$.value.$reset()
   formLogin.userName = '';
   formLogin.password = '';
}


const LoginData = async () => {
  const formData = new FormData();
  formData.append("userName", formLogin.userName);
  formData.append("password", formLogin.password);
  
// console.log(formData)
  const urlDB = `https://pqr-production.up.railway.app/api/v1/auth/login`;
  await fetch(urlDB, {
    method: "POST",
    body: formData,
  })
    .then((response) => {

      // console.log(response)
      if(response.status == 200) {
          message(
          "center",
          "Se inicio sesión correctamente",
          "¡Bienvenido!",
          1500
        );
        router.push('/administration')
      }
      return response.json();
    })
    .then((data) => {

      console.log("yeni",data)
      localStorage.setItem("loguedUserToken", JSON.stringify(data.token));
      localStorage.setItem("loguedUserName", JSON.stringify(data.user.userName));
      userAuthentication.addUserAuthen(data.user.userName)
    })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
};

</script>
<template>
   <div>
      <form class="form" @submit.prevent="submitForm()">
        <h2 class="form-title my-3">Inicio de Sesión</h2>
        <div class="mb-3">
          <label for="exampleInputUser" class="form-label">Usuario</label>
          <input type="text" class="form-control" id="exampleInputUser" aria-describedby="userHelp" v-model="formLogin.userName">
          <span v-for="error in v$.userName.$errors" .key="error.$uid" style="color: red;">{{error.$message}}</span>
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