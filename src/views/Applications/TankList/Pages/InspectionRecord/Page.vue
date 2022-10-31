<template>
  <div class="page-container">
    <div class="tab-wrapper">
      <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
    </div>
    <div class="page-section info-tab-display" v-if="tabCurrent == 'info'">
      <div id="report-sheet">
        <div class="report-container">
          <div class="sheet-body">
            <div class="section-label" style="grid-column: span 2">
              <label>tank specification</label>
            </div>
            <div class="form-item" v-for="item in generalInfo" :key="item.desc">
              <div class="form-item-label">
                <label>{{ item.desc }}</label>
              </div>
              <div class="form-item-value">
                <label>{{ item.value }}</label>
              </div>
            </div>
            <div
              class="form-item"
              style="grid-column: span 2; grid-row: span 2"
            >
              <div class="form-item-label">
                <label>Foundation</label>
              </div>
              <div class="form-item-value">
                <label>{{ infoTank.foundation }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="report-sheet"
        style="width: 500px; height: 100%; margin-left: 20px"
      >
        <div class="report-container" style="height: 100%">
          <div class="sheet-body" style="display: block; height: 100%">
            <div style="height: 50%">
              <div class="section-label">
                <label>overview picture</label>
              </div>

              <div class="form-item-picture-log">
                <div class="img-box">
                  <div class="btn-panel">
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="infoTank.pic_overview"
                    >
                      <i class="las la-expand-arrows-alt"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="infoTank.pic_overview"
                    >
                      <i class="las la-trash"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="!infoTank.pic_overview"
                    >
                      <i class="las la-plus"></i>
                    </v-ons-toolbar-button>
                  </div>
                  <img
                    :src="infoTank.pic_overview"
                    v-if="infoTank.pic_overview"
                  />
                  <div class="">
                    <i class="las la-image" v-if="!infoTank.pic_overview"></i>
                    <label v-if="!infoTank.pic_overview">No Image</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="section-label">
                <label>name plate</label>
              </div>

              <div class="form-item-picture-log">
                <div class="img-box">
                  <div class="btn-panel">
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="infoTank.pic_nameplate"
                    >
                      <i class="las la-expand-arrows-alt"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="infoTank.pic_nameplate"
                    >
                      <i class="las la-trash"></i>
                    </v-ons-toolbar-button>
                    <v-ons-toolbar-button
                      class="btn"
                      v-on:click="PREVIEW_IMG(currentViewRow.receipt_img)"
                      v-if="!infoTank.pic_nameplate"
                    >
                      <i class="las la-plus"></i>
                    </v-ons-toolbar-button>
                  </div>
                  <img
                    :src="infoTank.pic_nameplate"
                    v-if="infoTank.pic_nameplate"
                  />
                  <i class="las la-image" v-if="!infoTank.pic_nameplate"></i>
                  <label v-if="!infoTank.pic_nameplate">No Image</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shellCourse v-if="tabCurrent == 'info'" />
    <div v-if="tabCurrent == 'drawing'">
      <drawingTable />
      <pidTable />
    </div>
    <div v-if="tabCurrent == 'doc'">
      <generalDocTable />
    </div>
  </div>
</template> 

<script>
//API
// import axios from "/axios.js";
import moment from "moment";

//Components
import VueTabsChrome from "vue-tabs-chrome";
import shellCourse from "@/views/Applications/TankList/Pages/Information/table-shell-course.vue";
import drawingTable from "@/views/Applications/TankList/Pages/Information/table-drawing.vue";
import pidTable from "@/views/Applications/TankList/Pages/Information/table-pid.vue";
import generalDocTable from "@/views/Applications/TankList/Pages/Information/table-generalDoc.vue";

//DataGrid

export default {
  name: "ViewProjectList",
  components: {
    VueTabsChrome,
    shellCourse,
    drawingTable,
    pidTable,
    generalDocTable,
  },
  created() {},
  data() {
    return {
      infoTank: {
        id_tank: 12,
        construction_code: "API 650",
        inspection_code: "API 653 & Thai Law",
        tank_status: "Operational",
        tank_capacity: 1660103.0,
        tank_height: 10.973,
        joint_efficiency: 1.0,
        max_liquid_level: 10.97,
        bottom_nominal_thk: 6.35,
        diameter: 14.63,
        annualar_nonimal_thk: 9.53,
        no_of_shell_course: 6,
        roof_nominal_thk: 4.76,
        tank_internal_pressure: "Atmospheric",
        design_pressure_shell: 14.7,
        roof_type: "Fixed",
        roof_shape: "Coned",
        bottom: "Coned down",
        insulation: "Not Insulated",
        insulation_thk: null,
        product: "Crude Oil",
        sg_of_product: 1.0,
        operating_pressure_shell: 14.7,
        design_pressure_coil: null,
        operating_pressure_coil: null,
        installation_date: "2022-10-09",
        inservice_date: "2022-10-01",
        prev_inspection_date: "2022-11-02",
        inservice_age_of_tank: 5,
        foundation: null,
        pic_overview: "/img/mockup/img.png",
        pic_nameplate: null,
      },
      tabCurrent: "info",
      tabs: [
        {
          label: "General Information",
          key: "info",
          closable: false,
        },
        {
          label: "Drawing and P&ID",
          key: "drawing",
          closable: false,
        },
        {
          label: "General Document",
          key: "doc",
          closable: false,
        },
      ],
    };
  },
  computed: {
    generalInfo() {
      var info = [
        {
          desc: "Construction Code",
          value: this.infoTank.construction_code,
        },
        {
          desc: "Tank Status",
          value: this.infoTank.tank_status,
        },
        {
          desc: "Inspection Code",
          value: this.infoTank.inspection_code,
        },
        {
          desc: "Tank Capacity (Litre)",
          value: this.infoTank.tank_capacity,
        },
        {
          desc: "Tank Height (m)",
          value: this.infoTank.tank_height,
        },
        {
          desc: "Joint Efficiency",
          value: this.infoTank.joint_efficiency,
        },
        {
          desc: "Max. Liquid Level (m)",
          value: this.infoTank.max_liquid_level,
        },
        {
          desc: "Bottom Nominal Thk. (mm)",
          value: this.infoTank.bottom_nominal_thk,
        },
        {
          desc: "Diameter (m)",
          value: this.infoTank.diameter,
        },
        {
          desc: "Annular Nominal Thk. (mm)",
          value: this.infoTank.annualar_nonimal_thk,
        },
        {
          desc: "No. of Shell Course",
          value: this.infoTank.no_of_shell_course,
        },
        {
          desc: "Roof Nominal Thk. (mm)",
          value: this.infoTank.roof_nominal_thk,
        },
        {
          desc: "Tank Internal Pressure ",
          value: this.infoTank.tank_internal_pressure,
        },
        {
          desc: "Design Pressure Shell (psig)",
          value: this.infoTank.design_pressure_shell,
        },
        {
          desc: "Roof Type",
          value: this.infoTank.design_pressure_shell,
        },
        {
          desc: "Operating Pressure Shell (psig)",
          value: this.infoTank.operating_pressure_shell,
        },
        {
          desc: "Roof Shape",
          value: this.infoTank.roof_shape,
        },
        {
          desc: "Design Pressure Coil (psig)",
          value: this.infoTank.design_pressure_coil,
        },
        {
          desc: "Bottom",
          value: this.infoTank.bottom,
        },
        {
          desc: "Operating Pressure Coil (psig)",
          value: this.infoTank.operating_pressure_coil,
        },
        {
          desc: "Insulation ",
          value: this.infoTank.insulation,
        },
        {
          desc: "Installation Date ",
          value: moment(this.infoTank.installation_date).format("LL"),
        },
        {
          desc: "Insulation Thickness (mm)",
          value: this.infoTank.insulation_thk,
        },
        {
          desc: "In-service Date ",
          value: moment(this.infoTank.inservice_date).format("LL"),
        },
        {
          desc: "Product",
          value: this.infoTank.product,
        },
        {
          desc: "Previous Inspection Date",
          value: moment(this.infoTank.prev_inspection_date).format("LL"),
        },
        {
          desc: "SG of Product",
          value: this.infoTank.sg_of_product,
        },
        {
          desc: "In-service Age of Tank",
          value: this.infoTank.inservice_age_of_tank,
        },
      ];
      return info;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;

  overflow-y: scroll;
}
#report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 50% 50%;
      .form-item {
        display: grid;
        grid-template-columns: 220px calc(100% - 220px);
        grid-template-rows: 35px;
        .form-item-label {
          label {
            // text-transform: capitalize;
          }
        }
        .form-item-value {
          grid-column: span 1;
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.tab-wrapper {
  height: 48px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 14px;
}
.info-tab-display {
  display: flex;
}
</style>