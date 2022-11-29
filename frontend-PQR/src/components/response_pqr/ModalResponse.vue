<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useData1 } from "@/stores/ensayo";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthenticationStore } from "@/stores/authentication";

const dataPinea = useData1(); //no olvidar los parentisis
const user_id = useAuthenticationStore();


const { pqrsPinia } = storeToRefs(dataPinea);

const pqrsFilter = ref([]);

const data = () => {
  console.log("yenifer", user_id.getUserId);
  console.log("ortiz", pqrsPinia.value.id);

};
// {
//     "register_pqr_id": "157ae882-656b-4427-86d4-e1ccad2b879d",
//     "user_id" : 1,
//     "desc_solution": "Response"
// }

// const register_pqr_id = ref(pqrsPinia.value.id);  //id
// const user_id = ref("");


const confirmar = ref([])

const state = reactive({
  desc_solution: "",
});

const rules = computed(() => {
  return {
    desc_solution: {
      required,
    },
  };
});

const $v = useVuelidate(rules, state);

const messageError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};


const clear = () => {
  $v.value.$reset(); // ayuda a que no este todo en rojo
  state.desc_solution = "";
};

const sendValidations = async () => {
  const result = await $v.value.$validate();
  if (result) {
    sendData();
  } else {
    messageError("Verifique que todos los campos este llenos");
  }
};

const sendData = async () => {
  console.log("diego",pqrsPinia.value.id)
  console.log("diego",user_id.getUserId)
  const formData = new FormData();
  formData.append("register_pqr_id", pqrsPinia.value.id);
  formData.append("user_id",  user_id.getUserId);
  formData.append("desc_solution", state.desc_solution);

  console.log(pqrsPinia.value.id)
  const urlDB = `https://pqrs01-production.up.railway.app/api/v1/response-pqr`;
  await fetch(urlDB, {
    method: "POST",
    body: formData,
  })
    .then((response) => response)

    .then((response) => {
      user_id.value = response
      clear();
      messageCreate(
        "center",
        "Creación completada",
        "Se ha respondido correctamente la pqr",
        1500
      );
      let closeModal = document.getElementById("close");
      closeModal.click();

    location. reload()
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  

   
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

// onMounted(() => {
//   data();
// });

// console.log(data1.value)
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal999"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="sendValidations()">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Responder PQR</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- <H1>{{register_pqr_id}}</H1> -->
            <textarea
              v-model="state.desc_solution"
              :class="{ 'is-invalid': $v.desc_solution.$error }"
              class="mt-2"
              placeholder="Descripción"
            ></textarea>

            <span
              v-for="error in $v.desc_solution.$errors"
              :key="error.$uid"
              class="text-danger"
            >
              {{ (error.$message = "Por favor ingrese una respuesta") }}
            </span>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="close"
            >
              Cerrar
            </button>
            <button type="submit"   class="btn btn2">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
textarea {
  width: 100%;
}
.modal-header {
  background: var(--blue-purple);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(37, 219, 148, 0.35);
  color: var(--white);
}
.btn2 {
  background-color: rgba(37, 219, 148, 0.7);
}
</style>