<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Details of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
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

        <DxColumn data-field="item_no" caption="No." />

        <DxColumn data-field="deviation_type" caption="Deviation type">
          <DxLookup :data-source="deviationType" />
        </DxColumn>

        <DxColumn data-field="joint_no" caption="Joint No." />

        <DxColumn data-field="location_1" caption="Location 1" />
        <DxColumn data-field="location_2" caption="Location 2" />
        <DxColumn data-field="location_3" caption="Location 3" />
        <DxColumn data-field="tolerance" caption="Tolerance (mm)" :allow-editing="false" />

        <DxColumn data-field="result" caption="Inspection result" :allow-editing="false" />

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
          desc="The sweep board shall be made to the outside radius of the tank."
        >
          <ol>
            <li>Deviations (peaking) at vertical weld joints shall not exceed 13 mm (1/2 in.). Peaking at vertical weld joints shall be determined using a horizontal sweep board 900 mm (36 in.) long.</li>
            <li>Deviations (banding) at horizontal weld joints shall not exceed 25 mm (1 in.). Banding at horizontal weld joints shall be determined using a straight edge vertical sweep board 900 mm (36 in.) long.</li>
            <li>DFlat spots measured in the vertical plane shall not exceed 1/200 of the total height.</li>
          </ol>
          <div class="img-box" style="margin-top:15px; max-width:60%">
            <img src="/img/local-deviations.png" style="width:100%" />
          </div>
        </appInstruction>
      </div>
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
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
import SelectInspRecord from "@/components/select-insp-record.vue";

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
  DxLookup
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
    InspectionRecordPanel,
    SelectInspRecord
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Local Deviations"
    });
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
        class: "data-grid-style"
      },
      pagePanelHiding: false
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    }
  },
  methods: {
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      var id_tag = this.$route.params.id_tag;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      axios({
        method: "post",
        url: "local-deviation/get-local-deviation",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("local:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.localDeviation = res.data;
          }
        })
        .catch(error => {
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
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
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
    }
  }
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
  padding-top: 20px;
}
</style>