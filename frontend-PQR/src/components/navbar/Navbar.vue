<template>
 <nav class="navbar navbar-expand-sm">
   <div class="container-fluid">
    <a class="navbar-brand logo" href="javascript:void(0)">PQR Manager</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link text-white" href="#">Crear PQR</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/createCategory" class="nav-link text-white" href="#">Crear Categoria</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/createResponsePQR" class="nav-link text-white" href="#">Responder PQR</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/createTraceabily" class="nav-link text-white" href="#">Trazabilidad</RouterLink>
        </li>
      </ul>
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="https://www.svgrepo.com/show/209349/user-avatar.svg" alt="Avatar Logo" style="width:40px;" class="rounded-pill"> 
        </a>
      </div>
    </div>
  </div>
</nav>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&family=Rubik+Dirt&display=swap');

.logo {
    font-family: 'Courgette', cursive;
    font-size: 32px;
    color: white;
    font-weight: bolder;
}
.navbar {
  background-color: #223026;
  color: white;
}
.navbar-collapse {
    flex-grow: 0;
    align-items: flex-end;
  }
.nav-link {
    width: 120px;
    margin: 5px 10px;
  }

</style>