import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useData1 = defineStore("data1", () => {
    
    //estado 
    const data1 = ref([]);
    const pqrsPinia = ref([]);
    const viewLogin = ref(false);




    //acciones

    // const add = (data) => {
    //     data1.value.push(data)
    //     // data1.value=data
    // }




        
    

    //retornar
    return {
        
        data1,
        pqrsPinia,
        viewLogin,

    };
});


//    const double = computed(()=>{
    
//    });