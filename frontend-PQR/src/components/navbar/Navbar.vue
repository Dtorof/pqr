<script setup>
import { ref, onMounted } from 'vue'
import { useRouter , useRoute} from 'vue-router';
import { useAuthenticationStore } from '../../stores/authentication';


const user_name = useAuthenticationStore(); 
const token_authen = useAuthenticationStore(); 
const user_authen = useAuthenticationStore(); 
const user_id = useAuthenticationStore(); 

// console.log( user_authen.addUserAuthen)
// console.log( user_authen.getUserId)
// console.log(user_authen)

const router = useRouter();
const route = useRoute();


let sessionUser =  ref("")

onMounted(() => {
  token_authen.addToken()
  // console.log(user_authen.addUserAuthen())
  user_id.addId()
  user_name.addUserName()
});

const logout = () => {
  localStorage.removeItem("loguedUserName")
  localStorage.removeItem("loguedUserToken")
  localStorage.removeItem("loguedUserId")
  router.push('/')
}
const classComputed = () => {

}
</script>
<template>
 <nav class="navbar navbar-expand-sm" :class="classComputed">
   <div class="container-fluid">
    <RouterLink to="/administration" class="navbar-brand logo" href="javascript:void(0)">PQR Management</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">  
        <li class="nav-item">
          <RouterLink to="/user" class="nav-link text-white  active" href="#">Usuarios</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/customer" class="nav-link text-white  active" href="#">Clientes</RouterLink>
        </li>     
        <li class="nav-item">
          <RouterLink to="/category" class="nav-link text-white  active" href="#">Categorias</RouterLink>
        </li> 
        <li class="nav-item">
          <RouterLink to="/traceabily" class="nav-link text-white  active" href="#">Trazabilidad</RouterLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white  active" href="#" role="button" data-bs-toggle="dropdown">PQR</a>
          <ul class="dropdown-menu">
            <li class="nav-item">
              <RouterLink to="/crearPQR" class="nav-link text-white active" href="#">Crear PQRS </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/typePQR" class="nav-link text-white active" href="#">Crear Tipo PQRS</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/responsePQR" class="nav-link text-white active" href="#">Responder PQRS</RouterLink>
            </li>
          </ul>
        </li>
        <li class="nav-item avatar">
          <a class="navbar-brand avatar-icon" href="#">
              <img  src="https://www.svgrepo.com/show/209349/user-avatar.svg" alt="Avatar Logo" style="width:40px;" class="rounded-pill"> 
          </a>
          <span class="text-white">{{user_name.getUserName}}</span>
        </li>
        <li class="nav-item">
          <RouterLink to="/" @click="logout" class="nav-link active" href="#">
            <i class="fa-solid fa-right-from-bracket icon"></i>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView />
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&family=Rubik+Dirt&display=swap');

.logo {
    font-family: 'Courgette', cursive;
    font-size: 32px;
    color: white;
    font-weight: bolder;
}
.navbar, .dropdown-menu.show {
  background-color: #223026;
}
 .dropdown-menu.show {
   font-size: 0.9rem;
 }
.navbar-collapse {
    flex-grow: 0;
    align-items: flex-end;
  }
.nav-link {
    width: 120px;
    margin: 5px 10px;
  }
  .icon {
    font-size: 2rem;
    color: white;
  }
 
 
/* .avatar-icon {
  width: 100%;
  border-radius: 50%;
  background: #416864;
}
.img-avatar {
  width: 30%;
} */
.avatar{
  display: flex;
  flex-direction: column;
}
@media (min-width: 481px) {
  .nav-link {
    width: 90%;
    margin: 2px 28px;
    font-size: 0.8rem;
  }
}
@media (min-width: 576px) {
  .navbar-collapse {
    flex-grow: 0;
    align-items: flex-end;
  }
  .nav-link {
    width: 100%;
    margin: 2px 0px;
    font-size: 0.7rem;
  }
  .navbar-expand-sm {
    flex-wrap: nowrap;
    /* justify-content: flex-start; */
  }
}
@media (min-width: 768px) {
  .navbar-collapse {
    flex-grow: 0;
    align-items: flex-end;
  }
  .nav-link {
    width: 100%;
    margin: 5px 1px;
    font-size: 1.2rem;
  }
}
@media (min-width: 1023px) {
  .nav-link {
    width: 100%;
    margin: 5px 10px;
    font-size: 1.4rem;
  }

} 

/* hace que se señale la ruta donde esta el usuario */

.router-link-exact-active {
  color: #00c6ab !important;
}
</style>