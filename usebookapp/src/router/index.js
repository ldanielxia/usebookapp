
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home'
import Login from '../view/Login'

import Me from '../view/Me'
import Main from '../view/Main'
import Category from '../view/category/Category'
import ErrorPage from '../view/ErrorPage'
import Register from '../view/Register'

import BookDetail from '../view/book/BookDetail'
import BookListByCategory from '../view/book/BookListByCategory'
import MyFavoriteBook from '../view/book/MyFavoriteBook'

import Infomation from '../view/my/Infomation'

// 2. define some routes
// Each route needs to be mapped to a component.
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
        path: '/myfavoritebook',
        name: 'myfavoritebook',
        component: MyFavoriteBook
      },
    {
    path: '/bookListbycategory',
    name: 'bookListbycategory',
    component: BookListByCategory
    },
 {
        path: '/infomation',
        name: 'infomation',
        component: Infomation
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

// 3. Create a routing instance and pass the `routes` configuration
const router = createRouter({
  // 4. The implementation of the history mode is provided internally. For simplicity, we use hash mode here.
  history: createWebHashHistory(),
  routes, // `routes: routes` 
})

export default router;
