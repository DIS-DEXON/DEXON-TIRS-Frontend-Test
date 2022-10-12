<template>
  <div class="app-sidebar">
    <div
      class="item-container"
      v-if="
        user.role == 'ceo' || user.role == 'manager' || user.role == 'admin'
      "
    >
      <div class="section-label"><label>Executive Management</label></div>
      <router-link
        v-for="item in sidebarMenu.executiveManagement"
        :key="item.id"
        :to="item.link"
      >
        <v-ons-toolbar-button class="item">
          <!-- <i :class="item.icon"></i> -->
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
    <div
      class="item-container"
      v-if="
        user.role == 'staff' || user.role == 'manager' || user.role == 'admin'
      "
    >
      <div class="section-label"><label>Project Manager</label></div>
      <router-link
        v-for="item in sidebarMenu.projectManager"
        :key="item.id"
        :to="item.link"
      >
        <v-ons-toolbar-button class="item">
          <!-- <i :class="item.icon"></i> -->
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
    <div
      class="item-container"
      v-if="
        user.role == 'staff' || user.role == 'manager' || user.role == 'admin'
      "
    >
      <div class="section-label"><label>Record</label></div>
      <router-link
        v-for="item in sidebarMenu.record"
        :key="item.id"
        :to="item.link"
      >
        <v-ons-toolbar-button class="item">
          <!-- <i :class="item.icon"></i> -->
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
    <div
      class="item-container"
      v-if="
        user.role == 'staff' || user.role == 'manager' || user.role == 'admin'
      "
    >
      <div class="section-label"><label>Contact</label></div>
      <router-link
        v-for="item in sidebarMenu.contact"
        :key="item.id"
        :to="item.link"
      >
        <v-ons-toolbar-button class="item">
          <!-- <i :class="item.icon"></i> -->
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
    <div
      class="item-container"
      v-if="
        user.role == 'staff' || user.role == 'manager' || user.role == 'admin'
      "
    >
      <div class="section-label"><label>Other</label></div>
      <router-link
        v-for="item in sidebarMenu.other"
        :key="item.id"
        :to="item.link"
      >
        <v-ons-toolbar-button class="item">
          <!-- <i :class="item.icon"></i> -->
          <img :src="item.icon" />
          <span>{{ item.name }}</span>
        </v-ons-toolbar-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  mounted() {},
  data() {
    return {
      currentPath: this.$route.path,
      currentPathAlias: this.$route.alias,
      sidebarMenu: this.$store.state.appsList,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
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