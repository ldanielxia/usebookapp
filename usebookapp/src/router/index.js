
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home'
import Login from '../view/Login'

import Me from '../view/Me'
import Main from '../view/Main'
import Category from '../view/category/Category'
import ErrorPage from '../view/ErrorPage'
import Register from '../view/Register'

import BookDetail from '../view/book/BookDetail'
import BookOrder from '../view/book/BookOrder'

import BookListByCategory from '../view/book/BookListByCategory'
import MyFavoriteBook from '../view/book/MyFavoriteBook'
import MyOrderBook from '../view/book/MyOrderBook'
import BookOrderDetail from '../view/book/BookOrderDetail'
import MySaledBook from '../view/book/MySaledBook'

import MyUseBook from '../view/book/MyUseBook'
import MyUseBookNew from '../view/book/MyUseBookNew'
import MyUseBookEdit from '../view/book/MyUseBookEdit'
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
        path: '/order',
        name: 'order',
        component: BookOrder
          },
    {
        path: '/myfavoritebook',
        name: 'myfavoritebook',
        component: MyFavoriteBook
    },
    {
        path: '/myorderbook',
        name: 'myorderbook',
        component: MyOrderBook
    },
    {
        path: '/bookorderdetail',
        name: 'bookorderdetail',
        component: BookOrderDetail
    },
    {
        path: '/mysaledbook',
        name: 'mysaledbook',
        component: MySaledBook
    },
    {
        path: '/myusebook',
        name: 'myusebook',
        component: MyUseBook
    },
    {
        path: '/myusebooknew',
        name: 'myusebooknew',
        component: MyUseBookNew
      },
    {
        path: '/myusebookedit',
        name: 'myusebookedit',
        component: MyUseBookEdit
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
