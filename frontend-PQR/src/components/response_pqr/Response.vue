<template>
 <div class="col m-5">
                    <!-- tabla-->
                    <div class="row" id="tabla">
                        <div class="container pe-4 ps-4">
                            <div class="table-responsive">
                                <table class="table table-bordered border-dark border-5 ">
                                    <thead class="table-header">
                                        <tr class="text-center">
                                            <th class="col-2">Cliente</th>
                                            <th class="col-2">Tipo</th>
                                            <th class="col-2">Fecha</th>
                                            <th class="col-2">Descripción</th>
                                            <th class="col-2">Estado</th>
                                            <th class="col-2">Responder</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <tr class="body" v-for="item in  dataVentasLocal" :key="item.name">
                                            <td v-text="item.id"></td>
                                            <td >{{item.amount}}-{{item.product.product_name}}</td>
                                            <td >$ {{thousandSeparator(item.total)}}</td>
                                        </tr> -->
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
</template>
<style scoped>

.table-header{
  background: rgba(37,219,148,0.7);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(37,219,148,0.35);
}

</style>