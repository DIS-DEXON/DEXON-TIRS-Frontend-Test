<template>
  <div class="pm-page">
    <toolbar
      :pageName="infoClient.company_name"
      @refreshInfo="FETCH_LIST()"
      :isBack="true"
      newBtnLabel="New Project Info"
      style="grid-column: span 2"
    />
    <div class="pm-page-container">
      <div class="page-container">
        <DxDataGrid
          id="data-grid-style"
          :data-source="tankList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @exporting="EXPORT_DATA"
        >
          <DxColumn
            data-field="created_time"
            :width="0"
            caption=""
            sort-order="asc"
          />
          <DxColumn data-field="plant" caption="Plant / Site" />
          <DxColumn data-field="tag_no" caption="Tag Number" />
          <DxColumn data-field="int_status" caption="Integrity Status" />
          <DxColumn data-field="app_status" caption="Applicable Status" />
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
      <contentLoading
        text="Loading, please wait..."
        v-if="isLoading == true"
        color="#fc9b21"
      />
    </div>
    <popupAdd v-if="isAdd == true" @closePopup="TOGGLE_POPUP()" />
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
import popupAdd from "@/views/Applications/ProjectManager/Projects/project-add.vue";

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
      name: "Tank Management",
      icon: "/img/icon_menu/project_manager/project.png",
    });
    // if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      projectList: "",
      isAdd: false,
      isEdit: false,
      isLoading: false,
      errorMessage: "",
      editInfo: "",
      infoClient: {
        id_client: 1,
        logo: "/img/mockup/client.png",
        company_name: "PTT LNG Company Limited",
      },
      tankList: [
        {
          id_tank: 1,
          plant: "MUDA-01",
          tag_no: "MUDA-FA-001",
          int_status: "normal",
          app_status: "in-service",
        },
        {
          id_tank: 2,
          plant: "MUDA-01",
          tag_no: "MUDA-FA-001",
          int_status: "normal",
          app_status: "in-service",
        },
        {
          id_tank: 3,
          plant: "MUDA-01",
          tag_no: "MUDA-FA-001",
          int_status: "normal",
          app_status: "in-service",
        },
        {
          id_tank: 4,
          plant: "MUDA-01",
          tag_no: "MUDA-FA-001",
          int_status: "normal",
          app_status: "in-service",
        },
        {
          id_tank: 5,
          plant: "MUDA-01",
          tag_no: "MUDA-FA-001",
          int_status: "normal",
          app_status: "in-service",
        },
      ],
    };
  },
  computed: {},
  methods: {
    VIEW_INFO(e) {
      const rowID = e.data.id_tank;
      if (rowID != null) {
        this.$router.push(
          "/tank/list/" + this.infoClient.id_client + "/" + rowID + "/info"
        );
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
        url: "/project-manager/project-list",
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
  },
};
</script>

<style lang="scss" scoped>
.pm-page {
  border: 1px solid #e6e6e6;
  border-width: 0;
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