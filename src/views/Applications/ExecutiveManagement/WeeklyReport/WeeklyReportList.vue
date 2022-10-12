<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Weekly Report"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Report"
        @newBtnFn="TOGGLE_POPUP('add')"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-content page-list">
        <DxDataGrid
          id="project-manager-project-list"
          :data-source="dataList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="record_no"
            :width="150"
            caption="Record No."
            sort-order="desc"
          />
          <!-- <DxColumn data-field="report_message" caption="Report Message" /> -->
          <!-- <DxColumn data-field="comment" caption="Recommendation" /> -->
          <DxColumn
            data-field="start_date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Start Date"
          />
          <DxColumn
            data-field="end_date"
            data-type="date"
            format="dd MMM, yyyy"
            caption="End Date"
          />
          <DxColumn
            data-field="week_no"
            caption="Week No."
            :width="100"
            alignment="left"
          />

          <DxColumn
            data-field="created_by_name"
            :width="220"
            caption="Created By"
          />
          <DxColumn
            data-field="created_time"
            data-type="date"
            format="dd MMM, yyyy"
            caption="Created Date"
            :width="150"
          />
          <DxColumn :width="50" caption="" cell-template="cell-button-set" />
          <template #cell-button-set="{ data }">
            <div class="table-btn-group">
              <div class="table-btn" v-on:click="VIEW_INFO(data)">
                <i class="las la-search blue"></i>
              </div>
            </div>
          </template>
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
    <popupAdd
      v-if="isAdd == true"
      @btn-cancel-add="TOGGLE_POPUP('add')"
      @refreshInfo="FETCH_LIST()"
    />
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
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
  DxExport,
} from "devextreme-vue/data-grid";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-toolbar.vue";
import popupAdd from "@/views/Applications/ExecutiveManagement/WeeklyReport/weekly-add.vue";

//API
import axios from "/axios.js";
import moment from "moment";
import clone from "just-clone";

export default {
  name: "ViewWeeklyReport",
  components: {
    toolbar,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    contentLoading,
    popupAdd,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Weekly Report",
      icon: "/img/icon_menu/executive_management/weekly.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  computed: {
    report_date() {
      return moment(this.currentViewRow.report_date).format("dddd, LL");
    },
  },
  data() {
    return {
      isAdd: false,
      isEdit: false,
      isLoading: false,
      currentViewRow: 1,
      dataList: [{}],
    };
  },
  methods: {
    VIEW_INFO(e) {
      const rowID = e.data.id_weekly;
      if (rowID != null) {
        this.$router.push("/executive-management/weekly-report/" + rowID);
      }
    },
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
    TOGGLE_POPUP(m) {
      if (m == "add") {
        if (this.isAdd == true) this.isAdd = false;
        else this.isAdd = true;
      } else if (m == "edit") {
        if (this.isEdit == true) this.isEdit = false;
        else {
          this.editInfo = clone(this.currentViewRow);
          this.isEdit = true;
        }
      }
    },
    DELETE_ITEM() {},
    FETCH_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/weekly-report/weekly-report-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.dataList = res.data;
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
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
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;
  // display: grid;
  // grid-template-rows: 61px auto;
  // grid-template-columns: auto 360px;

  .pm-page-container {
    background-color: #ffffff;
    // padding: 20px 20px 0px 20px;
    height: calc(100vh - 180px);
    display: flex;

    .page-content {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    .page-nodata {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .page-list {
      width: auto;
      padding: 20px 20px 0 20px;
    }
    .page-info {
      width: auto;
    }
  }
}
.border-left {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  padding: 0 !important;
  height: calc(100vh - 139px) !important;
}
.pm-info-sidebar {
  width: 360px;
  height: 100%;
  background: #fff;
  padding: 0 20px;
  overflow-y: scroll;
  position: relative;

  .pm-section-label {
    font-style: normal;
    font-weight: 600;
    font-size: 1.75em;
    line-height: 16px;
    letter-spacing: -0.08px;
    color: $web-font-color-black;
    padding: 20px 0 10px 0;
    margin: 0;
    user-select: text;
  }
  .form-item-container {
    display: block;
  }
}

.pm-info-sidebar::-webkit-scrollbar {
  display: none;
}

.form-item-container:last-child {
  margin-bottom: 40px;
}
</style>