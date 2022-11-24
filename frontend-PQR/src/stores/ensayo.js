import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useData1 = defineStore("data1", () => {
    
    //estado 
    const data1 = ref([]);
    // const pqrs = ref([]);
    //acciones

    const add = (data) => {
        data1.value.push(data)
        // data1.value=data
    }

   
    // const data = computed(()=>{
    //     const dataPqrs = async () => {
    //         const urlData = "https://pqr-production.up.railway.app/api/v1/pqr-users/1";
    //         await fetch(urlData)
    //           .then((resp) => resp.json())
    //           .then((data) => (pqrs.value = data));
    //         // console.log(pqrs.value)
    //     };


    // });
        
    

    //retornar
    return {
        
        data1,
     
        add,

    };
});


//    const double = computed(()=>{
    
//    });