<template>
  <div class="page-container">
    <innerPageName
      pageName="Evaluation"
      breadcrumb1="Roundness"
      style="grid-column: span 2"
    />
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div
            class="list-item-wrapper"
            :class="{
              active: item.id_inspection_record == id_inspection_record,
            }"
          >
            <div class="contents">
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              {{ SET_CAMPAIGN(item.id_campaign) }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_ROUNDNESS(item.id_inspection_record)"
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <div class="table-wrapper">
        <DxDataGrid
          id="roundness-grid"
          key-expr="id_eval"
          :data-source="roundnessList"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_ROUNDNESS"
          @row-updated="UPDATE_ROUNDNESS"
          @row-removed="DELETE_ROUNDNESS"
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

          <DxColumn data-field="point_no" caption="Point No." />

          <DxColumn
            data-field="distance_above_bottom"
            caption="Distance Above Bottom (m)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="measure_value"
            caption="Radius Meassured Value (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="relative_to_nom"
            caption="Relative to nom. (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="radius_tolerance"
            caption="Radius Tolerance (mm)"
            format="#,##0.00"
          />

          <DxColumn data-field="result" caption="Inspection Result" />

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
      <div class="chart-wrapper">
        <chart :roundnessData="roundnessList" :key="roundnessList" />
      </div>
      <div class="app-instruction" style="grid-column: span 2">
        <appInstruction
          title="Guideline"
          desc="Radii measured at 1 ft (0.3048 m) above the shell-to-bottom weld and Radius tolerances measured higher than one foot [>1 ft (0.3048m)] above the shell-to-bottom weld shall not exceed the tolerances show in Table."
        >
          <table class="instruction-table">
            <tr>
              <th>Tank Diameter m (ft)</th>
              <th>
                Radius Tolerance mm (in)<br />
                (≤ 0.3048 m)
              </th>
              <th>
                Radius Tolerance mm (in)<br />
                (> 0.3048 m)
              </th>
            </tr>
            <tr>
              <td>&lt; 12 (40)</td>
              <td>±13 (&#189;)</td>
              <td>±39 (3&#189;)</td>
            </tr>
            <tr>
              <td>from 12 (40) to &lt; 45 (150)</td>
              <td>±19 (¾)</td>
              <td>±57 (3¾)</td>
            </tr>
            <tr>
              <td>from 45 (150) to &lt; 75 (250)</td>
              <td>±25 (1)</td>
              <td>±75 (3)</td>
            </tr>
            <tr>
              <td>≥ 75 (250)</td>
              <td>±32 (1¼)</td>
              <td>±96 (3¼)</td>
            </tr>
          </table>
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
import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import chart from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-roundness-line.vue";

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
import { DxList } from "devextreme-vue/list";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "ViewProjectList",
  components: {
    //VueTabsChrome,
    DxList,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    innerPageName,
    DxHeaderFilter,
    DxFilterRow,
    appInstruction,
    chart,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Thickness Messurement");
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      roundnessList: {},
      roundnessListDetail: {},
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      id_inspection_record: "",
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
    VIEW_ROUNDNESS(id_inspection_record) {
      this.id_inspection_record = id_inspection_record;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "roundness/get-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: id_inspection_record,
        },
      })
        .then((res) => {
          console.log("get roundness list:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.roundnessList = res.data;
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
          console.log(res);
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
        console.log(data);
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
    CREATE_ROUNDNESS(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_eval = 0;
      e.data.id_tag = id_tag;
      e.data.id_inspection_record = this.id_inspection_record;

      console.log(e.data);
      axios({
        method: "post",
        url: "roundness/add-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ROUNDNESS(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_ROUNDNESS(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "roundness/edit-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ROUNDNESS(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_ROUNDNESS(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "roundness/delete-roundness",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ROUNDNESS(this.id_inspection_record);
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
  grid-auto-rows: 27px auto;
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
.chart-wrapper {
  padding: 0 10px;
}

.info-tab-display {
  display: flex;
}

.list-page {
  height: fit-content;
  margin-bottom: 20px;
  width: calc(100% - 20px);
  height: calc(100% - 39px);
  padding: 20px 10px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 600px calc(100% - 600px);
  grid-template-rows: 500px auto;
  position: relative;
}

.dx-list-item-content::before {
  content: none;
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.btn-view-dwg {
  padding: 8px;
  text-align: center;
  background-color: #eb1851;
  color: #fff;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.app-instruction {
  padding: 20px 10px;
}

.table-wrapper {
  padding: 0 10px;
  height: 100%;
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
}
</style>