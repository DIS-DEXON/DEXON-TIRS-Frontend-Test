// import { h } from 'vue'
// import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
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
    // TANK
    path: '/tank',
    name: 'Tank',
    component: () => import('../views/Applications/TankList/router-template.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
    children: [
      {
        path: 'client/:id_company',
        alias: 'Tank List',
        component: () => import('../views/Applications/TankList/TankList.vue'),
      },
      {
        path: 'client/:id_company/tag/:id_tag',
        alias: 'Tank Info',
        component: () => import('../views/Applications/TankList/Pages/router-template.vue'),
        children: [
          {
            path: 'info',
            alias: 'Tank Info',
            component: () => import('../views/Applications/TankList/Pages/Information/Page.vue'),
          },
          {
            path: 'insp-record',
            alias: 'Tank Inspection Record',
            component: () => import('../views/Applications/TankList/Pages/InspectionRecord/Page.vue'),
          },
          {
            path: 'marked-up-drawing/component/:id_component',
            alias: 'Marked-up Drawing',
            component: () => import('../views/Applications/TankList/Pages/MarkedUpDwg/Page.vue'),
          },
          {
            path: 'checklist/form/:id_checklist',
            alias: 'Checklist',
            component: () => import('../views/Applications/TankList/Pages/Checklist/Page.vue'),
          },
          {
            path: 'thickness/roof',
            alias: 'Thickness Roof',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Roof.vue'),
          },
          {
            path: 'thickness/shell',
            alias: 'Thickness Shell',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Shell.vue'),
          },
          {
            path: 'visual',
            alias: 'Thickness Visual',
            component: () => import('../views/Applications/TankList/Pages/Visual/Page.vue'),
          },
          {
            path: 'repair',
            alias: 'Repair Record',
            component: () => import('../views/Applications/TankList/Pages/RepairRecord/Page.vue'),
          },
          {
            path: 'thickness/roof-nozzle',
            alias: 'Thickness Roof Nozzle',
            component: () => import('../views/Applications/TankList/Pages/Thickness/RoofNz.vue'),
          },
          {
            path: 'thickness/shell-nozzle',
            alias: 'Thickness Shell Nozzle',
            component: () => import('../views/Applications/TankList/Pages/Thickness/ShellNz.vue'),
          },
          {
            path: 'thickness/bottom',
            alias: 'Thickness Shell Bottom',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Bottom.vue'),
          },
          {
            path: 'thickness/annular',
            alias: 'Thickness Shell Annular',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Annular.vue'),
          },
          {
            path: 'thickness/coil',
            alias: 'Coil',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Coil.vue'),
          },
          {
            path: 'thickness/piping',
            alias: 'Piping',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Piping.vue'),
          },
          {
            path: 'thickness/sump',
            alias: 'Sump',
            component: () => import('../views/Applications/TankList/Pages/Thickness/Sump.vue'),
          },
          {
            path: 'thickness/critical-zone',
            alias: 'Sump',
            component: () => import('../views/Applications/TankList/Pages/Thickness/CriticalZone.vue'),
          },
          {
            path: 'thickness/project-plate',
            alias: 'Projection Plate',
            component: () => import('../views/Applications/TankList/Pages/Thickness/ProjectionPlate.vue'),
          },
          {
            path: 'thickness/mfl-bottom',
            alias: 'MFL Bottom',
            component: () => import('../views/Applications/TankList/Pages/Thickness/MflBottom.vue'),
          },
          {
            path: 'thickness/mfl-annular',
            alias: 'MFL Annular',
            component: () => import('../views/Applications/TankList/Pages/Thickness/MflAnnular.vue'),
          },
          {
            path: 'evaluation/shell-settlement',
            alias: 'Eva Shell Settlement',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/ShellSettlement.vue'),
          },
          {
            path: 'evaluation/local-deviations',
            alias: 'Eva Local Deviations',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/LocalDeviations.vue'),
          },
          {
            path: 'evaluation/ground-connection',
            alias: 'Eva Grounding Connection',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/GroundingConnection.vue'),
          },
          {
            path: 'evaluation/roundness',
            alias: 'Eva Roundness',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/Roundness.vue'),
          },
          {
            path: 'evaluation/mrt',
            alias: 'Eva MRT',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/MRT.vue'),
          },
          {
            path: 'evaluation/bottom-settlement',
            alias: 'Eva Bottom Settlement',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/BottomSettlement.vue'),
          },
          {
            path: 'evaluation/shell-buckling',
            alias: 'Eva Buckling',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/Buckling.vue'),
          },
          {
            path: 'evaluation/shell-plumness',
            alias: 'Eva Plumness',
            component: () => import('../views/Applications/TankList/Pages/Evaluation/ShellPlumness.vue'),
          },
          {
            path: 'report',
            alias: 'Report',
            component: () => import('../views/Applications/TankList/Pages/Report/ReportTest.vue'),
          },
        ]
      },
    ]
  },
  {
    // USER ACCOUNT MANAGER
    path: '/user-account-manager',
    name: 'User Account Manager',
    component: () => import('../views/Applications/UserAccountManager/UserList.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
  },
  {
    // CLIENT COMPANY MANAGER
    path: '/client-company-manager',
    name: 'Client Company Manager',
    component: () => import('../views/Applications/ClientCompany/ClientCompanyList.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
  },
  {
    // CLIENT COMPANY INFO
    path: '/client-company-manager/client/:id_client',
    name: 'Client Company Manager',
    component: () => import('../views/Applications/ClientCompany/ClientCompanyInfo.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (store.state.user.role == 'manager' || store.state.user.role == 'admin') next()
    //   else next('/')
    // },
  },
  {
    // MASTER DATA
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
        path: 'prefix',
        alias: 'Prefix',
        component: () => import('../views/Applications/MasterData/Prefix.vue'),
      },
      {
        path: 'product',
        alias: 'Product',
        component: () => import('../views/Applications/MasterData/Product.vue'),
      },
      {
        path: 'roof-shade',
        alias: 'Roof Shade',
        component: () => import('../views/Applications/MasterData/RoofShade.vue'),
      },
      {
        path: 'roof-type',
        alias: 'Roof Type',
        component: () => import('../views/Applications/MasterData/RoofType.vue'),
      },
      {
        path: 'tank-integrity-status',
        alias: 'Tank Integrity Status',
        component: () => import('../views/Applications/MasterData/TankIntegrityStatus.vue'),
      },
      {
        path: 'tank-internal-pressure',
        alias: 'Tank Internal Pressure',
        component: () => import('../views/Applications/MasterData/TankInternalPressure.vue'),
      },
      {
        path: 'tank-status',
        alias: 'Tank Status',
        component: () => import('../views/Applications/MasterData/TankStatus.vue'),
      },
      {
        path: 'list/:id_client',
        alias: 'Tank List',
        component: () => import('../views/Applications/TankList/TankList.vue'),
      },
      {
        path: 'tank-material',
        alias: 'Tank Material',
        component: () => import('../views/Applications/MasterData/TankMaterial.vue'),
      },
      {
        path: 'insulation',
        alias: 'Insulation',
        component: () => import('../views/Applications/MasterData/Insulation.vue'),
      },
    ]
  }
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

