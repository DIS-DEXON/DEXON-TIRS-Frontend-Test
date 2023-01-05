<template>
  <div id="app-topbar" v-if="isLoginPage == false">
    <div class="app-topbar-wrapper">
      <div class="left-col">
        <div class="web-logo" v-on:click="GO_TO('/')">
          <img src="/img/logo.png" alt="" />
        </div>
        <div
          class="inapp-menu mobile-none"
          v-if="this.$store.state.currentInApp"
        >
          <div class="home-btn" v-on:click="GO_TO('/')">
            <i class="las la-home"></i>
          </div>
          <div class="btn-group-separater"></div>
          <div class="inapp-logo">
            <img :src="this.$store.state.currentInApp.icon" />
            <label for="">{{ this.$store.state.currentInApp.name }}</label>
          </div>
          <div
            class="inapp-logo client-logo"
            v-if="this.$store.state.currentClient"
          >
            <div class="btn-group-separater-client">
              <i class="las la-angle-right"></i>
            </div>
            <img :src="baseURL + this.$store.state.currentClient.logo" />
            <label for="">{{ this.$store.state.currentClient.name }}</label>
          </div>
          <!-- <div
            class="inapp-logo client-logo"
            v-if="this.$store.state.currentPageName"
          >
            <div class="btn-group-separater-client">
              <i class="las la-angle-right"></i>
            </div>
            <label for="" style="margin-left: 0px; font-weight: 600">{{
              this.$store.state.currentPageName
            }}</label>
          </div> -->
        </div>
        <label class="dev-mode-badge" v-if="this.$store.state.mode == 'dev'"
          >RUNNING IN DEVELOPMENT MODE <br />
          <span
            >change mode to 'prod' in store/index.js before deploy</span
          ></label
        >
      </div>

      <div class="right-col" v-if="user">
        <v-ons-toolbar-button
          v-on:click="SHOW_POPOVER($event, 'down', true)"
          style="padding-right: 0px"
        >
          <span class="mobile-none">
            {{ user.prefix_desc }} {{ user.first_name }} {{ user.middle_name }}
            {{ user.last_name }}
          </span>
          <div class="topbar-photo">
            <img :src="user.profile_picture" v-if="user.profile_picture" />
            <img
              src="/img/default_profile_picture.png"
              v-if="!user.profile_picture"
            />
          </div>
          <!-- <i class="las la-angle-down"></i> -->
        </v-ons-toolbar-button>
        <!-- <div
          class="btn-group-separater mobile-none"
          style="margin: 0 10px"
        ></div>
        <div class="mobile-none">
          <v-ons-toolbar-button v-on:click="SIGN_OUT()" style="padding: 0px">
            <span style="color: #ff4438; font-weight: 500">Sign out</span>
            <i
              class="las la-sign-out-alt"
              style="margin-right: 0px; color: #ff4438"
            ></i>
          </v-ons-toolbar-button>
        </div> -->

        <!-- POPUP PANEL -->
        <v-ons-popover
          cancelable
          :visible.sync="popoverVisible"
          :target="popoverTarget"
          :direction="popoverDirection"
          :cover-target="coverTarget"
        >
          <v-ons-toolbar-button class="popover-button" v-on:click="GO_TO('/')">
            <span>Home</span>
            <i class="las la-home"></i>
          </v-ons-toolbar-button>

          <hr />

          <v-ons-toolbar-button
            class="popover-button"
            v-on:click="GO_TO('/account')"
          >
            <span>My Account</span>
            <i class="las la-user-circle"></i>
          </v-ons-toolbar-button>

          <v-ons-toolbar-button
            class="popover-button"
            v-on:click="GO_TO('/helps')"
          >
            <span>Helps</span>
            <i class="lar la-question-circle"></i>
          </v-ons-toolbar-button>
          <!-- 
          <hr />

          <v-ons-toolbar-button class="popover-button">
            <span>เปลี่ยนเป็นภาษาไทย</span>
            <i class="fas fa-globe"></i>
          </v-ons-toolbar-button> -->

          <hr />

          <v-ons-toolbar-button
            class="popover-button popover-button-red mobile-none"
            v-on:click="SIGN_OUT()"
          >
            <span>Log Out</span>
            <i class="las la-sign-out-alt"></i>
          </v-ons-toolbar-button>
        </v-ons-popover>
      </div>
    </div>
  </div>
</template>

<script>
//API
import axios from "/axios.js";

export default {
  name: "AppTopBar",
  components: {},
  data() {
    return {
      popoverVisible: false,
      popoverTarget: null,
      popoverDirection: "up",
      coverTarget: false,
      user: "",
    };
  },
  created() {
    if (this.$store.state.status.server == true) this.FETCH_USER_INFO();
  },
  mounted() {},
  updated() {},
  methods: {
    FETCH_USER_INFO() {
      if (JSON.parse(localStorage.getItem("user"))) {
        var id_account = JSON.parse(localStorage.getItem("user")).id_account;
      }
      if (id_account) {
        axios({
          method: "post",
          url: "/account-user/get-info",
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: { id_account },
        })
          .then((res) => {
            if (res.status == 200) {
              var user = res.data[0];
              this.user = user;
              if (user.profile_picture == null) {
                this.user.profile_picture = null;
              } else {
                this.user.profile_picture =
                  this.baseURL + this.user.profile_picture;
              }
              this.$store.commit("SIGN_IN", this.user);
              // console.log("==> Fetch User Info : Top Bar <==");
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    SHOW_POPOVER(event, direction, coverTarget = false) {
      this.popoverTarget = event;
      this.popoverDirection = direction;
      this.coverTarget = coverTarget;
      this.popoverVisible = true;
    },
    GO_TO(path) {
      this.$store.commit("CLEAR_CURRENT_INAPP");
      this.$store.commit("CLEAR_CURRENT_CLIENT");
      var currentPath = this.$route.path;
      if (currentPath != path) {
        this.$router.push({ path: path, replace: true });
      }
    },
    SIGN_OUT() {
      this.popoverVisible = false;
      this.$ons.notification.confirm("Confirm Sign out?").then((res) => {
        if (res == 1) {
          this.$store.commit("SIGN_OUT");
          this.$router.push("/login");
        }
      });
    },
  },
  computed: {
    isLoginPage() {
      var path = this.$route.path;
      if (path == "/login") {
        return true;
      } else {
        return false;
      }
    },
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#app-topbar {
  width: 100%;
  height: 44px;
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  background: #fff;
  // backdrop-filter: blur(70px);
  // box-shadow: 0px 1px 4px rgb(0 0 0 / 15%);
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0;

  .app-topbar-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
  .left-col {
    display: flex;
    align-items: center;
    .sidebar-toggle {
      width: 40px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-left: 10px;
      border-radius: 6px;
      i {
        font-size: 18px;
        color: #5b5b5b;
      }
    }
    .web-logo {
      width: 100px;
      cursor: pointer;

      margin: 0 10px 0 20px;
      // cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      @media screen and (max-width: 768px) {
        width: 80px;
        margint-top: 4px;
      }
    }
    .inapp-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      .home-btn {
        width: 40px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 5px;
        border-radius: 6px;
        i {
          font-size: 18px;
          color: $web-font-color-grey;
        }
      }
      .home-btn:hover {
        background-color: #f6f6f6;
        i {
          color: $dexon-primary-blue;
        }
      }
      .inapp-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        img {
          height: 30px;
          object-fit: contain;
          -webkit-mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
            center/100% 100% no-repeat;
          mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
            center/100% 100% no-repeat;
        }
        label {
          font-size: 12px;
          font-weight: 600;
          margin-left: 10px;
          color: $web-font-color-grey;
        }
      }

      .client-logo {
        margin-left: 0px;
        img {
          height: 30px;
          -webkit-mask: none !important;
          mask: none !important;
        }
      }
    }
  }
  .right-col {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    .toolbar-button {
      height: 34px;
      padding: 0 10px;
      border: 0;
      border-radius: 6px;
      display: flex;

      span {
        color: $web-font-color-grey;
        font-size: 12px;
        font-weight: 500;
      }
    }
    .toolbar-button:hover > span {
      color: $web-font-color-blue;
    }
    .topbar-photo {
      width: 24px;
      height: 24px;
      border-radius: 100px;
      overflow: hidden;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

hr {
  margin: 0 auto;
  width: calc(100% - 20px);
}

.btn-group-separater {
  margin-right: 0;
}
.btn-group-separater-client {
  margin: 0 10px;
  i {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.1);
  }
}

.dev-mode-badge {
  text-align: center;
  font-size: 12px;
  color: red;
  font-weight: 800;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid red;
  padding: 2px 6px 0 6px;
  line-height: 12px;
  background-color: #ff000038;
  span {
    font-size: 10px;
    font-weight: 500;
  }
}
</style>