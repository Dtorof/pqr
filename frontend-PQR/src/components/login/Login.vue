<script setup>

</script>
<template>
    <div>
      <form class="form">
        <h2 class="form-title my-3">Inicio de Sesión</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Usuario</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
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