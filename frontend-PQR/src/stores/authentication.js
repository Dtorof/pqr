import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('AuthenticationStore', {
    state: () => ({
        user_authen: "", 
    }),
    getters: {
       getUserAuthen : (state) =>  state.user_authen,
      
    },
    actions: {
        addUserAuthen(loguedUser) { 
            this.user_authen = loguedUser;
            console.log(this.user_authen)
            return  this.user_authen
        }     
    }
})