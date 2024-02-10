import firebase from "firebase/compat/app";
import "@/firebase";
import "firebase/compat/auth";

export default{
  namespaced: true,
  state:{
    data:{
      email: "",
    }
  },
  mutations:{
    SETDATA(state, data){
      state.data.email = data;
    }
  },
  actions:{
    GETDATA(context){
      firebase.auth().onAuthStateChanged(user => {
        context.commit("SETDATA", user.email);
      });
    }
  }
};