<template>
  <div
    class="app-sidebar"
    :class="[sidebarHiding == true ? 'app-sidebar-hide' : 'app-sidebar']"
  >
    <div class="item-container">
      <!-- SECTION INFO -->
      <div class="section-label">
        <label>Information</label>
      </div>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/info'"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/info.png" />
          <span>Tank Information</span>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/insp-record'"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/inspection-record.png" />
          <span>Inspection Record</span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- SECTION INSPECTION -->
      <div class="section-label">
        <label>Inspection</label>
        <hr />
      </div>
      <router-link
        :to="
          '/tank/client/' + id_company + '/tag/' + id_tag + '/marked-up-drawing'
        "
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
          <i class="las la-angle-right right-arrow"></i>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/checklist'"
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
          <i class="las la-angle-right right-arrow"></i>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/thickness'"
        tag="button"
        :disabled="true"
        class="popup-button-caller"
      >
        <v-ons-toolbar-button
          class="item"
          v-on:click="SHOW_POPOVER($event, 'right', true, 'thickness')"
        >
          <img src="/img/icon_sidebar/tank/thickness.png" />
          <span>Thickness</span>
          <i class="las la-angle-right right-arrow"></i>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/evaluation'"
        tag="button"
        :disabled="true"
        class="popup-button-caller"
      >
        <v-ons-toolbar-button
          class="item"
          v-on:click="SHOW_POPOVER($event, 'right', true, 'evaluation')"
        >
          <img src="/img/icon_sidebar/tank/evaluation.png" />
          <span>Evaluation</span>
          <i class="las la-angle-right right-arrow"></i>
        </v-ons-toolbar-button>
      </router-link>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/visual'"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/visual.png" />
          <span>Picture Log </span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- SECTION REPORT -->
      <div class="section-label">
        <label>Report</label>
        <hr />
      </div>
      <router-link
        :to="'/tank/client/' + id_company + '/tag/' + id_tag + '/report'"
      >
        <v-ons-toolbar-button class="item">
          <img src="/img/icon_sidebar/tank/report.png" />
          <span>Report</span>
        </v-ons-toolbar-button>
      </router-link>

      <!-- POPUP MENUS -->

      <!-- Markup Drawing -->
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

      <!-- Checklist -->
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

      <!-- Thickness -->
      <v-ons-popover
        cancelable
        :visible.sync="popoverVisible.thickness"
        :target="popoverTarget"
        :direction="popoverDirection"
        :cover-target="coverTarget"
      >
        <v-ons-toolbar-button
          class="popover-button"
          v-for="item in sidebarSubmenu.thickness"
          :key="item.id"
          v-on:click="GO_TO(item, 'thickness')"
        >
          <span>{{ item.code }}</span>
          <i class="las la-angle-right"></i>
        </v-ons-toolbar-button>
      </v-ons-popover>

      <!-- Evaluation -->
      <v-ons-popover
        cancelable
        :visible.sync="popoverVisible.evaluation"
        :target="popoverTarget"
        :direction="popoverDirection"
        :cover-target="coverTarget"
      >
        <v-ons-toolbar-button
          class="popover-button"
          v-for="item in sidebarSubmenu.evaluation"
          :key="item.id"
          v-on:click="GO_TO(item, 'evaluation')"
        >
          <span>{{ item.code }}</span>
          <i class="las la-angle-right"></i>
        </v-ons-toolbar-button>
      </v-ons-popover>
    </div>
    <div class="item-container fixed-panel">
      <v-ons-toolbar-button
        class="item bottom-btn"
        v-on:click="SHOW_HIDE_SIDEBAR()"
      >
        <i class="las la-caret-square-left" v-if="sidebarHiding == false"></i>
        <i class="las la-caret-square-right" v-if="sidebarHiding == true"></i>
        <span>Hide Sidebar</span>
      </v-ons-toolbar-button>
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
        thickness: false,
        evaluation: false,
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
        thickness: [
          {
            id: 1,
            code: "Roof",
            path: "roof",
          },
          {
            id: 2,
            code: "Roof Nozzle",
            path: "roof-nozzle",
          },
          {
            id: 3,
            code: "Shell",
            path: "shell",
          },
          {
            id: 4,
            code: "Shell API Calculation",
            path: "shell-api-calculation",
          },
          {
            id: 5,
            code: "Shell Nozzle",
            path: "shell-nozzle",
          },
          {
            id: 6,
            code: "Coil",
            path: "coil",
          },
          {
            id: 7,
            code: "Piping",
            path: "piping",
          },
          {
            id: 8,
            code: "Bottom",
            path: "bottom",
          },
          {
            id: 9,
            code: "Annular",
            path: "annular",
          },
          {
            id: 10,
            code: "Critical Zone",
            path: "critical-zone",
          },
          {
            id: 11,
            code: "Projection Plate",
            path: "project-plate",
          },
          {
            id: 12,
            code: "MFL - Bottom",
            path: "mfl-bottom",
          },
          {
            id: 13,
            code: "MFL - Annular",
            path: "mfl-annular",
          },
          {
            id: 14,
            code: "Sump",
            path: "sump",
          },
        ],
        evaluation: [
          {
            id: 1,
            code: "Shell Settlement",
            path: "shell-settlement",
          },
          {
            id: 2,
            code: "Shell Plumbness",
            path: "shell-plumness",
          },
          {
            id: 3,
            code: "Shell Buckling",
            path: "shell-buckling",
          },
          {
            id: 4,
            code: "Local Deviations",
            path: "local-deviations",
          },
          {
            id: 5,
            code: "Roundness",
            path: "roundness",
          },
          {
            id: 6,
            code: "Grounding Connection",
            path: "ground-connection",
          },
          {
            id: 7,
            code: "MRT",
            path: "mrt",
          },
          {
            id: 8,
            code: "Bottom Settlement",
            path: "bottom-settlement",
          },
        ],
      },
      sidebarHiding: false,
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
      } else if (
        target == "thickness" &&
        this.sidebarSubmenu.thickness.length > 0
      ) {
        this.popoverVisible.thickness = true;
      } else if (
        target == "evaluation" &&
        this.sidebarSubmenu.evaluation.length > 0
      ) {
        this.popoverVisible.evaluation = true;
      }
    },
    GO_TO(item, target) {
      this.popoverVisible.markup_drawing = false;
      this.popoverVisible.checklist = false;
      this.popoverVisible.thickness = false;
      this.popoverVisible.evaluation = false;
      if (target == "drawing") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/tag/" +
            this.id_tag +
            "/marked-up-drawing/component/" +
            item.id,
          replace: true,
        });
      } else if (target == "checklist") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/tag/" +
            this.id_tag +
            "/checklist/form/" +
            item.id,
          replace: true,
        });
      } else if (target == "thickness") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/tag/" +
            this.id_tag +
            "/thickness/" +
            item.path,
          replace: true,
        });
      } else if (target == "evaluation") {
        this.$router.push({
          path:
            "/tank/client/" +
            this.id_company +
            "/tag/" +
            this.id_tag +
            "/evaluation/" +
            item.path,
          replace: true,
        });
      }
    },
    SHOW_HIDE_SIDEBAR() {
      if (this.sidebarHiding == false) this.sidebarHiding = true;
      else this.sidebarHiding = false;
      this.$emit("resizeGridLayout");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.app-sidebar {
  width: 200px;
  height: 100%;
  background-color: #140a4b;
  border: 1px solid #e6e6e6;
  border-width: 0 1px 0 0;
  position: relative;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .item-container {
    width: 100%;
    padding-top: 20px;
    transition: all 0.3s;

    .section-label {
      margin-left: 20px;
      margin-top: 20px;
      transition: all 0.3s;
      label {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff92;
        font-style: normal;
        transition: all 0.3s;
      }
      hr {
        width: -webkit-fill-available;
        margin-right: 10px;
        display: none;
        transition: all 0.3s;
      }
    }

    .section-label:first-child {
      margin-top: 0px;
    }

    .item {
      width: 180px;
      padding: 0;
      height: 34px;
      justify-content: flex-start;
      border-radius: 6px;
      margin: 10px auto;
      border: 0px;
      position: relative;
      transition: all 0.3s;
      i {
        margin-left: 15px;
        color: $web-font-color-white;
      }
      span {
        color: $web-font-color-white;
        font-weight: 500;
        font-size: 12px;
        transition: all 0.3s;
      }
      img {
        width: 18px;
        max-height: 18px;
        object-fit: contain;
        margin-left: 10px;
        margin-right: 10px;
      }
      i.right-arrow {
        position: absolute;
        top: 50%;
        right: -6px;
        transform: translateY(-50%);
        font-size: 14px;
      }
    }

    .item:hover,
    .router-link-active > .item,
    .router-link-exact-active > .item {
      background: $dexon-primary-red;
    }

    .bottom-btn {
      justify-content: center;
      i {
        margin: 0 10px;
        margin-left: 0;
      }
    }
  }

  .fixed-panel {
    background-color: #140a4b;
  }
}
@media screen and (max-width: 1024px) {
  .app-sidebar {
    .app-sidebar-hide {
      width: fit-content;
      transition: all 0.3s;
      .item-container {
        width: 54px;
        padding-top: 10px;
        .section-label {
          margin: 0;
          label {
            display: none;
          }
          hr {
            margin: 0 10px;
            display: block;
            transition: all 0.3s;
          }
        }
        .item {
          width: fit-content;
          justify-content: center;
          span,
          i {
            display: none;
          }
        }
        .bottom-btn {
          left: 10px;
          width: 38px;

          i {
            display: inherit !important;
            margin: 0;
            margin-left: 0;
          }
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

.app-sidebar-hide {
  width: fit-content;
  transition: all 0.3s;
  .item-container {
    width: 54px;
    padding-top: 10px;
    .section-label {
      margin: 0;
      label {
        display: none;
      }
      hr {
        margin: 0 10px;
        display: block;
        transition: all 0.3s;
      }
    }
    .item {
      width: fit-content;
      justify-content: center;
      span,
      i {
        display: none;
      }
    }
    .bottom-btn {
      width: 38px;
      i {
        display: inherit !important;
        margin: 0;
      }
    }
  }
}
</style>