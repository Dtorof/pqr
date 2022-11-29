<script setup >
import { reactive, ref, onMounted, computed} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, numeric,alpha, helpers } from '@vuelidate/validators'
import {useRouter } from 'vue-router';
import { useAuthenticationStore } from '../../stores/authentication';


const user_authen = useAuthenticationStore(); 
const token_authen = useAuthenticationStore(); 
const user_name = useAuthenticationStore();
const user_id = useAuthenticationStore(); 

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

window.addEventListener("unhandledrejection", (event) => {
  console.warn(`Ahora SI: UNHANDLED PROMISE REJECTION: ${event.reason}`);
  console.info("Ahora si anda");
  event.preventDefault();
})

const LoginData = async () => {
  const formData = new FormData();
  formData.append("userName", formLogin.userName);
  formData.append("password", formLogin.password);
  
// console.log(formData)
  const urlDB = `https://pqrs01-production.up.railway.app/api/v1/auth/login`;
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
        router.push("/administration")
      } else {
        messageError("registrarse, por favor...");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      token_authen.token(data.token)
      user_name.userName(data.user.userName)
      user_id.userId(data.user.id)
      user_authen.addUserAuthen(data)
    
      // console.log( user_authen.addUserAuthen)
      // console.log( user_authen.getUserId)
      // console.log(user_authen)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

</script>
<template>
  <div class="row">
    <div class="col imagen" >
      <img  class="container-main__img" src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="imagen home" srcset="">

    </div>

    <div class="col">
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
  </div>
 
    <!-- <RouterView /> -->
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
.imagen img{
  width: 100%;
  height: 80%;
  margin-top: 5%;
}
</style>