import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/compat/app";
import "@/firebase";
import "firebase/compat/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component:()=> import("@/@views/Home.vue"),
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import("@/@views/authorization/Login.vue")
  },
  {
    path:"/register",
    name:"Register",
    component:()=>import("@/@views/authorization/Register.vue")
  },
  {
    path:"/characters",
    name:"Characters",
    component:()=> import("@/@views/character/Main.vue")
  },
  {
    path:"/character/:record_option",
    name: "Record_option",
    component:()=> import("@/@views/character/Character.vue"),
  },
  {
    path:"/perks",
    name:"Perks",
    component:()=> import("@/@views/Perks.vue"),
  },
  {
    path:"/editor",
    name:"Editor",
    component:() => import("@/@views/editor/Control.vue"),
    meta:{ "requiresAuth": true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
