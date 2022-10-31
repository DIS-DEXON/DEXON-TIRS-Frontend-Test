<template>
  <div class="app-sidebar">
    <div class="item-container">
      <div class="section-label"><label>Information</label></div>
      <router-link
        v-for="item in sidebarList.info"
        :key="item.id"
        :to="item.link + currentTankID"
      >
        <v-ons-toolbar-button class="item">
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
    <div class="item-container">
      <div class="section-label"><label>Inspection</label></div>
      <router-link
        v-for="item in sidebarList.inspection"
        :key="item.id"
        :to="item.link + currentTankID"
      >
        <v-ons-toolbar-button class="item">
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-sidebar",
  mounted() {
    console.log("==> Sidebar: id_tank: " + this.currentTankID);
  },
  props: {
    id_tank: Number,
  },
  data() {
    return {
      currentTankID: this.$route.params.id_tank,
      sidebarList: {
        info: [
          {
            id: 0,
            name: "Tank Information",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/info/",
            isActive: true,
          },
        ],
        inspection: [
          {
            id: 0,
            name: "Inspection Record",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/inspection-record/",
            isActive: true,
          },
          {
            id: 1,
            name: "Marked-up Drawing",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/operation-process/",
            isActive: true,
          },
          {
            id: 2,
            name: "API Checklist",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/operation-process/",
            isActive: true,
          },
          {
            id: 3,
            name: "Thickness",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/operation-process/",
            isActive: true,
          },
          {
            id: 4,
            name: "Visual Inspection",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/operation-process/",
            isActive: true,
          },
          {
            id: 5,
            name: "Evaluation",
            icon: "/img/icon_sidebar/executive_management/summary.png",
            icon_menu: "/img/icon_menu/executive_management/summary.png",
            link: "/tank/info/operation-process/",
            isActive: true,
          },
        ],
      },
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.app-sidebar {
  width: 240px;
  height: 100%;
  background-color: #140a4b;
  border: 1px solid #e6e6e6;
  border-width: 0 1px 0 0;
  position: relative;
  overflow-y: scroll;

  .item-container {
    width: 100%;
    padding-top: 20px;

    .section-label {
      font-size: 1.5em;
      font-weight: 600;
      color: #ffffff92;
      margin-left: 20px;
      font-style: normal;
    }

    .item {
      width: 200px;
      padding: 0;
      height: 34px;
      justify-content: flex-start;
      border-radius: 6px;
      margin: 10px auto;
      border: 0px;
      i {
        margin-left: 15px;
        color: $web-font-color-white;
      }
      span {
        color: $web-font-color-white;
        font-weight: 400;
        font-size: 14px;
      }
      img {
        width: 20px;
        max-height: 20px;
        object-fit: contain;
        margin-left: 10px;
        margin-right: 10px;
      }
    }

    .item:hover,
    .router-link-active > .item,
    .router-link-exact-active > .item {
      background: $dexon-primary-red;
    }
  }
  .item-container:last-child {
    margin-bottom: 100px;
  }
  .sidebar-toggle-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    i {
      font-size: 24px;
      color: $dexon-primary-blue;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 1024px) {
  .app-sidebar {
    width: fit-content;
    .item-container {
      .item {
        width: fit-content;
        span {
          display: none;
        }
      }
    }
  }
}
</style>