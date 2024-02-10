import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/compat/app";
import "@/firebase";
import "firebase/compat/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component:()=> import(/* webpackChunkName: "main" */"@/@views/Main.vue"),
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import(/* webpackChunkName: "login" */"@/@views/Authorization/Login.vue"),
  },
  {
    path:"/register",
    name:"Register",
    component:()=>import(/* webpackChunkName: "register" */"@/@views/Authorization/Register.vue")
  },
  {
    path:"/records/:record_option",
    name: "Record_option",
    component:()=> import(/* webpackChunkName: "records" */ "@/@views/records/Records.vue"),
  },
  {
    path:"/perks",
    name:"Perks",
    component:()=> import(/* webpackChunkName: "perks" */"@/@views/Perks.vue"),
  },
  {
    path:"/editor",
    name:"Editor",
    component:() => import(/* webpackChunkName: "editor" */"@/@views/Editor/control.vue"),
    meta:{ "requiresAuth": true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) =>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(!requiresAuth){
    next();
    return;
  }
  firebase.auth().onAuthStateChanged(user => {
    if(!user){
      next("/login");
      return;
    } 
    else{
      next();
      return;
    }
  });
});

export default router;