<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel
      @showHidePanel="SHOW_HIDE_PANEL"
      @viewItem="VIEW_ITEM"
    />

    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          <b>
            Details of Inspection on
            {{ DATE_FORMAT(current_view.inspection_date) }}</b
          ></v-ons-list-header
        >
      </v-ons-list>

      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div v-if="tabCurrent == 'data'" class="tab1-grid">
        <div class="content">
          <div class="report-sheet">
            <div class="report-container">
              <div class="sheet-body">
                <div class="section-label">
                  <label>Create evaluation point</label>
                </div>
                <div class="form-item"></div>
              </div>
            </div>
          </div>
          <div class="table-wrapper">
            <DxDataGrid
              id="roundness-grid"
              key-expr="id_eval"
              :data-source="shellPointList"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
              @row-inserted="CREATE"
              @row-updated="UPDATE"
              @row-removed="DELETE"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="false"
                :use-icons="true"
                mode="row"
              />

              <DxColumn
                data-field="location"
                caption="Evaluation Location at the Tank (Mark on shell map)"
                :allow-editing="false"
              />

              <DxColumn
                data-field="maximum_space"
                caption="Distance Between Survey Location (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="cumulative"
                caption="Cumulative Distance Around Tank (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="relative_value"
                caption="Relative Level/Distance Above Datum Point (mm)"
                format="#,##0.00"
              />

              <DxColumn type="buttons">
                <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
                <DxButton name="edit" hint="Edit" icon="edit" />
                <DxButton name="delete" hint="Delete" icon="trash" />
              </DxColumn>

              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxScrolling mode="standard" />
              <DxSearchPanel :visible="false" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <!-- <DxExport :enabled="true" /> -->
            </DxDataGrid>
          </div>
        </div>
        <div class="app-instruction">
          <appInstruction
            title="Measurement Conceptualization"
            desc="Measurements of Shell Settlement (External)"
          >
            <ol>
              <li>
                There must be at least 8 settlement points. The maximum spacing
                of settlement point is 32 ft. (9.7536 m) around the
                circumference.
              </li>
              <li>
                Points shall be equally spaced around the tank shell. There must
                be at least 4 equally spaced diametrical measurements.
              </li>
              <li>The spacing settlement and quantity of measurement points</li>
            </ol>
          </appInstruction>
          <appInstruction
            style="margin-top: 20px"
            title="The Maximum Spacing of Settlement Points"
          >
            <div class="img-box">
              <img src="/img/tank-shell-max-space-settlement.png" />
            </div>
          </appInstruction>
          <appInstruction style="margin-top: 20px" title="Datum Point Location">
          </appInstruction>
        </div>
      </div>
      <div v-if="tabCurrent == 'api653'" class="tab2-grid">
        <h1>TWWTRF</h1>
        <div class="content">
          <div class="table-wrapper">
            <DxDataGrid
              id="settlement-2-grid"
              key-expr="id_eval"
              :data-source="shellCal2List"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxColumn
                data-field="location"
                caption="Dato Point"
                :allow-editing="false"
              />

              <DxColumn
                data-field="cumulative"
                caption="Circumferential Distance"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="reduced_level"
                caption="Reduced Level"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="theta_radians"
                caption="Theta Radians"
                format="#,##0.00"
              />

              <DxColumn
                data-field="theta_degrees"
                caption="Theta Degrees"
                format="#,##0.00"
              />

              <DxColumn
                data-field="relative_value"
                caption="Relative Level"
                format="#,##0.00"
              />

              <DxColumn
                data-field="y"
                caption="Y=A+B Cos(Theta-C)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="difference_value"
                caption="Difference (Ui)"
                format="#,##0.00"
              />

              <DxColumn
                data-field=""
                caption="Out of Plane Deflection (Si)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="deviation_value"
                caption="Deviation"
                format="#,##0.00"
              />

              <DxColumn
                data-field="difference_2_value"
                caption="Difference(2)"
                format="#,##0.00"
              />

              <DxColumn
                data-field="deviation_2_value"
                caption="Deviation(2)"
                format="#,##0.00"
              />

              <DxColumn type="buttons">
                <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
                <DxButton name="edit" hint="Edit" icon="edit" />
                <DxButton name="delete" hint="Delete" icon="trash" />
              </DxColumn>

              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxScrolling mode="standard" />
              <DxSearchPanel :visible="false" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <!-- <DxExport :enabled="true" /> -->
            </DxDataGrid>
          </div>
        </div>
      </div>
    </div>
    <div
      class="list-page"
      style="height: 100%"
      v-if="this.id_inspection_record == ''"
    >
      <div class="center-box-wrapper">
        <div class="page-content-message-wrapper">
          <i class="las la-search"></i>
          <span>
            Select inspection record <br />
            to view information</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
// import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import VueTabsChrome from "vue-tabs-chrome";

//DataGrid
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxEditing,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
} from "devextreme-vue/data-grid";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "ShellSettlementView",
  components: {
    //VueTabsChrome,
    //DxList,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    appInstruction,
    InspectionRecordPanel,
    VueTabsChrome,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Shell Settlement",
    });
  },
  data() {
    return {
      shellPointList: {},
      isLoading: false,
      id_inspection_record: "",
      current_view: "",
      dataGridAttributes: {
        class: "data-grid-style",
      },
      pagePanelHiding: false,
      tabCurrent: "data",
      tabs: [
        {
          label: "Shell Settlement Data",
          key: "data",
          closable: false,
        },
        {
          label: " Evaluation (API 653)",
          key: "api653",
          closable: false,
        },
      ],
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("get shell point list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.shellPointList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE(e) {
      console.log(e);
    },
    UPDATE(e) {
      console.log(e);
      axios({
        method: "put",
        url: "shell-settlement/edit-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE(e) {
      console.log(e);
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
  .content {
    width: 100%;
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 600px calc(100% - 600px);
    // grid-gap: 20px;
    display: block;
  }
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.app-instruction {
  // padding-top: 20px;

  .img-box {
    width: auto;
    margin: 10px 0;
    border: 1px solid #f0f0d2;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.table-wrapper {
  height: 100%;
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
}

.tab-wrapper {
  height: 48px;
  margin: -20px -20px 20px -20px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 500;
}
.info-tab-display {
  display: flex;
}

.tab1-grid {
  display: grid;
  grid-gap: 20px;
  width: 100%;
  grid-template-columns: auto 500px;
}

.tab-top-page {
  background-color: #d9d9da;
}

.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 20px;
  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      border-radius: 6px;
      overflow: hidden;
      .section-label {
        label {
          font-size: 12px;
          text-transform: capitalize;
        }
      }
      .form-item {
        display: grid;
        grid-template-columns: 150px calc(100% - 250px) 100px;
        grid-template-rows: 35px;
        .form-item-label {
        }
        .form-item-value {
          grid-column: span 1;
          border-right: 0;
          input {
            text-align: center;
            // margin-right: 20px;
          }
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
        .form-item-textarea {
          textarea {
            height: auto;
            max-height: 80px;
            overflow-y: auto;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}
</style>