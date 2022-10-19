// import { h } from 'vue'
// import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Log In',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/AccountView.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
  {
    // EXECUTIVE MANAGEMENT
    path: '/tank',
    name: 'Tank',
    component: () => import('../views/Applications/TankList/router-template.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
    children: [
      {
        path: 'list/:id_client',
        alias: 'Tank List',
        component: () => import('../views/Applications/TankList/TankList.vue'),
      },
      {
        path: 'list/:id_client/:id_tank/info',
        alias: 'Tank Info',
        component: () => import('../views/Applications/TankList/TankInfo.vue'),
      },
    ]
  },
  {
    // EXECUTIVE MANAGEMENT
    path: '/md',
    name: 'MasterData',
    component: () => import('../views/Applications/MasterData/router-template.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
    children: [
      {
        path: 'applicable-status',
        alias: 'Applicable Status',
        component: () => import('../views/Applications/MasterData/ApplicableStatus.vue'),
      },
      {
        path: 'bottom-type',
        alias: 'Bottom Type',
        component: () => import('../views/Applications/MasterData/BottomType.vue'),
      },
      {
        path: 'construction-code',
        alias: 'Construction Code',
        component: () => import('../views/Applications/MasterData/ConstructionCode.vue'),
      },
      {
        path: 'dexon-department',
        alias: 'Dexon Department',
        component: () => import('../views/Applications/MasterData/DexonDepartment.vue'),
      },
      {
        path: 'dexon-position',
        alias: 'Dexon Position',
        component: () => import('../views/Applications/MasterData/DexonPosition.vue'),
      },
      {
        path: 'foundation',
        alias: 'Foundation',
        component: () => import('../views/Applications/MasterData/Foundation.vue'),
      },
      {
        path: 'inspection-code',
        alias: 'Inspection Code',
        component: () => import('../views/Applications/MasterData/InspectionCode.vue'),
      },
      {
        path: 'list/:id_client',
        alias: 'Tank List',
        component: () => import('../views/Applications/TankList/TankList.vue'),
      }
    ]
  },
  {
    // EXECUTIVE MANAGEMENT
    path: '/executive-report',
    name: 'Executive Report',
    component: () => import('../views/Applications/ExecutiveManagement/SummaryReport.vue'),
    // beforeEnter: (to, from, next) => {
    // }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,

})

export default router

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

