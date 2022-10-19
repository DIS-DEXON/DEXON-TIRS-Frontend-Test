import Vue from 'vue'
import Vuex from 'vuex'
import axios from "/axios.js";
import router from '/src/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'dev', //dev, prod
    modeURL: {
      dev: 'https://localhost:5001/',
      prod: 'https://ai.dexon-technology.com:443/'
    },
    urlApi: {
      dev: 'https://localhost:44338/api',
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
      managementApps: [
        {
          id: 100,
          name: "Executive Summary",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
        {
          id: 102,
          name: "Clients",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
        {
          id: 103,
          name: "Master Data Manager",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/md/applicable-status",
          isActive: true,
        },
        {
          id: 105,
          name: "User Account Manager",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
      ],
      staffApps: [
        {
          id: 101,
          name: "Tank List",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
      ],
      clientApps: [
        {
          id: 101,
          name: "Tank List",
          icon: "/img/icon_sidebar/executive_management/summary.png",
          icon_menu: '/img/icon_menu/executive_management/summary.png',
          link: "/executive-report",
          isActive: true,
        },
      ]
    },
    sidebarMasterDateList: [
      {
        id: 100,
        name: "Applicable Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/applicable-status",
        isActive: true,
      },
      {
        id: 100,
        name: "Bottom Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/bottom-type",
        isActive: true,
      },
      {
        id: 100,
        name: "Construction Code",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/construction-code",
        isActive: true,
      },
      {
        id: 100,
        name: "Dexon Department",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/dexon-department",
        isActive: true,
      },
      {
        id: 100,
        name: "Dexon Position",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/dexon-position",
        isActive: true,
      },
      {
        id: 100,
        name: "Foundation",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/foundation",
        isActive: true,
      },
      {
        id: 100,
        name: "Inspection Code",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/inspection-code",
        isActive: true,
      },
      {
        id: 100,
        name: "Prefix",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/prefix",
        isActive: true,
      },
      {
        id: 100,
        name: "Product",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/product",
        isActive: true,
      },
      {
        id: 100,
        name: "Roof Shade",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/roof-shade",
        isActive: true,
      },
      {
        id: 100,
        name: "Roof Type",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/roof-type",
        isActive: true,
      },
      {
        id: 100,
        name: "Tank Integrity Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/tank-integrity-status",
        isActive: true,
      },
      {
        id: 100,
        name: "Tank Internal Pressure",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/tank-internal-pressure",
        isActive: true,
      },
      {
        id: 100,
        name: "Tank Status",
        icon: "/img/icon_sidebar/executive_management/summary.png",
        icon_menu: '/img/icon_menu/executive_management/summary.png',
        link: "/md/tank-status",
        isActive: true,
      },
    ],
    sidebarList: {
    },
    inAppMessage: {
      noData: "<div class='no-data-box' style='display: flex;justify-content: center;align-items: center;flex-direction: column;color: #a6a6a6;height: 200px;'><div><i class='las la-folder-open' style='margin-right:10px;font-size:20px;'></i><span>No Data</span></div></div>",
    },
    currentViewClient: null,
    currentViewTank: null,
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
    UPDATE_CURRENT_VIEW_CLIENT: (state, payload) => {
      if (payload) {
        state.currentViewClient = payload;
      }
    },
    UPDATE_CURRENT_VIEW_TANK: (state, payload) => {
      if (payload) {
        state.currentViewTank = payload;
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
