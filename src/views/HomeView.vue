<template>
  <div id="page-home" class="page-body">
    <div id="user-panel" v-if="isLoading == false">
      <div class="page-container">
        <div class="wrapper">
          <div class="left-col">
            <div class="photo">
              <img :src="user.profile_picture" v-if="user.profile_picture" />
              <img
                src="/img/default_profile_picture.png"
                v-if="!user.profile_picture"
              />
            </div>
            <div class="detail">
              <div class="name">
                <h2>{{ user.firstname }}</h2>
                <h2>{{ user.lastname }}</h2>
              </div>
              <div class="desc" v-if="user.position">
                <label>{{ user.position }}, {{ user.department }}</label>
                <label>DITT-{{ user.employee_no }}</label>
              </div>
            </div>
          </div>
          <div class="right-col">
            <v-ons-toolbar-button v-on:click="GO_TO('dos')">
              <span>Dexon Omnia System (DOS) </span>
              <i class="las la-laptop"></i>
            </v-ons-toolbar-button>
            <v-ons-toolbar-button v-on:click="GO_TO('/account')">
              <span>My Account</span>
              <i class="las la-user-circle"></i>
            </v-ons-toolbar-button>
          </div>
        </div>
      </div>
      <div class="bg-filter"></div>
    </div>
    <div
      class="page-container"
      style="padding-bottom: 100px"
      v-if="isLoading == false"
    >
      <div v-if="this.user.role == 'ceo' || this.user.role == 'admin'">
        <div class="section-label" v-if="showSectionLabel == true">
          <h2 class="page-section-label">Executive Summary</h2>
        </div>
        <div class="app-drawer-wrapper">
          <div
            class="app-item-wrapper"
            v-for="item in appsList.executiveSummary"
            :key="item.name"
          >
            <div
              class="app-item"
              v-on:click="OPEN_APP(item)"
              v-if="item.isActive == true"
            >
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
        </div>
        <hr v-if="this.user.role == 'manager'" />
      </div>
      <div v-if="this.user.role == 'manager' || this.user.role == 'admin'">
        <div class="section-label" v-if="showSectionLabel == true">
          <h2 class="page-section-label">Executive Management</h2>
        </div>
        <div class="app-drawer-wrapper">
          <div
            class="app-item-wrapper"
            v-for="item in appsList.executiveManagement"
            :key="item.name"
          >
            <div
              class="app-item"
              v-on:click="OPEN_APP(item)"
              v-if="item.isActive == true"
            >
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
        </div>
        <hr v-if="this.user.role == 'manager'" />
      </div>
      <div v-if="this.user.role != 'ceo'">
        <div class="section-label" v-if="showSectionLabel == true">
          <h2 class="page-section-label">Applications</h2>
        </div>
        <div class="app-drawer-wrapper">
          <div
            class="app-item-wrapper"
            v-for="item in appsList.projectManager"
            :key="item.name"
          >
            <div
              class="app-item"
              v-on:click="OPEN_APP(item)"
              v-if="item.isActive == true"
            >
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
          <div
            class="app-item-wrapper"
            v-for="item in appsList.record"
            :key="item.name"
          >
            <div class="app-item" v-on:click="OPEN_APP(item)">
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
          <div
            class="app-item-wrapper"
            v-for="item in appsList.contact"
            :key="item.name"
          >
            <div class="app-item" v-on:click="OPEN_APP(item)">
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
          <div
            class="app-item-wrapper"
            v-for="item in appsList.other"
            :key="item.name"
          >
            <div class="app-item" v-on:click="OPEN_APP(item)">
              <img :src="item.icon_menu" />
              <label>{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppLoading
      :icon="openingApp.icon_menu"
      :name="openingApp.name"
      v-if="isOpening == true"
    />
    <PageLoading v-if="isLoading == true" text="Loading" />
  </div>
</template>

<script>
//API
import axios from "/axios.js";

//UI
import AppLoading from "@/components/app-structures/app-opening.vue";
import ViewLayout from "@/layouts/non-sidebar-layout.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

export default {
  name: "HomeView",
  components: {
    AppLoading,
    PageLoading,
  },
  data() {
    return {
      appsList: this.$store.state.appsList,
      isOpening: false,
      isLoading: false,
      openingApp: "",
      showSectionLabel: true,
      user: "",
    };
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_INAPP");
    if (this.$store.state.status.server == true) this.FETCH_USER_INFO();
  },
  beforeMount() {
    if (this.$store.state.user) {
      this.user = this.$store.state.user;
    }
  },
  mounted() {},
  methods: {
    FETCH_USER_INFO() {
      this.isLoading = true;
      setTimeout(() => {
        var id_user = JSON.parse(localStorage.getItem("user")).id_user;
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
              var user = res.data.user;
              this.user = user;
              if (user.profile_picture == null) {
                this.user.profile_picture = null;
              } else {
                this.user.profile_picture =
                  this.baseURL + this.user.profile_picture;
              }

              console.log("==> Fetch User Info : Home View <==");
              if (this.user.role == "ceo") {
                this.$router.push("/executive-report");
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }, 100);
    },
    OPEN_APP(item) {
      if (item.isActive == true) {
        this.openingApp = item;
        this.isOpening = true;
        let link = this.openingApp.link;
        setTimeout(() => {
          if (link) this.$router.push(link);
          this.isOpening = false;
        }, 1000);
      }
    },
    GO_TO(path) {
      if (path == "dos") {
        window.open(
          "https://dos.dexon-technology.com/fmi/webd/Dexon",
          "_blank"
        );
      } else this.$router.push({ path: path, replace: true });
    },
  },
  computed: {
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
#page-home {
  height: calc(100vh - 78px);
  overflow-x: scroll;
}

.app-drawer-wrapper {
  display: grid;
  width: 100%;
  padding: 20px 0;
  margin: auto;

  .app-item-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 20px 0;
    .app-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;

      img {
        width: 74px;
        // filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
        -webkit-mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
          center/100% 100% no-repeat;
        mask: url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.41%22%20clip-rule%3D%22evenodd%22%20version%3D%221.1%22%20viewBox%3D%220%200%20460%20460%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22M460%20316.1c0%205.5%200%2010.99-.04%2016.48-.03%204.63-.08%209.26-.2%2013.88a201.73%20201.73%200%200%201-2.66%2030.21c-1.71%2010-4.9%2019.68-9.47%2028.73a96.6%2096.6%200%200%201-42.23%2042.23%20101.86%20101.86%200%200%201-28.71%209.46c-10%201.65-20.1%202.54-30.22%202.66a649%20649%200%200%201-13.88.21c-5.5.03-10.99.03-16.48.03H143.89c-5.49%200-10.98%200-16.48-.03a648.8%20648.8%200%200%201-13.88-.2%20201.46%20201.46%200%200%201-30.22-2.67c-9.99-1.7-19.67-4.9-28.71-9.46a96.61%2096.61%200%200%201-42.23-42.22%20101.96%20101.96%200%200%201-9.47-28.74%20201.6%20201.6%200%200%201-2.66-30.2c-.12-4.63-.18-9.26-.2-13.89C0%20327.08%200%20321.6%200%20316.1V143.9c0-5.5%200-11%20.04-16.5.02-4.62.08-9.25.2-13.87a201.64%20201.64%200%200%201%202.66-30.2c1.71-10%204.9-19.68%209.47-28.74A96.6%2096.6%200%200%201%2054.6%2012.36%20101.96%20101.96%200%200%201%2083.3%202.9c10-1.64%2020.1-2.53%2030.22-2.66%204.63-.12%209.26-.18%2013.88-.2%205.5-.03%2011-.03%2016.48-.03H316.1c5.5%200%2011%200%2016.49.03a649%20649%200%200%201%2013.88.2c10.12.13%2020.22%201.02%2030.21%202.66%2010%201.71%2019.67%204.9%2028.72%209.46a96.58%2096.58%200%200%201%2042.24%2042.23%20101.92%20101.92%200%200%201%209.46%2028.73%20201.7%20201.7%200%200%201%202.66%2030.21c.12%204.63.18%209.26.2%2013.88.04%205.5.04%2010.99.04%2016.48V316.1z%22%2F%3E%3C%2Fsvg%3E%0A)
          center/100% 100% no-repeat;
      }
      label {
        margin-top: 15px;
        font-style: normal;
        font-weight: 400;
        font-size: 1.75em;
        line-height: 20px;
        text-align: center;
        color: #303030;
        cursor: pointer;
        max-width: 120px;
      }
    }

    .app-item:hover {
      // transform: scale(1.05);
      opacity: 0.9;
      transition: all 0.1s;
    }
    .app-item:active {
      transform: scale(0.95);
      transition: all 0.1s;
    }
  }

  grid-template-columns: repeat(8, 12.5%);

  @media screen and (max-width: 1920px) {
    grid-template-columns: repeat(7, 14.28%);
  }

  @media screen and (max-width: 1600px) {
    grid-template-columns: repeat(6, 16.66%);
  }

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(6, 16.66%);
  }

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(5, 20%);
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(4, 25%);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 25%);
    padding: 20px 0;

    .app-item-wrapper > .app-item > img {
      width: 64px;
    }
    .app-item-wrapper > .app-item > label {
      font-size: 1.5em;
    }
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(3, 33.33%);
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(2, 50%);
  }
}

.page-container {
  position: relative;
  // height: 100%;
}

.opening-loader {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.opening-icon {
  width: 100px;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
}

.page-section-label {
  font-size: 1.75em;
  padding-top: 30px;
  font-style: italic;
  text-transform: capitalize;
  color: #5b5b5b;
}
#user-panel {
  background-image: url("/public/img/main-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media screen and (max-width: 768px) {
    margin: 0 -20px;
  }

  .bg-filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    // background: linear-gradient(
    //   180deg,
    //   $dexon-primary-blue 0%,
    //   rgba(39, 89, 168, 0) 100%
    // );
    // backdrop-filter: blur(10px);
  }

  .page-container {
    z-index: 1;
  }

  .wrapper {
    padding: 80px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-col {
      display: grid;
      grid-template-columns: 96px auto;
      .photo {
        width: 96px;
        height: 96px;
        border-radius: 100px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .detail {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: $web-font-color-white;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
        .name {
          display: flex;
          h2 {
            font-style: normal;
            font-weight: 600;
            font-size: 3em;
            line-height: 16px;
            margin: 0 !important;
          }
          h2:last-child {
            margin-left: 10px !important;
          }
        }
        .desc {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          label {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            // color: $web-font-color-grey;
          }
        }
      }
    }
    .right-col {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
      span,
      i {
        color: $web-font-color-white;
        text-shadow: $web-font-shadow;
        font-size: 16px;
      }
      i {
        margin-left: 10px;
        margin-right: 0;
      }

      .toolbar-button:hover {
        background-color: #f0f0f029;
      }
    }
    @media screen and (max-width: 1024px) {
      padding: 80px 0px;
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0px;

      .left-col {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        .photo {
          width: 100px;
          height: 100px;
        }
        .detail {
          margin-left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          // margin-left: 30px;
          .name {
            margin: 30px 0 0 0;
            justify-content: center;
            text-align: center;
            h2 {
              width: 100%;
              height: 20px;
              font-size: 2.5em;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-bottom: 8px !important ;
            }

            @media screen and (max-width: 425px) {
              display: block;
              h2:last-child {
                margin-left: 0 !important;
              }
            }
          }
          .desc {
            width: 100%;
            justify-content: center;
            label {
              text-align: center;
              font-size: 1.5em;
              line-height: unset;
            }
          }
        }
      }
      .right-col {
        margin-top: 20px;
        display: none;
      }
    }
  }
}
</style>
