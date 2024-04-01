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
      <div>
        <DxDataGrid
          id="data-table-cml"
          key-expr="id_sum"
          :data-source="summaryOfFinding"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :column-hiding-enabled="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_SOF"
          @row-updated="UPDATE_SOF"
          @row-removed="DELETE_SOF"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="IS_VISIBLE_ADD()"
            :use-icons="true"
            mode="form"
          >
            <DxForm label-location="top">
              <DxItem :col-count="2" :col-span="2" item-type="group">
                <DxItem data-field="id_tank_part" :col-span="1" />
                <DxItem data-field="item_no" :col-span="1" />
                <DxItem data-field="content" editor-type="dxTextArea" :col-span="2" />
              </DxItem>
            </DxForm>
          </DxEditing>

          <DxColumn data-field="id_tank_part" caption="PART" :width="200" :editor-options="{ placeholder: 'Select' }">
            <DxLookup :data-source="mdTankPart" display-expr="code" value-expr="id" />
          </DxColumn>

          <DxColumn data-field="item_no" caption="Item No." :width="200" :editor-options="{ placeholder: 'Item No.' }" />
          
          <DxColumn data-field="content" caption="Content" :min-width="200" cell-template="dxTextArea" :editor-options="{ placeholder: 'Content' }" />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

          <template #dxTextArea="{ data }">
            <div>
              <DxTextArea :height="100" :read-only="true" :value="data.value" />
            </div>
          </template>

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
      <PageLoading v-if="isLoading == true" text="Loading. . ." />
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
import DxTextArea from "devextreme-vue/text-area";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
//import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import PageLoading from "@/components/app-structures/app-loading.vue";

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
  DxForm
} from "devextreme-vue/data-grid";

//FileUpload
//import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
import { DxItem } from "devextreme-vue/form";

const fileUploaderRef = "fu";
const imgRef = "img";

export default {
  name: "ViewProjectList",
  components: {
    //VueTabsChrome,
    SelectInspRecord,
    PageLoading,
    //appInstruction,
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
    InspectionRecordPanel,
    DxLookup,
    DxTextArea,
    DxItem,
    DxForm
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "MFL - Bottom"
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_MD_TANK_PART();
      console.log("test");
    }
  },
  data() {
    return {
      summaryOfFinding: {},
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      fileUploaderRef,
      imgRef,
      imgDwg: "",
      file: [],
      isInitEdit: 0,
      id_component: 0,
      id_inspection_record: 0,
      dataGridAttributes: {
        class: "data-grid-thk-style"
      },
      pagePanelHiding: false,
      current_view: {},
      mdTankPart: [],
      // typeOfRepair: [
      //   { code: "Patch Plate" },
      //   { code: "Recoating" },
      //   { code: "Deposited weld" }
      // ],
      repairStatus: [{ code: "Yes" }, { code: "No" }],
      dataSOF: null
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
      this.dataSOF = null;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      console.warn(this.id_inspection_record);
      this.FETCH_SOF(this.current_view);
    },
    FETCH_SOF() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/SumOfFindings/get-sum-of-findings-by-id-insp-record?id_insp=" + this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
      })
        .then(res => {
          console.log("SOF:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.summaryOfFinding = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_SOF(e) {
      this.isLoading = true;
      e.data.id_sum = 0;
      e.data.id_inspection_record = this.id_inspection_record;
      console.log("data: ",e.data);
      axios({
        method: "post",
        url: "/SumOfFindings",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_SOF(e) {
      console.log(e.data);
      axios({
        method: "put",
        url: "/SumOfFindings/" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_SOF(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "/SumOfFindings/" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_thk: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            var item = [];
            item.id_inspection_record = this.id_inspection_record;
            this.VIEW_ITEM(item);
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
    },
    FETCH_MD_TANK_PART() {
        axios({
        method: "get",
        url: "/MdTankPart",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          if (res.status == 200 && res.data) {
            console.log("test api true");
            this.mdTankPart = res.data;
            console.log('mdTank ',res.data)
          }
        })
        .catch(error => {
          console.log(error);
          console.log("test api false");
        })
        .finally(() => {
          this.isLoading = false;
        });
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
.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}

#data-grid-style {
  width: 100%;
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
  .report-container {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
    width: calc(100% - 0px);
    margin-right: 0;
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
        grid-template-columns: 150px calc(100% - 250px) 100px;
        grid-template-rows: 35px;
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
  @media (max-width: 1130px) {
    .report-container {
      display: inline;
      .sheet-body {
        margin-bottom: 15px;
        .form-item {
          grid-template-columns: 200px calc(100% - 300px) 100px;
        }
      }
    }
  }
}
.table-wrapper {
  margin-top: 20px;
}
</style>