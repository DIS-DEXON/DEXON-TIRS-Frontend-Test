<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Upcoming Project"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="true"
        newBtnLabel="New Project Info"
        @newBtnFn="TOGGLE_POPUP()"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-container">
        <DxDataGrid
          id="project-manager-project-list"
          :data-source="projectList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="id_upcoming_project"
            :width="0"
            sort-order="desc"
          />
          <DxColumn
            data-field=""
            :width="50"
            alignment="center"
            caption="No."
            cell-template="CELL_ROW_CURRENT"
          />
          <DxColumn data-field="project_name" caption="Project Name" />
          <DxColumn data-field="client_name" caption="Client Name" />
          <DxColumn
            data-field="service_type_desc"
            caption="Service Type"
            :width="150"
          />
          <DxColumn
            data-field="is_forecast"
            caption="Forecast Status"
            :width="150"
            cell-template="cellTemplate-isForecast"
          />

          <template #cellTemplate-isForecast="{ data }">
            <div>
              <span v-if="data.value == true">Yes</span>
              <span v-if="data.value == false">No</span>
            </div>
          </template>
          <DxColumn
            data-field="confident_level"
            caption="Confident Level (%)"
            :width="150"
          />
          <DxColumn
            data-field="project_value"
            caption="Forecast Value (MB)"
            :width="180"
          />

          <DxColumn caption="" cell-template="cell-button-set" :width="50" />
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
          <template #CELL_ROW_CURRENT="{ data }">
            {{ data.rowIndex + 1 }}
          </template>
        </DxDataGrid>
      </div>
    </div>
    <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />
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
import popupAdd from "@/views/Applications/ExecutiveManagement/ProjectUpcoming/project-add.vue";

//API
import axios from "/axios.js";

export default {
  name: "ViewProjectList",
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
      name: "Upcoming Project",
      icon: "/img/icon_menu/executive_management/upcoming.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      projectList: "",
      isAdd: false,
      isEdit: false,
      isLoading: false,
      errorMessage: "",
      editInfo: "",
    };
  },
  computed: {},
  methods: {
    VIEW_INFO(e) {
      const rowID = e.data.id_upcoming_project;
      if (rowID != null) {
        this.$router.push("/executive-management/project-upcoming/" + rowID);
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
    TOGGLE_POPUP() {
      this.isAdd = !this.isAdd;
    },
    FETCH_LIST() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/forecast-sales/forecast-sales-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.projectList = res.data;
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
    IS_FORECAST_STATUS(cellInfo) {
      if (cellInfo.value == true) return "Yes";
      else return "No";
    },
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0 0 0 1px;
  background-color: #ffffff;
  height: 100%;

  .pm-page-container {
    background-color: #ffffff;
    padding: 20px 20px 0px 20px;
    height: calc(100vh - 159px);
    overflow-y: scroll;

    .page-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
#data-grid {
  height: 100%;
}
</style>
