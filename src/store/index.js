import Vue from 'vue'
import Vuex from 'vuex'
import axios from "/axios.js";
import router from '/src/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'dev', //dev, prod
    modeURL: {
      dev: 'https://localhost:8081/',
      prod: 'https://ai.dexon-technology.com:443/'
    },
    urlApi: {
      dev: 'https://localhost:8081/api',
      prod: 'https://ai.dexon-technology.com:443/api',
    },
    user: '',
    appIcon: '/app-icon.png',
    currentInApp: '',
    status: {
      fullscreenAlert: false,
      server: true,
      token: true,
    },
    appsList: {
      executiveSummary: [
        {
          id: 100,
          name: "Executive Report",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
      ],
      executiveManagement: [
        {
          id: 100,
          name: "Executive Report",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
        {
          id: 0,
          name: "Weekly Report",
          icon: "/img/icon_sidebar/executive_management/weekly.png",
          icon_menu: '/img/icon_menu/executive_management/weekly.png',
          link: "/executive-management/weekly-report",
          isActive: true,
        },
        {
          id: 1,
          name: "Current Revenue",
          icon: "/img/icon_sidebar/executive_management/current-sale.png",
          icon_menu: '/img/icon_menu/executive_management/current-sale.png',
          link: "/executive-management/sales-current",
          isActive: true,
        },
        {
          id: 2,
          name: "Forecast Revenue",
          icon: "/img/icon_sidebar/executive_management/forecast-sale.png",
          icon_menu: '/img/icon_menu/executive_management/forecast-sale.png',
          link: "/executive-management/sales-forecast",
          isActive: true,
        },
        {
          id: 3,
          name: "Project Progress",
          icon: "/img/icon_sidebar/executive_management/progress.png",
          icon_menu: '/img/icon_menu/executive_management/progress.png',
          link: "/executive-management/project-progress",
          isActive: true,
        },
        {
          id: 4,
          name: "Upcoming Project",
          icon: "/img/icon_sidebar/executive_management/upcoming.png",
          icon_menu: '/img/icon_menu/executive_management/upcoming.png',
          link: "/executive-management/project-upcoming",
          isActive: true,
        },

      ],
      projectManager: [
        {
          id: 0,
          name: "Project Manager",
          icon: "/img/icon_sidebar/project_manager/project.png",
          icon_menu: '/img/icon_menu/project_manager/project.png',
          link: "/projectmanager/projects",
          isActive: true,
        },
        // {
        //   id: 2,
        //   name: "Purchase Order",
        //   icon: "/img/icon_sidebar/project_manager/po.png",
        //   icon_menu: '/img/icon_menu/project_manager/po.png',
        //   link: "/projectmanager/po",
        //   isActive: false,
        // },
      ],
      contact: [
        // {
        //      id: 0,
        //     name: "Internal Contact",
        //     icon: "/img/icon_sidebar/contact/contact.png",
        //     icon_menu: '/img/icon_menu/contact/contact.png',
        //     link: "/contact/contact",
        //      isActive: false,
        // },
        {
          id: 1,
          name: "Client Contact",
          icon: "/img/icon_sidebar/contact/client.png",
          icon_menu: '/img/icon_menu/contact/client.png',
          link: "/contact/client",
          isActive: true,
        },
      ],
      record: [
        // {
        //   id: 0,
        //   name: "Meeting Record",
        //   icon: "/img/icon_sidebar/record/mom.png",
        //   icon_menu: '/img/icon_menu/record/mom.png',
        //   link: "/record/meeting",
        //   isActive: false,
        // },
        {
          id: 1,
          name: "Visiting Record",
          icon: "/img/icon_sidebar/record/visit.png",
          icon_menu: '/img/icon_menu/record/visit.png',
          link: "/record/visiting",
          isActive: true,
        },
        {
          id: 2,
          name: "Travel Record",
          icon: "/img/icon_sidebar/record/travel.png",
          icon_menu: '/img/icon_menu/record/travel.png',
          link: "/record/travel",
          isActive: true,
        },
        {
          id: 3,
          name: "Gas Bill Record",
          icon: "/img/icon_sidebar/record/gas.png",
          icon_menu: '/img/icon_menu/record/gas.png',
          link: "/record/gas-bill",
          isActive: true,
        },
        {
          id: 4,
          name: "Mileage Record",
          icon: "/img/icon_sidebar/record/mileage.png",
          icon_menu: '/img/icon_menu/record/mileage.png',
          link: "/record/mileage",
          isActive: true,
        },
        {
          id: 5,
          name: "Travel Cut-Off Record",
          icon: "/img/icon_sidebar/record/cutoff.png",
          icon_menu: '/img/icon_menu/record/cutoff.png',
          link: "/record/cutoff",
          isActive: false,
        },
      ],
      other: [
        {
          id: 0,
          name: "Issue Report",
          icon: "/img/icon_sidebar/other/issue.png",
          icon_menu: '/img/icon_menu/other/issue.png',
          link: "/other/issue-report",
          isActive: true,
        },
      ],
    },
    inAppMessage: {
      noData: "<div class='no-data-box' style='display: flex;justify-content: center;align-items: center;flex-direction: column;color: #a6a6a6;height: 200px;'><div><i class='las la-folder-open' style='margin-right:10px;font-size:20px;'></i><span>No Data</span></div></div>",
    }
  },
  getters: {
  },
  mutations: {
    UPDATE_CURRENT_INAPP: (state, payload) => {
      if (payload) state.currentInApp = payload;
      else console.log('error: no payload');
    },
    CLEAR_CURRENT_INAPP: (state) => {
      state.currentInApp = '';
    },
    SIGN_IN: (state, payload) => {
      state.user = payload
    },
    SIGN_OUT: (state) => {
      state.user = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
    VALIDATE_TOKEN: (state) => {
      axios({
        method: "get",
        url: "/home/connection-test",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {

            state.status.token = true;
            state.status.server = true;
            console.log("==> CONNECTION OK || TOKEN IS VALID <==")
          }

        })
        .catch((error) => {
          console.log(error)
          if (error.response.status == 0) {
            console.log('SERVER FAILED')
            state.status.server = false;
            state.status.fullscreenAlert = true;
            // alert('Cannot connect to server. Click "OK" to retry.')
            // router.go();
          }
          else if (error.response.status == 401) {
            console.log('TOKEN FAILED')
            state.status.token = false;
            state.status.fullscreenAlert = true;
            // alert('Session is expired. Please sign in again.')
            // localStorage.removeItem("user");
            // localStorage.removeItem("token");
            // router.push("/login");
          }
        })
        .finally(() => { });
    },
    FETCH_USER_INFO: (state) => {
      if (JSON.parse(localStorage.getItem("user"))) {
        var id_user = JSON.parse(localStorage.getItem("user")).id_user;
      }
      if (id_user) {
        axios({
          method: "post",
          url: "/user/get-info",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: { id_user },
        })
          .then((res) => {
            if (res.status == 200) {
              state.user = res.data.user;
              console.log("==> Fetch User Info : Vuex <==");
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          });
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
