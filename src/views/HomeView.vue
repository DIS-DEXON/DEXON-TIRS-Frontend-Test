<template>
  <div id="page-home" class="page-body">
    <div id="user-panel">
      <div
        class="page-container"
        style="padding-top: 40px; padding-bottom: 80px"
      >
        <div class="wrapper">
          <div class="left-col">
            <div class="detail">
              <div class="name">
                <h2>Tank Inspection Management System</h2>
                <h2>{{ user.lastname }}</h2>
              </div>
              <!-- <div class="desc">
                <label>{{ user.role }}, {{ user.department }}</label>
                <label>DITT-{{ user.employee_no }}</label>
              </div> -->
            </div>
          </div>
          <div class="right-col">
            <v-ons-toolbar-button
              v-on:click="GO_TO('/account')"
              style="background-color: transparent"
            >
              <span>My Account</span>
              <i class="las la-user-circle"></i>
            </v-ons-toolbar-button>
          </div>
        </div>
        <div class="searchbar-box">
          <input
            type="text"
            name="search"
            size="50"
            v-model="search_key"
            placeholder="Search Client"
            class="query"
          /><span class="icon"><i class="la la-search"></i></span
          ><span class="close" v-if="search_key" v-on:click="SEARCH_CLEAR()"
            ><i class="la la-close"></i
          ></span>
        </div>
      </div>
      <div class="bg-filter"></div>
    </div>

    <div class="page-container">
      <div
        class="section-label"
        v-if="!this.search_key && this.clientListRecent.length > 0"
      >
        <h2 class="page-section-label" style="padding-bottom: 20px">
          Recently Viewed
        </h2>
        <v-ons-toolbar-button
          class="btn"
          style="margin-right: 8px"
          v-on:click="CLEAR_RECENT()"
        >
          <span>Clear Recent</span>
        </v-ons-toolbar-button>
      </div>
      <div
        class="client-list-recent"
        v-if="!this.search_key && this.clientListRecent.length > 0"
      >
        <v-ons-card
          class="client-card"
          v-for="item in clientListRecent"
          :key="item.id"
          v-on:click="VIEW_INFO(item)"
        >
          <div class="client_logo">
            <img :src="baseURL + item.logo" alt="client logo" />
          </div>
          <div class="title">{{ item.company_name }}</div>
        </v-ons-card>
      </div>
      <div class="section-label">
        <h2 class="page-section-label" style="padding-top: 40px">
          {{ client_list_section_label }}
        </h2>
      </div>
      <div class="client-list-list" v-if="!this.search_key">
        <div
          class="item"
          v-for="item in clientListPaged"
          :key="item.id"
          v-on:click="VIEW_INFO(item)"
        >
          <div class="logo">
            <img :src="baseURL + item.logo" alt="client logo" />
          </div>
          <div class="name">
            <label>{{ item.company_name }}</label>
          </div>

          <div class="icon">
            <i class="las la-search"></i>
          </div>
        </div>
      </div>
      <div class="client-list-list" v-if="this.search_key">
        <div
          class="item"
          v-for="item in clientListFiltered"
          :key="item.id"
          v-on:click="VIEW_INFO(item)"
        >
          <div class="logo">
            <img :src="baseURL + item.logo" alt="client logo" />
          </div>
          <div class="name">
            <label>{{ item.company_name }}</label>
          </div>
          <div class="icon">
            <i class="las la-search"></i>
          </div>
        </div>
      </div>
      <v-ons-toolbar-button
        style="margin-right: 8px; width: 200px; margin: 0 auto"
        v-on:click="SHOW_MORE_CLIENT()"
        v-if="
          this.clientListPaged.length < this.clientList.length &&
          !this.search_key
        "
      >
        <span>Show More</span>
      </v-ons-toolbar-button>
    </div>
    <div
      class="page-container"
      v-if="
        (this.user.id_role == 5 || this.user.id_role == 3) && !this.search_key
      "
    >
      <div class="section-label" v-if="showSectionLabel == true">
        <h2 class="page-section-label">Master Data & Management</h2>
      </div>
      <div class="app-drawer-wrapper">
        <div
          class="app-item-wrapper"
          v-for="item in appsList.managementApps"
          :key="item.id"
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
import moment from "moment";

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
      user: null,
      clientList: [],
      clientListPaged: [],
      clientListFiltered: [],
      clientListRecent: [],
      search_key: "",
    };
  },
  watch: {
    // whenever search_key change, this function will run
    search_key() {
      this.SEARCH_GET(this.search_key);
    },
  },
  created() {
    this.$emit(`update:layout`, ViewLayout);
    this.$store.commit("CLEAR_CURRENT_INAPP");
    this.user = JSON.parse(localStorage.getItem("user"));

    if (this.$store.state.status.server == true) {
      this.CHECK_RECENT_EXIST();
      this.FETCH_CLIENT_LIST();
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {
    FETCH_CLIENT_LIST() {
      this.isLoading = true;
      console.log("==> CLIENT LIST: FETCHING");
      axios({
        method: "get",
        url: "/MdClientCompany",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("==> LIENT LIST: FETCHED");
            this.clientList = res.data;
            this.clientListPaged = this.clientList.slice(0, 5);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    OPEN_APP(item) {
      if (item.isActive == true) {
        this.openingApp = item;
        this.isOpening = true;
        let link = this.openingApp.link;
        if (link) this.$router.push(link);
        this.isOpening = false;
      }
    },
    VIEW_INFO(item) {
      console.log(item);
      if (item.id_company) {
        this.KEEP_RECENT(item);

        this.$store.commit("UPDATE_CURRENT_VIEW_CLIENT", item.id_company);
        this.$router.push("/tank/client/" + item.id_company);
      }
    },
    SEARCH_GET(searchValue) {
      let clientListFiltered = this.clientList;

      if (searchValue != "" && searchValue) {
        clientListFiltered = clientListFiltered.filter((item) => {
          return item.company_name
            .toUpperCase()
            .includes(searchValue.toUpperCase());
        });
      }
      this.clientListFiltered = clientListFiltered;
    },
    SEARCH_CLEAR() {
      this.search_key = null;
    },
    GO_TO(path) {
      if (path) {
        this.$router.push(path);
      }
    },
    CHECK_RECENT_EXIST() {
      var check = JSON.parse(localStorage.getItem("recent_client"));
      console.log(check);
      if (check == null) {
        var list = [];
        localStorage.setItem("recent_client", JSON.stringify(list));
      }
      this.clientListRecent = JSON.parse(localStorage.getItem("recent_client"));
      this.clientListRecent = this.clientListRecent.slice(0, 6);
    },
    KEEP_RECENT(item) {
      var list = JSON.parse(localStorage.getItem("recent_client"));

      var exist;

      var a = list.filter((list) => list.id_company == item.id_company);
      if (a.length > 0) exist = 1;
      else exist = 0;

      var upload = list;
      if (exist == 0) {
        upload.unshift(item);
        localStorage.setItem("recent_client", JSON.stringify(upload));
      } else {
        for (var i = 0; i < upload.length; i++) {
          if (upload[i].id_company == item.id_company) {
            upload.splice(i, 1);
            break;
          }
        }
        upload.unshift(item);
        localStorage.setItem("recent_client", JSON.stringify(upload));
      }
    },
    CLEAR_RECENT() {
      this.$ons.notification.confirm("Confirm Clear?").then((res) => {
        if (res == 1) {
          localStorage.removeItem("recent_client");
          this.CHECK_RECENT_EXIST();
        }
      });
    },
    SHOW_MORE_CLIENT() {
      this.clientListPaged = this.clientList;
    },
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
    current_date() {
      return moment().format("dddd, LL, hh:mm:ss a");
    },
    client_list_section_label() {
      if (this.search_key && this.clientListFiltered.length == 0)
        return "Not Found";
      else if (this.search_key && this.clientListFiltered.length > 0)
        return "Search Result";
      else return "All Clients";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#page-home {
  height: calc(100vh - 44px);
  overflow-y: scroll;
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
  padding-top: 40px;
}

.page-container:last-child {
  padding-bottom: 100px;
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

.section-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .page-section-label {
    font-size: 1.75em;
    font-style: italic;
    text-transform: capitalize;
    color: $web-font-color-black;
    padding-left: 8px;
    font-weight: 500;
  }
}

#user-panel {
  background-image: url("/public/img/main-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media screen and (max-width: 768px) {
    margin: 0 -20px;
  }
  .page-container {
    z-index: 1;
  }

  .wrapper {
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-col {
      .detail {
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
            font-weight: 700;
            font-size: 24px;
            margin: 0 !important;
            text-transform: uppercase;
            letter-spacing: 1pt;
            user-select: text;
          }
          h2:last-child {
            margin-left: 10px !important;
          }

          .hl {
            font-size: 30px;
            font-weight: 700;
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
      }
      span {
        font-size: 14px;
      }
      i {
        font-size: 20px;
        margin-left: 10px;
        margin-right: 0;
      }

      .toolbar-button:hover {
        background-color: #f0f0f029;
      }
    }
  }

  .bg-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #140a4b 0%, rgba(39, 89, 168, 0) 150%);
  }
}

.toolbar-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: #efefef;
  padding: 0 15px;
  height: 34px;
  border: 0px;
  span {
    font-size: 12px;
    font-weight: 500;
    color: #303030;
  }
}

.client-list-recent {
  display: grid;
  grid-template-columns: repeat(6, calc(100% / 6));
  grid-template-rows: auto;
  grid-template-rows: auto;
  grid-gap: 12px;
  width: calc(100% - 76px);
  padding: 8px;
  margin: 0;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, calc(100% / 4));
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(2, 50%);
    width: calc(100% - 28px);
  }
}

.client-card {
  cursor: pointer;
  height: 100%;
  padding: 8px 20px;
  margin: 0;
  .client_logo {
    width: 100%;
    max-width: 80px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;

    //Another Style (no background)
    // width: 60px;
    // height: 60px;
    // padding: 10px;
    // margin: 10px auto;
    // overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
    // border-radius: 6px;
    // background-color: white;
    // margin-bottom: 14px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .title {
    font-size: 12px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    font-family: "SF Pro", "SF Pro Display", "Helvetica Nueue", "Noto Sans Thai",
      "Roboto", sans-serif !important;
  }

  @media screen and (max-width: 1024px) {
    .client_logo {
      width: 100%;
      height: 50px;
    }
  }
  @media screen and (max-width: 425px) {
    .client_logo {
      width: 100%;
      height: 40px;
    }
  }
}

.client-card:hover {
  // transition: all 100ms;
  transform: scale(1.02);
}

.client-list-list {
  display: block;
  width: calc(100% - 16px);
  padding: 20px 8px;
  padding-top: 10px;

  .item {
    width: 100%;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 70px calc(100% - 150px) 80px;
    border: 1px solid #e1e1e1;
    border-width: 0 0 1px 0;
    cursor: pointer;

    .logo {
      width: 40px;
      height: 40px;
      padding-left: 10px;
      cursor: pointer;
      background-color: #fff;
      border-radius: 6px;
      padding: 5px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 1px 2px rgb(0 0 0 / 12%);

      img {
        width: 100%;
        height: 30px;
        object-fit: contain;
      }
    }

    .name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      cursor: pointer;

      label {
        font-size: 12px;
        font-weight: 600;
        color: $web-font-color-black;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
        cursor: pointer;
      }
    }

    .icon {
      width: 80px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 14px;
      }
    }
  }
  .item:hover {
    background-color: #fff;
    cursor: pointer;
    border-radius: 6px;
  }
}

.searchbar-box {
  position: relative;
  background: #fff;
  // box-shadow: 0 9px 17px rgb(0 0 0 / 8%);
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
  border-radius: 6px;
  height: 48px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px;
  // margin-bottom: 20px;

  .query {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI",
      "Fira Sans", Roboto, Oxygen, Ubuntu, "Droid Sans", "Arial", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #000;
    box-sizing: border-box;
    padding: 0 30px 0 70px;
    border: none;
    background: none;
    width: 100%;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 20px;
    pointer-events: none;
    transform: translateY(-50%) scaleX(-1);
    font-size: 24px;
    i {
      color: #d2d2d2;
    }
  }

  .close {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 22px;
    color: #d2d2d2;
  }

  input {
    height: 40px;
  }
}
</style>
