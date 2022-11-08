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
        tag="button"
        :disabled="true"
        class="popup-button-caller"
      >
        <v-ons-toolbar-button
          class="item"
          v-on:click="SHOW_POPOVER($event, 'right', true, 'drawing')"
        >
          <img src="/img/icon_sidebar/tank/drawing.png" />
          <span>Marked-up Drawing</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/checklist/' + id_tag"
        tag="button"
        :disabled="true"
        class="popup-button-caller"
      >
        <v-ons-toolbar-button
          class="item"
          v-on:click="SHOW_POPOVER($event, 'right', true, 'checklist')"
        >
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
        :visible.sync="popoverVisible.markup_drawing"
        :target="popoverTarget"
        :direction="popoverDirection"
        :cover-target="coverTarget"
      >
        <v-ons-toolbar-button
          class="popover-button"
          v-for="item in sidebarSubmenu.markup_drawing"
          :key="item.id"
          v-on:click="GO_TO(item, 'drawing')"
        >
          <span>{{ item.component_code }}</span>
          <i class="las la-angle-right"></i>
        </v-ons-toolbar-button>
      </v-ons-popover>
      <v-ons-popover
        cancelable
        :visible.sync="popoverVisible.checklist"
        :target="popoverTarget"
        :direction="popoverDirection"
        :cover-target="coverTarget"
      >
        <v-ons-toolbar-button
          class="popover-button"
          v-for="item in sidebarSubmenu.checklist"
          :key="item.id"
          v-on:click="GO_TO(item, 'checklist')"
        >
          <span>{{ item.checklist_code }}</span>
          <i class="las la-angle-right"></i>
        </v-ons-toolbar-button>
      </v-ons-popover>
    </div>
  </div>
</template>

<script>
//API
// import axios from "/axios.js";

export default {
  name: "app-sidebar",
  created() {
    // this.FETCH_SUBMENU_DRAWING();
  },
  props: {},
  data() {
    return {
      id_tag: this.$route.params.id_tag,
      id_company: this.$route.params.id_company,
      popoverVisible: {
        markup_drawing: false,
        checklist: false,
      },
      popoverTarget: null,
      popoverDirection: "right",
      coverTarget: false,
      sidebarSubmenu: {
        markup_drawing: [
          {
            id: 1,
            component_code: "Annular",
          },
          {
            id: 2,
            component_code: "Bottom",
          },
          {
            id: 3,
            component_code: "Coil",
          },
          {
            id: 4,
            component_code: "Critical Zone",
          },
          {
            id: 5,
            component_code: "Piping",
          },
          {
            id: 6,
            component_code: "Roof",
          },
          {
            id: 7,
            component_code: "Roof Nozzle",
          },
          {
            id: 8,
            component_code: "Sump",
          },
          {
            id: 9,
            component_code: "Shell",
          },
          {
            id: 10,
            component_code: "Shell Nozzle",
          },
          {
            id: 11,
            component_code: "Projection Plate",
          },
        ],
        checklist: [
          {
            id: 1,
            checklist_code: "Generic",
          },
          {
            id: 2,
            checklist_code: "ILAST External",
          },
          {
            id: 3,
            checklist_code: "ILAST Internal",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    SHOW_POPOVER(event, direction, coverTarget = false, target) {
      this.popoverTarget = event;
      this.popoverDirection = direction;
      this.coverTarget = coverTarget;
      if (
        target == "drawing" &&
        this.sidebarSubmenu.markup_drawing.length > 0
      ) {
        this.popoverVisible.markup_drawing = true;
      } else if (
        target == "checklist" &&
        this.sidebarSubmenu.checklist.length > 0
      ) {
        this.popoverVisible.checklist = true;
      }
    },
    GO_TO(item, target) {
      if (target == "drawing") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/marked-up-drawing/" +
            this.id_tag +
            "/component/" +
            item.id,
          replace: true,
        });
        this.popoverVisible.markup_drawing = false;
      } else if (target == "checklist") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/checklist/" +
            this.id_tag +
            "/form/" +
            item.id,
          replace: true,
        });
        this.popoverVisible.checklist = false;
      }
    },
    // FETCH_SUBMENU_DRAWING() {
    //   axios({
    //     method: "get",
    //     url: "MdComponent",
    //     headers: {
    //       Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    //     },
    //   })
    //     .then((res) => {
    //       if (res.status == 200 && res.data) {
    //         this.sidebarSubmenu = res.data;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {});
    // },
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
.popup-button-caller {
  width: 100%;
  background-color: unset;
  border: none;
  padding: 0;
  margin: 0;
  margin-bottom: -10px;
}

.popover-button {
  padding: 6px 5px 6px 18px;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0;

  i {
    font-size: 14px;
  }
}
.popover-button:hover {
  background-color: #140a4b12;
}

.popover-button:last-child {
  border: 0;
}
</style>