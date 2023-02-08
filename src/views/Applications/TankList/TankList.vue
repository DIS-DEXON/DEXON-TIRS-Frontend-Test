<template>
  <div class="page-layout">
    <div class="page-toolbar">
      <toolbar
        :pageSubName="infoClient.company_name"
        @refreshInfo="FETCH_TANK_LIST()"
        @newBtnFn="TOGGLE_POPUP()"
        :isBackPath="true"
        :isRefresh="true"
        isBack_specificPath="/"
        newBtnLabel="New Tank"
        style="grid-column: span 2"
      />
    </div>
    <div class="page-sidebar">
      <clientInfoSidebar :clientInfo="infoClient" />
    </div>
    <div class="page-content">
      <div class="custom-table-header">
        <div class="left">
          <label>Tank List</label>
        </div>
        <div class="right table-toolbar-set">
          <v-ons-toolbar-button
            class="table-toolbar-btn"
            v-on:click="TOGGLE_POPUP()"
          >
            <i class="las la-plus"></i>
            <span>Add New Tank</span>
          </v-ons-toolbar-button>
        </div>
      </div>
      <div class="searchbar-box" style="margin-top: 10px">
        <input
          type="text"
          name="search"
          size="50"
          v-model="search_key"
          placeholder="Search Tag No."
          class="query"
        /><span class="icon"><i class="la la-search"></i></span
        ><span class="close" v-if="search_key" v-on:click="SEARCH_CLEAR()"
          ><i class="la la-close"></i
        ></span>
      </div>
      <div class="tank-list-list">
        <div class="table-header">
          <div class="item-img"></div>
          <div class="label">
            <label>Tag No.</label>
          </div>
          <div class="label">
            <label>Tank No.</label>
          </div>
          <div class="label">
            <label>Location</label>
          </div>
          <div class="label">
            <label>Site</label>
          </div>
          <div class="label">
            <label>Description</label>
          </div>
          <div class="icon"></div>
        </div>
        <div v-if="!search_key">
          <div
            class="item"
            v-for="item in tankList"
            :key="item.id_tag"
            v-on:click="VIEW_INFO(item)"
          >
            <div class="item-img">
              <i class="las la-folder-open"></i>
            </div>
            <div class="label">
              <label>{{ item.tag_no }}</label>
            </div>
            <div class="label">
              <label>{{ item.tank_no }}</label>
            </div>
            <div class="label">
              <label>{{ item.site_name }}</label>
            </div>
            <div class="label">
              <label>{{ item.site_desc }}</label>
            </div>
            <div class="label">
              <label>{{ item.description }}</label>
            </div>
            <div class="icon">
              <i class="las la-angle-right"></i>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="item"
            v-for="item in tankListFiltered"
            :key="item.id_tag"
            v-on:click="VIEW_INFO(item)"
          >
            <div class="item-img">
              <i class="las la-folder-open"></i>
            </div>
            <div class="label">
              <label>{{ item.tag_no }}</label>
            </div>
            <div class="label">
              <label>{{ item.tank_no }}</label>
            </div>
            <div class="label">
              <label>{{ item.site_name }}</label>
            </div>
            <div class="label">
              <label>{{ item.site_desc }}</label>
            </div>
            <div class="label">
              <label>{{ item.description }}</label>
            </div>
            <div class="icon">
              <i class="las la-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
    <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />
  </div>
</template> 

<script>
//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";
import popupAdd from "@/views/Applications/TankList/tank-info-add.vue";
import clientInfoSidebar from "@/views/Applications/TankList/Pages/client-info-panel.vue";

//API
import axios from "/axios.js";

export default {
  name: "TankList",
  components: {
    toolbar,
    contentLoading,
    popupAdd,
    clientInfoSidebar,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("CLEAR_CURRENT_CLIENT");
    this.$store.commit("CLEAR_CURRENT_PAGENAME");
    if (this.$store.state.status.server == true) {
      this.FETCH_CLIENT_INFO();
      this.FETCH_TANK_LIST();
    }
  },
  data() {
    return {
      isAdd: false,
      isEdit: false,
      isLoading: false,
      editInfo: "",
      infoClient: {},
      tankList: [],
      tankListFiltered: [],
      dataGridAttributes: {
        class: "data-grid-style",
      },
      search_key: null,
    };
  },
  computed: {},
  watch: {
    // whenever search_key change, this function will run
    search_key() {
      this.SEARCH_GET(this.search_key);
    },
  },
  methods: {
    VIEW_INFO(item) {
      if (item.id_tag != null) {
        this.$router.push(
          "/tank/client/" + item.id_client + "/tag/" + item.id_tag + "/info"
        );
      }
    },
    TOGGLE_POPUP() {
      this.isAdd = !this.isAdd;
    },
    FETCH_TANK_LIST() {
      this.isLoading = true;
      var id_company = this.$route.params.id_company;
      // console.log("ID CLIENT: " + id_company);
      axios({
        method: "post",
        url: "/tank-info/tank-info-by-client",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_client: id_company,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.tankList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CLIENT_INFO() {
      this.isLoading = true;
      var id_company = this.$route.params.id_company;
      // console.log("ID CLIENT: " + id_company);
      axios({
        method: "get",
        url: "/MdClientCompany/" + id_company,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.infoClient = res.data;
            this.$store.commit("UPDATE_CURRENT_CLIENT", {
              name: this.infoClient.company_name,
              logo: this.infoClient.logo,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SEARCH_CLEAR() {
      this.search_key = null;
    },
    SEARCH_GET(searchValue) {
      let tankListFiltered = this.tankList;

      if (searchValue != "" && searchValue) {
        tankListFiltered = tankListFiltered.filter((item) => {
          return item.tag_no.toUpperCase().includes(searchValue.toUpperCase());
        });
      }
      this.tankListFiltered = tankListFiltered;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.page-layout {
  display: grid;
  grid-template-columns: 300px calc(100vw - 300px);
  grid-template-rows: 51px calc(100vh - 95px);
  transition: all 0.3s;
  .page-toolbar {
    grid-column: span 2;
    background-color: #fff;
    // padding: 20px;
  }
  .page-content {
    padding: 20px;
    overflow-y: auto;
    // background-color: #fff;
  }
}

.tank-list-list {
  display: block;
  width: calc(100% - 16px);
  padding: 20px 8px;
  padding-top: 10px;

  .table-header {
    width: 100%;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 40px calc(40% - 120px) 10% 10% 20% 20% 80px;
    border: 1px solid #e6e6e6;
    border-width: 0 0 1px 0;
    .label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      cursor: text;

      label {
        font-size: 12px;
        font-weight: 600;
        color: $web-font-color-black;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
        cursor: text;
        user-select: text;
      }
    }
  }

  .item {
    width: 100%;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 40px calc(40% - 120px) 10% 10% 20% 20% 80px;
    border: 1px solid #e6e6e6;
    border-width: 0 0 1px 0;
    cursor: pointer;

    .item-img {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      i {
        font-size: 22px;
        color: $dexon-primary-blue;
      }
    }

    .label {
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
        user-select: text;
      }
    }

    .icon {
      width: 80px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 18px;
        color: $dexon-primary-blue;
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
    padding: 0 30px 0 60px;
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
    font-size: 18px;
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
    font-size: 18px;
    color: #d2d2d2;
  }

  input {
    height: 40px;
  }
}
</style>