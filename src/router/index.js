
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component:Home
  },
  {
    path: "/home",
    component:Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { title:"關於"}
  },
  {
    path:"/program",
    name:"Program",
    component:()=> import(/* webpackChunkName: "program" */ "../views/Program.vue")
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import(/* webpackChunkName: "login" */"../views/Others/Personal/Login.vue")
  },
  {
    path:"/register",
    name:"Register",
    component:()=>import(/* webpackChunkName: "login" */"../views/Others/Personal/Register.vue")
  },
  {
    path:"/personal",
    name:"Personal",
    component:()=> import(/* webpackChunkName: "personal" */"../views/Others/Personal/Personal.vue")
  },
  {
    path:"/creativity",
    name:"Creativity",
    component:()=> import(/* webpackChunkName: "creativity" */"../views/Others/Creativity.vue")
  },
  {
    path:"/outdoors",
    name:"Outdoors",
    component:()=> import(/* webpackChunkName: "outdoors" */"../views/Others/Outdoors.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router