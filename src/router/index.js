import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/program',
    name:'Program',
    component:()=> import('../views/Program.vue')
  },
  {
    path:'/game',
    name:'Game',
    component:()=> import('../views/Hobby/Game.vue')
  },
  {
    path:'/creativity',
    name:'Creativity',
    component:()=> import('../views/Hobby/Creativity.vue')
  },
  {
    path:'/outdoors',
    name:'Outdoors',
    component:()=> import('../views/Hobby/Outdoors.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router