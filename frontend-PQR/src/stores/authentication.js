import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('AuthenticationStore', {
    state: () => ({
        user_name: "",
        token_authen: "",
        user_authen : {},
        user_id: ""
       
    }),
    getters: {
       getUserName: (state) =>  state.user_name,
       getTokenAuthen : (state) => state.token_authen,
       getUserAuthen : (state) => state.user_authen,
       getUserId : (state) =>  state.user_id,
    },
    actions: {
        addUserName() { 
            this.user_name = JSON.parse(localStorage.getItem("loguedUserName"));
            return this.user_name
        },  
        addUserAuthen(user) {
            console.log(user)
             this.user_authen = user
             console.log(this.user_authen)
             return this.user_authen
        }, 
        addId(){
            this.user_id = JSON.parse(localStorage.getItem("loguedUserId"));
            return this.user_id 
        }, 
        addToken(){
            this.token_authen = JSON.parse(localStorage.getItem("loguedUserToken"));
            return this.token_authen 
        },
        token(token) {
           return localStorage.setItem("loguedUserToken", JSON.stringify(token));
        },
        userName(userName) {
           return localStorage.setItem("loguedUserName", JSON.stringify(userName)); 
        },
        userId(userId) {
            return localStorage.setItem("loguedUserId", JSON.stringify(userId)); 
         },  
         clear(){
            this.user_name = "",
            this.token_authen  = "",
            this.user_id = ""
         }
    }
})