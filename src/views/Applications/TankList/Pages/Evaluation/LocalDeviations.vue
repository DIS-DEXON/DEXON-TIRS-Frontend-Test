<template>
  <div class="page-container">
    <div class="list-panel">
      <!-- <div class="column-header">Inspection Record</div>
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
                v-on:click="VIEW_LOCAL(item.id_inspection_record)"
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
            <v-ons-toolbar-button v-on:click="VIEW_LOCAL(item)">
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
          <b>
            {{ DATE_FORMAT(current_view.inspection_date) }}</b
          ></v-ons-list-header
        >
      </v-ons-list>
      <DxDataGrid
        id="local-deviation-grid"
        key-expr="id_eval"
        :data-source="localDeviation"
        :element-attr="dataGridAttributes"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
        :show-borders="true"
        :show-row-lines="true"
        :row-alternation-enabled="false"
        :word-wrap-enabled="true"
        @row-inserted="CREATE_LOCAL"
        @row-updated="UPDATE_LOCAL"
        @row-removed="DELETE_LOCAL"
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

        <DxColumn data-field="no" caption="No." />

        <DxColumn data-field="deviation_type" caption="Deviation type">
          <DxLookup :data-source="deviationType" />
        </DxColumn>

        <DxColumn data-field="plate_1" caption="Between plate" />

        <DxColumn data-field="plate_2" caption="And plate" />

        <DxColumn
          data-field="deviation_mm"
          caption="Deviation (mm)"
          format="#,##0.00"
        />

        <DxColumn
          data-field="tolerance"
          caption="Radius tolerance (mm)"
          format="#,##0.00"
          :allow-editing="false"
        />

        <DxColumn
          data-field="result"
          caption="Inspection result"
          :allow-editing="false"
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
      <div class="app-instruction">
        <appInstruction
          title="Instruction"
          desc="Radii measured at 1 ft (0.3048 m) above the shell-to-bottom weld and Radius tolerances measured higher than one foot [>1 ft (0.3048m)] above the shell-to-bottom weld shall not exceed the tolerances show in Table."
          ><ol>
            <li>
              Deviations (peaking) at vertical weld joints shall not exceed 13
              mm (1/2 in.). Peaking at vertical weld joints shall be determined
              using a horizontal sweep board 900 mm (36 in.) long. The sweep
              board shall be made to the nominal radius of the tank.
            </li>
            <li>
              Deviations (banding) at horizontal weld joints shall not exceed 13
              mm (1/2 in.). Banding at horizontal weld joints shall be
              determined using a straight edge vertical sweep board 900 mm (36
              in.) long.
            </li>
            <li>
              DFlat spots measured in the vertical plane shall not exceed 1/200
              of the total height.
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
  DxLookup,
} from "devextreme-vue/data-grid";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
//import { DxItem } from "devextreme-vue/form";

export default {
  name: "LocalDeviationView",
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
    DxLookup,
    appInstruction,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit(
      "UPDATE_CURRENT_PAGENAME",
      "Evaluation / Local Deviations"
    );
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      localDeviation: {},
      inspRecordList: {},
      campaignList: {},
      deviationType: ["Peaking", "Banding", "Flat spots"],
      isLoading: false,
      id_inspection_record: 0,
      current_view: {},
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
    VIEW_LOCAL(item) {
      var id_tag = this.$route.params.id_tag;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      axios({
        method: "post",
        url: "local-deviation/get-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("local:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.localDeviation = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_LOCAL(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_eval = 0;
      e.data.id_inspection_record = this.id_inspection_record;
      console.log(e.data);
      axios({
        method: "post",
        url: "local-deviation/add-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_LOCAL(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_LOCAL(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "local-deviation/edit-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_LOCAL(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_LOCAL(e) {
      console.log(e.data);
      axios({
        method: "delete",
        url: "local-deviation/delete-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_LOCAL(this.id_inspection_record);
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
  grid-template-columns: 250px calc(100% - 250px);
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

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}
.app-instruction {
  padding-top: 20px;
}
</style>