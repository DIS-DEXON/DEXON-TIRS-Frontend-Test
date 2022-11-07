<template>
  <div class="app-sidebar">
    <div class="item-container">
      <!-- SECTION INFO -->
      <div class="section-label"><label>Information</label></div>
      <router-link :to="'/tank/client/' + id_company + '/info/' + id_tag">
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/info.png" />
          <span>Tank Information</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link :to="'/tank/client/' + id_company + '/inspection/' + id_tag">
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/inspection-record.png" />
          <span>Inspection Record</span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- SECTION INSPECTION -->
      <div class="section-label"><label>Inspection</label></div>
      <router-link
        :to="'/tank/client/' + id_company + '/marked-up-drawing/' + id_tag"
        v-on:click="SHOW_POPOVER($event, 'down', true, 'markup-drawing')"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/drawing.png" />
          <span>Marked-up Drawing</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link :to="'/tank/client/' + id_company + '/checklist/' + id_tag">
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/checklist.png" />
          <span>Checklist</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/thickness-inspection/' + id_tag"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/thickness.png" />
          <span>Thickness Inspection</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/visual-inspection/' + id_tag"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/visual.png" />
          <span>Visual Inspection</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link :to="'/tank/client/' + id_company + '/evaluation/' + id_tag">
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/evaluation.png" />
          <span>Evaluation</span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- SECTION REPORT -->
      <div class="section-label"><label>Report</label></div>
      <router-link :to="'/tank/client/' + id_company + '/report/' + id_tag">
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/report.png" />
          <span>Report</span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- POPUP MENUS -->
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
      </v-ons-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-sidebar",
  mounted() {},
  props: {
    id_tank: Number,
  },
  data() {
    return {
      popoverVisible: {
        mark_up_drawing: false,
      },
      popoverTarget: null,
      popoverDirection: "right",
      coverTarget: false,
      id_tag: this.$route.params.id_tag,
      id_company: this.$route.params.id_company,
    };
  },
  computed: {},
  methods: {
    SHOW_POPOVER(event, direction, coverTarget = false, component) {
      this.popoverTarget = event;
      this.popoverDirection = direction;
      this.coverTarget = coverTarget;
      if (component == "markup-drawing") {
        this.popoverVisible.mark_up_drawing = true;
      }
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
      margin-top: 20px;
      font-style: normal;
    }

    .section-label:first-child {
      margin-top: 0px;
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