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
        id="data-grid-style"
        key-expr="id_visual"
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
        @saved="SAVE"
      >
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="IS_VISIBLE_ADD()"
          mode="form"
        >
          <DxForm>
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="file_path_1" :col-span="1" />
              <DxItem data-field="file_path_2" :col-span="1" />
              <DxItem
                data-field="finding"
                editor-type="dxTextArea"
                :col-span="2"
              />
              <DxItem
                data-field="recommendation"
                editor-type="dxTextArea"
                :col-span="2"
              />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path_1"
          caption="Overview Picture"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor1"
          :width="315"
        />
        <DxColumn
          data-field="file_path_2"
          caption="Close-Up Picture"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor2"
          :width="315"
        />

        <DxColumn
          data-field="finding"
          caption="Finding"
          cell-template="dxTextArea"
        />

        <DxColumn
          data-field="recommendation"
          caption="Recommendation"
          cell-template="dxTextArea"
        />

        <template #dwg-img="{ data }">
          <div style="position: relative">
            <a
              :href="baseURL + data.value"
              download="dwg"
              target="_blank"
              v-if="data.value != ''"
            >
            <img :src="baseURL + data.value" width="300" height="200" /><br />
            </a>

            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="data.value == ''"
            />
          </div>
        </template>

        <template #dwg-img-editor1="{ data }">
          <div>
            <img
              :src="baseURL + data.value"
              width="300"
              height="200"
              v-if="imgDwg1 != '' && isInitEdit_1 == 0"
            />
            <img
              :src="imgDwg1"
              width="300"
              height="200"
              v-if="imgDwg1 != '' && isInitEdit_1 == 1"
            />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgDwg1 == ''"
            />

            <DxFileUploader
              select-button-text="Select photo"
              label-text=""
              accept="image/*"
              upload-mode="useForm"
              @value-changed="ON_DWG_CHANGE_1"
            />

            <DxButton
              :width="120"
              text="Delete"
              type="normal"
              styling-mode="contained"
              @click="DEL_PIC(1)"
            />
          </div>
        </template>
        <template #dwg-img-editor2="{ data }">
          <div>
            <img
              :src="baseURL + data.value"
              width="300"
              height="200"
              v-if="imgDwg2 != '' && isInitEdit_2 == 0"
            />

            <img
              :src="imgDwg2"
              width="300"
              height="200"
              v-if="imgDwg2 != '' && isInitEdit_2 == 1"
            />

            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgDwg2 == ''"
            />

            <div>
              <DxFileUploader
                select-button-text="Select photo"
                label-text=""
                accept="image/*"
                upload-mode="useForm"
                @value-changed="ON_DWG_CHANGE_2"
              />

              <DxButton
                :width="120"
                text="Delete"
                type="normal"
                styling-mode="contained"
                @click="DEL_PIC(2)"
              />
            </div>
          </div>
        </template>

        <template #dxTextArea="{ data }">
          <div>
            <DxTextArea :height="200" :read-only="true" :value="data.value" />
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
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
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
  // DxPopup,
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
    InspectionRecordPanel,
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
    DxTextArea,
    // DxPopup,
    DxButton,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Picture Log",
      subpageInnerName: null,
    });
  },
  data() {
    return {
      drawingList: [],
      isLoading: false,
      fileUploaderRef,
      imgRef,
      imgDwg1: "",
      imgDwg2: "",
      file_path_1: "",
      file_path_2: "",
      file_path_1_tmp: "",
      file_path_2_tmp: "",
      file1: [],
      file2: [],
      isInitEdit_1: 0,
      isInitEdit_2: 0,
      id_inspection_record: 0,
      current_view: {},
      inspection_date: "",
      dataGridAttributes: {
        class: "data-grid-style",
      },
      popUpWidth: 0,
      pictureLog: "",
      pagePanelHiding: false,
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
    VIEW_ITEM(item) {
      console.log("parent triggered: ");
      console.log(item);

      this.id_inspection_record = item.id_inspection_record;
      this.inspection_date = item.inspection_date;
      this.current_view = item;
      axios({
        method: "post",
        url: "visual-report/layout-visual-report-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
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
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append(
        "inspection_date",
        moment(this.inspection_date).format("L")
      );
      formData.append("finding", e.data.finding);
      formData.append("recommendation", e.data.recommendation);
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("created_by", this.$store.state.user.id_user);
      formData.append("updated_by", this.$store.state.user.id_user);

      axios({
        method: "post",
        url: "visual-report/add-visual-record",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 201 && res.data) {
            console.log("in");
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
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
      console.log("file1:");
      console.log(this.file1);
      console.log(this.file_path_1);
      console.log("file2:");
      console.log(this.file2);
      console.log(this.file_path_2);
      var formData = new FormData();
      formData.append("id_visual", e.data.id_visual);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append(
        "inspection_date",
        moment(this.inspection_date).format("L")
      );
      formData.append("finding", e.data.finding);
      formData.append("recommendation", e.data.recommendation);
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("file_path_1", this.file_path_1);
      formData.append("file_path_2", this.file_path_2);
      formData.append("created_by", e.data.created_by);
      formData.append("updated_by", this.$store.state.user.id_user);
      axios({
        method: "put",
        url: "visual-report/edit-visual-record",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 201 && res.data) {
            console.log("in");
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
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
        url: "visual-report/delete-visual-report",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_visual: e.key,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            // this.VIEW_DWG(this.id_inspection_record, this.inspection_date);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    ON_DWG_CHANGE_1(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg1 = reader.result;
      };
      this.file1 = e.value[0];
      this.file_path_1 = this.file_path_1_tmp;
      this.isInitEdit_1 = 1;
    },
    ON_DWG_CHANGE_2(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg2 = reader.result;
      };
      this.file2 = e.value[0];
      this.file_path_2 = this.file_path_2_tmp;
      this.isInitEdit_2 = 1;
    },
    EDITING_START_DWG(e) {
      console.log(e);
      this.pictureLog = e;
      this.imgDwg1 = e.data.file_path_1;
      this.imgDwg2 = e.data.file_path_2;
      this.file_path_1_tmp = e.data.file_path_1;
      this.file_path_2_tmp = e.data.file_path_2;
      this.file1 = [];
      this.file2 = [];
      this.isInitEdit_1 = 0;
      this.isInitEdit_2 = 0;
      this.popUpWidth = this.CHECK_SCREEN("w");
    },
    INIT_NEW_ROW_DWG() {
      this.imgDwg1 = "";
      this.imgDwg2 = "";
      this.file1 = [];
      this.file2 = [];
      this.isInitEdit_1 = 1;
      this.isInitEdit_2 = 1;
      this.popUpWidth = this.CHECK_SCREEN("w");
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    CHECK_SCREEN(e) {
      if (e == "w") {
        var sc_width = window.innerWidth;
        if (sc_width <= 500) {
          return sc_width / 1.1;
        } else {
          return sc_width / 1.1;
        }
      } else if (e == "h") {
        var sc_height = window.innerHeight;
        return sc_height / 1.1;
      }
    },
    DEL_PIC(seq) {
      if (seq == 1) {
        this.imgDwg1 = "";
        this.file_path_1 = this.file_path_1_tmp;
      } else if (seq == 2) {
        this.imgDwg2 = "";
        this.file_path_2 = this.file_path_2_tmp;
      }
    },
    SAVE(e) {
      console.log(e);
      if (e.changes.length >= 0) {
        this.UPDATE_DWG(this.pictureLog);
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
  // padding: 20px;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 51px);
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
</style>