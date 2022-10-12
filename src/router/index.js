// import { h } from 'vue'
// import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
    //APP PROJECT MANAGER
    path: '/projectmanager',
    name: 'Project Manager',
    beforeEnter: (to, from, next) => {
      if (store.state.user.role != 'ceo') next()
      else next('/')
    },
    component: () => import('../views/Applications/ProjectManager/router-template.vue'),
    children: [
      {
        path: 'projects',
        alias: 'Project Manager',
        component: () => import('../views/Applications/ProjectManager/Projects/ProjectsList.vue'),
      },
      {
        path: 'projects/:id_project',
        alias: 'Project Manager',
        component: () => import('../views/Applications/ProjectManager/Projects/ProjectsInfo.vue'),
      },
    ]
  },
  {
    // APP CONTACTS
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Applications/Contact/router-template.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.role != 'ceo') next()
      else next('/')
    },
    children: [
      {
        path: 'client',
        alias: 'Contact',
        component: () => import('../views/Applications/Contact/Client/ClientList.vue'),
      }
    ]
  },
  {
    // APP RECORDS
    path: '/record',
    name: 'Record',
    component: () => import('../views/Applications/Record/router-template.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.role != 'ceo') next()
      else next('/')
    },
    children: [
      {
        path: 'visiting',
        alias: 'Visiting Record',
        component: () => import('../views/Applications/Record/Visiting/VisitRecordList.vue'),
      },
      {
        path: 'visiting/:id_visit',
        alias: 'Visiting Record',
        component: () => import('../views/Applications/Record/Visiting/VisitRecordInfo.vue'),
      },
      {
        path: 'gas-bill',
        alias: 'Gas Bill Record',
        component: () => import('../views/Applications/Record/GasBill/GasBillList.vue'),
      },
      {
        path: 'mileage',
        alias: 'Mileage Record',
        component: () => import('../views/Applications/Record/Mileage/MileageList.vue'),
      },
      {
        path: 'travel',
        alias: 'Travel Record',
        component: () => import('../views/Applications/Record/Travel/TravelList.vue'),
      },
      {
        path: 'travel/:id_travel',
        alias: 'Travel Record',
        component: () => import('../views/Applications/Record/Travel/TravelInfo.vue'),
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
  {
    // EXECUTIVE MANAGEMENT
    path: '/executive-management',
    name: 'Executive Management',
    component: () => import('../views/Applications/ExecutiveManagement/router-template.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
      else next('/')
    },
    children: [

      {
        path: 'weekly-report',
        alias: 'Weekly Report',
        component: () => import('../views/Applications/ExecutiveManagement/WeeklyReport/WeeklyReportList.vue'),
      },
      {
        path: 'weekly-report/:id_weekly',
        alias: 'Weekly Report',
        component: () => import('../views/Applications/ExecutiveManagement/WeeklyReport/WeeklyReportInfo.vue'),
      },
      {
        path: 'sales-current',
        alias: 'Sales Current',
        component: () => import('../views/Applications/ExecutiveManagement/Sales/SalesCurrentDashboard.vue'),
      },
      {
        path: 'sales-forecast',
        alias: 'Sales Forecast',
        component: () => import('../views/Applications/ExecutiveManagement/Sales/SalesForecastDashboard.vue'),
      },
      {
        path: 'project-upcoming',
        alias: 'Project Upcoming',
        component: () => import('../views/Applications/ExecutiveManagement/ProjectUpcoming/ProjectUpcomingList.vue'),
      },
      {
        path: 'project-upcoming/:id_upcoming_project',
        alias: 'Project Upcoming Info',
        component: () => import('../views/Applications/ExecutiveManagement/ProjectUpcoming/ProjectUpcomingInfo.vue'),
      },
      {
        path: 'project-progress',
        alias: 'Project Progress',
        component: () => import('../views/Applications/ExecutiveManagement/ProjectProgress/ProjectProgressDashboard.vue'),
      },
    ]
  },
  {
    // EXECUTIVE MANAGEMENT
    path: '/executive-report',
    name: 'Executive Report',
    component: () => import('../views/Applications/ExecutiveManagement/SummaryReport.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.user.role != 'staff') next()
      else next('/')
    }
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

