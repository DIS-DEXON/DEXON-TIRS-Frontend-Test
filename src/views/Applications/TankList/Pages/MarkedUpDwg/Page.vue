<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel
      @showHidePanel="SHOW_HIDE_PANEL"
      @viewItem="VIEW_ITEM"
    />
    <div class="list-page">
      <v-ons-list>
        <v-ons-list-header
          ><b>{{ currentPage }}</b></v-ons-list-header
        >
      </v-ons-list>
      <DxDataGrid
        id="data-grid-style"
        key-expr="id"
        :data-source="drawingList"
        :element-attr="dataGridAttributes"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
        :show-borders="true"
        :show-row-lines="true"
        :row-alternation-enabled="false"
        @exporting="EXPORT_DATA"
        @row-inserted="CREATE_DWG"
        @row-updated="UPDATE_DWG"
        @row-removed="DELETE_DWG"
        @editing-start="EDITING_START_DWG"
        @init-new-row="INIT_NEW_ROW_DWG"
      >
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="IS_VISIBLE_ADD()"
          mode="popup"
        >
          <DxPopup :show-title="true" :width="700" title="Marked-up Drawing">
          </DxPopup>
          <DxForm>
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="file_path" :col-span="2" />
              <DxItem data-field="file_name" :col-span="2" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path"
          caption="Marked-up Drawing"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor"
          :width="520"
        />

        <DxColumn data-field="file_name" caption="File Name" :width="300" />

        <template #dwg-img="{ data }">
          <div style="position: relative">
            <img :src="baseURL + data.value" width="500" /><br />
            <a
              :href="baseURL + data.value"
              download="dwg"
              target="_blank"
              class="btn-view-dwg"
              >VIEW</a
            >
          </div>
        </template>

        <template #dwg-img-editor="{ data }">
          <div>
            <img
              :src="baseURL + data.value"
              width="500"
              v-if="imgDwg != '' && isInitEdit == 0"
            />
            <img
              :src="imgDwg"
              width="500"
              v-if="imgDwg != '' && isInitEdit == 1"
            />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="500"
              v-if="imgDwg == ''"
            />

            <DxFileUploader
              select-button-text="Select photo"
              label-text=""
              accept="image/*"
              upload-mode="useForm"
              @value-changed="ON_DWG_CHANGE"
            />
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
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
// import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";

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
  DxExport,
  DxEditing,
  DxPopup,
  DxForm,
} from "devextreme-vue/data-grid";

//List
// import { DxList } from "devextreme-vue/list";

//FileUpload
import { DxFileUploader } from "devextreme-vue/file-uploader";
//import { DxButton } from 'devextreme-vue/button';
import { DxItem } from "devextreme-vue/form";

const fileUploaderRef = "fu";
const imgRef = "img";

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
    DxExport,
    DxEditing,
    DxFileUploader,
    DxForm,
    DxItem,
    DxPopup,
    //DxButton,
    // innerPageName,
    InspectionRecordPanel,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Marked-Up Drawing",
      subpageInnerName: null,
    });
  },
  data() {
    return {
      drawingList: [],
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
        class: "data-grid-style",
      },
      pagePanelHiding: false,
    };
  },
  computed: {
    currentPage() {
      var current_page = this.$route.params.id_component;
      if (current_page == 1) return "Annular";
      else if (current_page == 2) return "Bottom";
      else if (current_page == 3) return "Coil";
      else if (current_page == 4) return "Critical Zone";
      else if (current_page == 5) return "Piping";
      else if (current_page == 6) return "Roof";
      else if (current_page == 7) return "Roof Nozzle";
      else if (current_page == 8) return "Sump";
      else if (current_page == 9) return "Shell";
      else if (current_page == 10) return "Shell Nozzle";
      else if (current_page == 11) return "Projection Plate";
      else return "";
    },
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
    VIEW_ITEM(item) {
      this.id_component = this.$route.params.id_component;
      this.id_inspection_record = item.id_inspection_record;
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_component: this.id_component,
          id_inspection_record: item.id_inspection_record,
        },
      })
        .then((res) => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_DWG(e) {
      console.log(e);
      var formData = new FormData();
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_component", this.id_component);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("file_name", e.data.file_name);
      formData.append("file", this.file);

      axios({
        method: "post",
        url: "layout-drawing/add-layout-drawing",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 201 && res.data) {
            console.log(res.data);
            this.VIEW_DWG(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_DWG(e) {
      console.log(e);
      axios({
        method: "put",
        url: "layout-drawing/edit-layout-drawing",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id: e.key,
          id_tag: this.$route.params.id_tag,
          id_component: this.id_component,
          id_inspection_record: this.id_inspection_record,
          file_name: e.data.file_name,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_DWG(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_DWG(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "layout-drawing/delete-layout-drawing",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id: e.key,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_DWG(this.id_inspection_record);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    ON_DWG_CHANGE(e) {
      console.log(e);
      this.isInitEdit = 1;
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg = reader.result;
      };
      this.file = e.value[0];
    },
    EDITING_START_DWG(e) {
      console.log(e);
      this.imgDwg = e.data.path_dwg;
      this.file = [];
      this.isInitEdit = 0;
    },
    INIT_NEW_ROW_DWG() {
      this.imgDwg = "";
      this.file = [];
      this.isInitEdit = 1;
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
  .list {
    margin: -20px -20px 20px -20px;
  }
}
</style>