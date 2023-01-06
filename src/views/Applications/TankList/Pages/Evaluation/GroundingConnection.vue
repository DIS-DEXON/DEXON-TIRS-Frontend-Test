<template>
  <div class="page-container">
    <!-- <innerPageName
      pageName="Evaluation"
      breadcrumb1="Grounding Connection"
      style="grid-column: span 2"
    /> -->
    <div class="list-panel">
      <!-- <div class="column-header">Inspection Record</div> -->
      <!-- <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div
            class="list-item-wrapper"
            :class="{
              active: item.id_inspection_record == id_inspection_record,
            }"
          >
            <div class="contents">
              <span style="font-weight: bold; color: red; border-radius: 4px"
                >ID: {{ item.id_inspection_record }}</span
              >
              <br />
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              {{ SET_CAMPAIGN(item.id_campaign) }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_GROUND(item.id_inspection_record)"
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList> -->
      <v-ons-list>
        <v-ons-list-header>Inspection Record</v-ons-list-header>
        <v-ons-list-item tappable v-for="item in inspRecordList" :key="item.id">
          <div class="center">
            {{ DATE_FORMAT(item.inspection_date) }}<br />
            {{ SET_CAMPAIGN(item.id_campaign) }}
          </div>
          <div class="right">
            <v-ons-toolbar-button v-on:click="VIEW_GROUND(item)">
              <i class="las la-search"></i>
            </v-ons-toolbar-button>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header
          >Inspection Details of
          {{ DATE_FORMAT(current_view.inspection_date) }}</v-ons-list-header
        >
      </v-ons-list>
      <div class="report-sheet">
        <div class="report-container">
          <div class="sheet-body" style="border: 0">
            <DxDataGrid
              id="ground-connect-grid"
              key-expr="id_eval"
              :data-source="groundConnect"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
              @row-inserted="CREATE_GROUND"
              @row-updated="UPDATE_GROUND"
              @row-removed="DELETE_GROUND"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="IS_VISIBLE_ADD()"
                :use-icons="true"
                mode="row"
              />

              <DxColumn
                data-field="ground_no"
                caption="Grounding connection no"
              />

              <DxColumn
                data-field="measured"
                caption="The measured resistance to ground (ohms)"
                format="#,##0.00"
              />

              <DxColumn data-field="note" caption="Note" />

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
          <div class="sheet-body">
            <div class="section-label">
              <label>Grouding Connection Detail</label>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Total Resistance (ohms)</label>
              </div>
              <div class="form-item-value">
                <input
                  v-model="groundConnectDetail.total"
                  @focusout="UPDATE_GC()"
                />
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-label">
                <label>Acceptance Criteria (ohms)</label>
              </div>
              <div class="form-item-value">
                <input
                  @focusout="UPDATE_GC()"
                  v-model="groundConnectDetail.acceptance_criteria"
                />
              </div>
            </div>

            <div class="form-item" style="grid-template-rows: 101px">
              <div class="form-item-label">
                <label>Result</label>
              </div>
              <div class="form-item-textarea">
                <textarea
                  @focusout="UPDATE_GC()"
                  v-model="groundConnectDetail.result"
                />
              </div>
            </div>
            <div class="form-item" style="grid-template-rows: 101px">
              <div class="form-item-label">
                <label>Measurement Summary</label>
              </div>
              <div class="form-item-textarea">
                <textarea
                  @focusout="UPDATE_GC()"
                  v-model="groundConnectDetail.measurement_summary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-instruction">
        <appInstruction title="Instruction" desc="The acceptance criteria">
          <ol>
            <li>
              The distance between grounding connection is between 6 to 30 m.
            </li>
            <li>
              Total resistance from tank to earth not more than 25 ohms (API
              575) or 10 ohms (Thai regulation) or Customer.
            </li>
          </ol>
        </appInstruction>
      </div>
    </div>
    <div class="list-page" v-if="this.id_inspection_record == ''">
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
  name: "ViewProjectList",
  components: {
    //VueTabsChrome,
    // DxList,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    // innerPageName,
    DxHeaderFilter,
    DxFilterRow,
    appInstruction,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Grounding Connection",
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      groundConnect: {},
      groundConnectDetail: {},
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      id_inspection_record: 0,
      current_view: null,
      dataGridAttributes: {
        class: "data-grid-style",
      },
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
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    VIEW_GROUND(item) {
      this.groundConnectDetail = {};
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      //GG Table
      axios({
        method: "post",
        url: "grounding-connection/grounding-connection-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("ground:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.groundConnect = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
      //CG Detail
      axios({
        method: "post",
        url: "grounding-connection/grounding-connection-detail-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("ground detail:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.groundConnectDetail = res.data[0];
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_GROUND(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_eval = 0;
      e.data.id_inspection_record = this.id_inspection_record;
      console.log(e.data);
      axios({
        method: "post",
        url: "grounding-connection/add-grounding-connection",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_GROUND(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_GROUND(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "grounding-connection/edit-grounding-connection",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_GROUND(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_GROUND(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "grounding-connection/delete-grounding-connection",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_GROUND(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CAMPAIGN() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.campaignList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CAMPAIGN(id) {
      if (this.campaignList) {
        var data = this.campaignList.filter(function (e) {
          return e.id_campaign == id;
        });
        // console.log(data);
        return data[0].campaign_desc;
      }
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    UPDATE_GC() {
      axios({
        method: "put",
        url: "grounding-connection/edit-grounding-connection-detail",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: this.groundConnectDetail,
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            console.log("GC Updated");
            console.log(res.data);
            // this.VIEW_GROUND(this.current_view);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  // padding: 20px;
  display: grid;
  grid-template-columns: 250px calc(100% - 250px);
  // grid-auto-rows: 27px auto;
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

.info-tab-display {
  display: flex;
}

.dx-list-item-content::before {
  content: none;
}
#data-grid-style {
  width: 100%;
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}

.app-instruction {
  margin-top: 20px;
}

.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  .report-container {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px;
    width: calc(100% - 20px);

    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: 100%;
      border-radius: 6px;
      overflow: hidden;
      .form-item {
        display: grid;
        grid-template-columns: 200px calc(100% - 200px);
        grid-template-rows: 35px;
        .form-item-label {
        }
        .form-item-value {
          grid-column: span 1;
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
          grid-column: span 1;
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