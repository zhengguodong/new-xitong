import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
    state: {
        passkey:'',
        id_person:''
    },
    mutations: {
        setkey (state,data) {
            state.passkey=data
        },
        setid(state,data){
            state.id_person=data
        }
    }
})
export default store

