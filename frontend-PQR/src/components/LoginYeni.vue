<script setup >
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

let userName = ref("cassasdadsandra@gmail.com");
let password = ref("123");
let dateLogin = ref([]);

const login = ref([]);
const loginLocal = ref([]);

let close = ref(false);
let error1 = ref(false);
let error2 = ref(false);

let state = ref(false);
let stateLocal = ref(false);

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

const getError = () => {
  if (userName.value == "") {
    error1.value = true;
  } else {
    error1.value = false;
  }
  if (password.value == "") {
    error2.value = true;
  } else {
    error2.value = false;
  }
};
const validation = () => {
  // console.log(login.value);
  getError();
  if (error1.value == true || error2.value == true) {
  } else {
    sendData();
  }
};
const sendData = async () => {
  const formData = new FormData();
  formData.append("userName", userName.value);
  formData.append("password", password.value);

  const urlDB = `https://pqr-production.up.railway.app/api/v1/auth/login`;
  await fetch(urlDB, {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dateLogin.value = data;
      state.value=true;
      console.log("yenifer",dateLogin.value);
    //   if (dateLogin.value.validLogin == true) {
    //     routing();
    //     message("center", "Ingreso correctamente", "Ha iniciado sesión", 1500);
    //   } else {
    //     localStorage.setItem("stateLocal", false);
    //     message("center", "Ingreso fallido", "Verifique sus datos", 1500);
    //   }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const routing = () => {
  localStorage.setItem("dataUser", JSON.stringify(dateLogin.value.user));
  loginLocal.value = JSON.parse(localStorage.getItem("dataUser"));

  localStorage.setItem("stateLocal", state.value);
  stateLocal.value = JSON.parse(localStorage.getItem("stateLocal"));

  console.log(loginLocal.value);

  

  let closeModal = document.getElementById("close2");
  closeModal.click();
};
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="container">
          <div class="modal-body">
            <div class="row">
              <div class="col text-center">
                <h3>Inicio de sesión</h3>
              </div>
              <div class="col" v-show="close">
                <button id="close2"  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="row" id="user">
              <img
                class="user"
                src="https://i.ibb.co/0FXdxnM/user2-0.png"
                alt="user2-0"
              />
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Correo</label>
                <input v-model="userName" class="form-control" type="text" />
                <span class="error" v-if="error1" style="color: red"
                  >Por favor ingrese el correo</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Contraseña</label>
                <input
                  v-model="password"
                  class="form-control"
                  type="password"
                />
                <span class="error" v-if="error2" style="color: red"
                  >Por favor ingrese la contraseña</span
                >
              </div>
            </div>
            <button
              @click="validation()"
              id="close2"
              type="button"
              class="btn btn-1 mt-3 aling-text-center"
              
            >
              Inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button data-bs-toggle="modal" data-bs-target="#exampleModal1"></button>
  
</template>
<style scoped>
.user {
  width: 55vh;
  height: 30vh;
  display: block;
  margin: auto;
}
.btn-1 {
  width: 100%;
  background: #b20837;
  color: white;
}
</style>