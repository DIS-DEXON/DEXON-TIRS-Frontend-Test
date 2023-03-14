<template>
  <div class="page-container">
    <div class="page-section">
      <DxDataGrid
        id="data-grid-style"
        key-expr="id_inspection_record"
        :data-source="inspRecordList"
        :element-attr="dataGridAttributes"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
        :show-borders="true"
        :show-row-lines="true"
        :row-alternation-enabled="false"
        :column-hiding-enabled="true"
        @exporting="EXPORT_DATA"
        :word-wrap-enabled="true"
        @row-inserted="CREATE_RECORD"
        @row-updated="UPDATE_RECORD"
        @row-removed="DELETE_RECORD"
      >
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="true"
          :use-icons="true"
          mode="form"
        >
          <DxForm label-location="top">
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="inspection_date" :col-span="1" />
              <DxItem data-field="project_no" :col-span="1" />
              <DxItem data-field="report_no" :col-span="1" />
              <DxItem data-field="id_campaign" :col-span="1" />
              <DxItem data-field="name_api_653" :col-span="1" />
              <DxItem data-field="cert_no" :col-span="1" />
              <DxItem data-field="name_inspection_engineer" :col-span="1" />
              <DxItem data-field="name_ndt_examiner" :col-span="1" />
              <DxItem data-field="remark" :col-span="2" />
            </DxItem>
          </DxForm>
        </DxEditing>
      
        <!-- <DxColumn
        data-field="created_time"
        :width="0"
        caption=""
        sort-order="asc"
      /> -->
        <DxColumn
          data-field="inspection_date"
          caption="Inspection date"
          data-type="date"
          format="dd MMM yyyy"
          sort-order="desc"
          :width="140"
          :editor-options="inspDateInputOptions"
        >
        <DxRequiredRule />
        </DxColumn>

        <DxColumn
          data-field="project_no"
          caption="Project number"
          :width="140"
          :editor-options="projectNoInputOptions"
        >
        <DxRequiredRule />
        </DxColumn>

        <DxColumn 
          data-field="report_no" 
          caption="Report number" 
          :width="140"
          :editor-options="reportNoInputOptions"
        />

        <DxColumn data-field="id_campaign" caption="Campaign" :width="100">
          <DxLookup
            :data-source="campaigeList"
            value-expr="id_campaign"
            display-expr="campaign_desc"
          />
          <DxRequiredRule />
        </DxColumn>
        
        <DxColumn 
          data-field="name_api_653" 
          caption="Name of API 653" 
          :width="200" 
          :editor-options="nameInputOptions"
        />

        <DxColumn 
          data-field="cert_no" 
          caption="API 653 cert no" 
          :width="200" 
          :editor-options="certInputOptions"
        />

        <DxColumn 
          data-field="name_inspection_engineer" 
          caption="Name of inspection engineer" 
          :width="200" 
          :editor-options="nameInputOptions"
        />

        <DxColumn 
          data-field="name_ndt_examiner" 
          caption="Name of NDT examiner" 
          :width="200" 
          :editor-options="nameInputOptions"
        />


        <DxColumn 
          data-field="remark" 
          caption="Remark" 
        >
          <!-- <DxFormItem
            :col-span="2"
          /> -->
        </DxColumn>
        <!-- Configuration goes here -->
        <!-- <DxFilterRow :visible="true" /> -->
        <DxScrolling mode="standard" />
        <DxSearchPanel :visible="true" />
        <DxPaging :page-size="10" :page-index="0" />
        <DxPager
          :show-page-size-selector="true"
          :allowed-page-sizes="[5, 10, 20]"
          :show-navigation-buttons="true"
          :show-info="true"
          info-text="Page {0} of {1} ({2} items)"
        />
        <DxExport :enabled="true" />
      </DxDataGrid>
    </div>
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { DxItem } from "devextreme-vue/form";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  //DxToolbar,
  DxEditing,
  DxLookup,
  DxRequiredRule,
  //DxFormItem,
  DxForm,
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    //DxToolbar,
    DxForm,
    DxItem,
    DxEditing,
    DxLookup,
    DxRequiredRule,
    //DxFormItem,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Inspection Record",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      inspRecordList: {},
      campaigeList: {},
      dataGridAttributes: {
        class: "data-grid-style",
      },
      inspDateInputOptions: { placeholder: 'Select date' },
      projectNoInputOptions: { placeholder: 'Enter project no' },
      reportNoInputOptions: { placeholder: 'Enter report no' },
      nameInputOptions: { placeholder: 'Enter name' },
      certInputOptions: { placeholder: 'Enter cert no' },
    };
  },
  computed: {},
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
          console.log(res);
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
    FETCH_CAMPAIGN() {
      axios({
        method: "get",
        url: "insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log("campaign:");
          console.log(res);
          if (res.status == 200 && res.data) {
            this.campaigeList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_RECORD(e) {
      e.data.id_tag = this.$route.params.id_tag;
      e.data.id_inspection_record = 0;
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "/insp-record/add-insp-record",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("create success");
            this.FETCH_INSP_RECORD();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    UPDATE_RECORD(e) {
      e.data.inspection_date = moment(e.data.inspection_date).format("L");
      console.log(e.data);
      axios({
        method: "put",
        url: "/insp-record/edit-insp-record",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("update success");
            this.FETCH_INSP_RECORD();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_RECORD(e) {
      axios({
        method: "delete",
        url: "/insp-record/delete-insp-record",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("delete success");
            this.FETCH_TANK_COURSE();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
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