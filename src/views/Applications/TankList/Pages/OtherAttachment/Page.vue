<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div class="list-page" v-if="this.id_inspection_record">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Details of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <DxDataGrid
        id="data-grid-style"
        key-expr="id"
        :data-source="attachments"
        :element-attr="dataGridAttributes"
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
        @saved="SAVE"
      >
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="IS_VISIBLE_ADD()"
          :use-icons="true"
          mode="form"
        >
          <DxForm label-location="top">
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="file_path" :col-span="2" />
              <DxItem data-field="note" editor-type="dxTextArea" :col-span="2" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path"
          caption="Attachment"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor"
          :width="320"
        />

        <DxColumn data-field="note" caption="Description" :editor-options="fileNameInputOptions" />

        <template #dwg-img="{ data }">
          <div style="position: relative">
            <a :href="baseURL + data.value" download="dwg" target="_blank">
              <img :src="baseURL + data.value" width="300" height="200" />
              <br />
            </a>
          </div>
        </template>

        <template #dwg-img-editor="{ data }">
          <div>
            <img
              :src="baseURL + data.value"
              width="300"
              height="200"
              v-if="imgDwg != '' && isInitEdit == 0"
            />
            <img :src="imgDwg" width="300" height="200" v-if="imgDwg != '' && isInitEdit == 1" />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgDwg == ''"
            />

            <DxFileUploader
              select-button-text="Select photo"
              label-text
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
  DxExport,
  DxEditing,
  //DxPopup,
  DxForm
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
    //DxPopup,
    //DxButton,
    // innerPageName,
    InspectionRecordPanel,
    SelectInspRecord
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Other Attachment"
    });
  },
  data() {
    return {
      drawingList: null,
      attachments: "",
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
        class: "data-grid-style"
      },
      pagePanelHiding: false,
      current_view: {},
      is_changed_dwg: 0,
      dataDwgTemp: "",
      fileNameInputOptions: { placeholder: "Enter text here ..." }
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
    FETCH_ATTACHMENTS() {
      axios({
        method: "get",
        url:
          "other-attachment/get-other-attachment-by-ir-id?id=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {}
      })
        .then(res => {
          console.log("attachments :");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.attachments = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_ITEM(item) {
      console.clear();
      this.current_view = {};
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      this.FETCH_ATTACHMENTS();
    },
    CREATE_DWG(e) {
      console.log(e);
      var formData = new FormData();

      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("note", e.data.note);
      formData.append("file", this.file);
      formData.append("created_by", this.$store.state.user.id_account);

      axios({
        method: "post",
        url: "other-attachment/add-other-attachment",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          console.log("FETCH ATTACHMENTS :");
          if (res.status == 201 && res.data) {
            console.log(res.data);
            this.FETCH_ATTACHMENTS();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.is_changed_dwg = 0;
        });
    },
    DELETE_DWG(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "other-attachment/delete-other-attachment?id=" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id: e.key
        }
      })
        .then(res => {
          //console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_ATTACHMENTS();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_DWG(e) {
      console.log(e);
      var formData = new FormData();
      formData.append("id", e.key);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("file", this.file);
      formData.append("file_path", this.file_path);
      formData.append("is_changed_dwg", this.is_changed_dwg);
      formData.append("note", e.data.note);
      axios({
        method: "post",
        url: "",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 201 && res.data) {
            //console.log(res.data);
            this.FETCH_ATTACHMENTS();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.is_changed_dwg = 0;
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
      this.is_changed_dwg = 1;
    },
    EDITING_START_DWG(e) {
      console.log(e);
      this.imgDwg = e.data.path_dwg;
      this.file = [];
      this.isInitEdit = 0;
      this.file_path = e.data.file_path;
      this.dataDwgTemp = e;
    },
    SAVE(e) {
      console.log("save:");
      console.log(e);
      if (e.changes.length == 0) {
        this.UPDATE_DWG(this.dataDwgTemp);
      }
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
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
}
</style>