
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home'
import Login from '../view/Login'

import Me from '../view/Me'
import Main from '../view/Main'
import Category from '../view/category/Category'
import ErrorPage from '../view/ErrorPage'
import Register from '../view/Register'

import BookDetail from '../view/book/BookDetail'

const routes = [{
  path: '/',
  redirect: '/login',
},{
  path: '/register',
  name:'Register',
  component: Register
 
},
{
  path: '/home',
  name: 'Home',
  component: Home,
  redirect: '/home/index',
  children: [{
    path: 'index',
    component: Main
  }
    , {
    path: 'me',
    component: Me
  } , {
    path: 'category',
    component: Category
  }
  ]
},
{
  path: '/bookdetail',
  name: 'bookdetail',
  component: BookDetail
},
{
  path: '/login',
  name: 'login',
  component: Login
},

{
  path: '/errorpage',
  name: 'errorpage',
  component: ErrorPage
},
]

const router = createRouter({

  history: createWebHashHistory(),
  routes, // `routes: routes`
})

export default router;
