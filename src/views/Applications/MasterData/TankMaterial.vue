<template>
  <div class="pm-page">
    <div class="pm-toolbar">
      <toolbar
        pageName="Tank Material"
        @refreshInfo="FETCH_LIST()"
        :isNewBtn="false"
        newBtnLabel="New"
        @newBtnFn="TOGGLE_POPUP()"
      />
    </div>
    <div class="pm-page-container">
      <div class="page-container">
        <DxDataGrid
          id="status-list"
          key-expr="id_material"
          :data-source="matList"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="false"
          :row-alternation-enabled="true"
          @row-inserted="CREATE_MAT"
          @row-updated="UPDATE_MAT"
          @row-removed="DELETE_MAT"
          @exporting="EXPORT_DATA"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
          <DxColumn data-field="plate_spec" caption="Plate Spec">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="grade" caption="Grade">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="mat_type" caption="Material Type">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="mat_spec" caption="Material Spec">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="y_value" caption="Y">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="t_value" caption="T">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="sd_value" caption="Sd">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn data-field="st_value" caption="St">
            <DxRequiredRule />
          </DxColumn>

          <DxColumn
            data-field="plate_thk_inch"
            caption="Plate Thickness (inch)"
          >
          </DxColumn>

          <DxColumn data-field="type" caption="Type">
            <DxRequiredRule />
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
  DxEditing,
  DxRequiredRule,
} from "devextreme-vue/data-grid";

//Structures
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";

//API
import axios from "/axios.js";

export default {
  name: "ViewApplicableStatus",
  components: {
    toolbar,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxEditing,
    DxRequiredRule,
    contentLoading,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Material",
      icon: "/img/icon_menu/project_manager/project.png",
    });
    if (this.$store.state.status.server == true) this.FETCH_LIST();
  },
  data() {
    return {
      matList: "",
      isAdd: false,
      isEdit: false,
      isLoading: false,
      errorMessage: "",
      editInfo: "",
    };
  },
  computed: {
    // projectStatus(EndDate) {
    //   const now = new date();
    //   if (now > EndDate) return "Ongoing";
    //   else if ((now = EndDate)) return "On Due";
    //   else return "Late";
    // },
  },
  methods: {
    VIEW_INFO(e) {
      const rowID = e.data.id_project;
      if (rowID != null) {
        this.$router.push("/projectmanager/projects/" + rowID);
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
        url: "/MdTankMaterial",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.matList = res.data;
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
    CREATE_MAT(e) {
      console.log(e);
      axios({
        method: "post",
        url: "/MdTankMaterial",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 201) {
            this.FETCH_LIST();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    UPDATE_MAT(e) {
      console.log(e);
      axios({
        method: "put",
        url: "/MdTankMaterial/" + e.data.id_material,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 204) {
            this.FETCH_LIST();
          }
        })
        .catch((error) => {
          this.$ons.notification.alert(
            error.code + " " + error.response.status + " " + error.message
          );
        })
        .finally(() => {});
    },
    DELETE_MAT(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "/MdTankMaterial/" + e.data.id_material,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          if (res.status == 204) {
            this.FETCH_LIST();
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