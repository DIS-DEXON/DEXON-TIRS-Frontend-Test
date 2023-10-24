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
        id="data-grid-style"
        key-expr="id_visual"
        :data-source="drawingList"
        :element-attr="dataGridAttributes"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
        :show-borders="true"
        :show-row-lines="true"
        :row-alternation-enabled="false"
        @row-inserted="CREATE_DWG"
        @row-updated="UPDATE_DWG"
        @row-removed="DELETE_DWG"
        @editing-start="EDITING_START_DWG"
        @init-new-row="INIT_NEW_ROW_DWG"
        @row-removing="REMOVING"
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
              <DxItem data-field="file_path_1" :col-span="1" />
              <DxItem data-field="file_path_2" :col-span="1" />
              <DxItem data-field="finding" editor-type="dxTextArea" :col-span="2" />
              <DxItem data-field="recommendation" editor-type="dxTextArea" :col-span="2" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path_1"
          caption="Overview"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-drag-drop-1"
          :width="0"
        />
        <DxColumn
          data-field="file_path_2"
          caption="Close-up view"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-drag-drop-2"
          :width="0"
        />

        <DxColumn
          data-field="finding"
          caption="Finding"
          cell-template="dxTextArea"
          :editor-options="findingInputOptions"
          :width="0"
        />

        <DxColumn
          data-field="recommendation"
          caption="Recommendation"
          cell-template="dxTextArea"
          :editor-options="recInputOptions"
          :width="0"
        />

        <DxColumn caption="Picture Log" cell-template="picture-log-template" />

        <template #dwg-img-drag-drop-1="{data}">
          <div class="widget-container flex-box">
            <!-- <span>Profile Picture</span> -->
            <div
              id="dropzone-external"
              class="flex-box"
              :class="[isDropZoneActive
        ? 'dx-theme-accent-as-border-color dropzone-active'
        : 'dx-theme-border-color']"
            >
              <img
                :src="baseURL + data.value"
                width="300"
                height="300"
                v-if="imgDwg1 != '' && isInitEdit_1 == 0"
              />
              <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt />
              <div id="dropzone-text" class="flex-box" v-if="textVisible">
                <span>Drag & Drop the desired file</span>
                <span>…or click to browse for a file instead.</span>
              </div>
              <DxProgressBar
                id="upload-progress"
                :min="0"
                :max="100"
                width="30%"
                :show-status="false"
                :visible="progressVisible"
                :value="progressValue"
              />
            </div>
            <DxFileUploader
              id="file-uploader"
              dialog-trigger="#dropzone-external"
              drop-zone="#dropzone-external"
              :multiple="false"
              :allowed-file-extensions="allowedFileExtensions"
              upload-mode="instantly"
              upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
              :visible="false"
              @drop-zone-enter="onDropZoneEnter"
              @drop-zone-leave="onDropZoneLeave"
              @uploaded="onUploaded"
              @value-changed="ON_DWG_CHANGE_1"
              @progress="onProgress"
              @upload-started="onUploadStarted"
            />
            <DxButton
              :width="120"
              text="Delete"
              type="normal"
              styling-mode="contained"
              @click="DEL_PIC(1)"
              style="position:relative; left:90px; top:10px;"
            />
          </div>
        </template>

        <template #dwg-img-drag-drop-2="{data}">
          <div class="widget-container flex-box">
            <!-- <span>Profile Picture</span> -->
            <div
              id="dropzone-external-2"
              class="flex-box"
              :class="[isDropZoneActive_2
        ? 'dx-theme-accent-as-border-color dropzone-active'
        : 'dx-theme-border-color']"
            >
              <img
                :src="baseURL + data.value"
                width="300"
                height="300"
                v-if="imgDwg2 != '' && isInitEdit_2 == 0"
              />
              <img id="dropzone-image" :src="imageSource_2" v-if="imageSource_2" alt />
              <div id="dropzone-text" class="flex-box" v-if="textVisible_2">
                <span>Drag & Drop the desired file</span>
                <span>…or click to browse for a file instead.</span>
              </div>
              <DxProgressBar
                id="upload-progress"
                :min="0"
                :max="100"
                width="30%"
                :show-status="false"
                :visible="progressVisible_2"
                :value="progressValue_2"
              />
            </div>
            <DxFileUploader
              id="file-uploader"
              dialog-trigger="#dropzone-external-2"
              drop-zone="#dropzone-external-2"
              :multiple="false"
              :allowed-file-extensions="allowedFileExtensions"
              upload-mode="instantly"
              upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
              :visible="false"
              @drop-zone-enter="onDropZoneEnter"
              @drop-zone-leave="onDropZoneLeave"
              @uploaded="onUploaded2"
              @progress="onProgress_2"
              @upload-started="onUploadStarted_2"
              @value-changed="ON_DWG_CHANGE_2"
            />
            <DxButton
              :width="120"
              text="Delete"
              type="normal"
              styling-mode="contained"
              @click="DEL_PIC(2)"
              style="position:relative; left:90px; top:10px;"
            />
          </div>
        </template>

        <template #picture-log-template="{ data }">
          <div>
            <div style="display: flex;">
              <div>
                <div class="header-custom-field">Overview</div>
                <a
                  :href="baseURL + data.data.file_path_1"
                  download="dwg"
                  target="_blank"
                  v-if="data.data.file_path_1 != ''"
                >
                  <img
                    :src="baseURL + data.data.file_path_1"
                    width="300"
                    height="200"
                    style="border: 1px solid #140a4b;"
                  />
                </a>

                <img
                  src="http://tmt-solution.com/public/image-empty.png"
                  width="300"
                  height="200"
                  v-if="data.data.file_path_1 == ''"
                />
              </div>
              <div style="margin-left: 10px;">
                <div class="header-custom-field">Close-up view</div>
                <a
                  :href="baseURL + data.data.file_path_2"
                  download="dwg"
                  target="_blank"
                  v-if="data.data.file_path_2 != ''"
                >
                  <img
                    :src="baseURL + data.data.file_path_2"
                    width="300"
                    height="200"
                    style="border: 1px solid #140a4b;"
                  />
                </a>

                <img
                  src="http://tmt-solution.com/public/image-empty.png"
                  width="300"
                  height="200"
                  v-if="data.data.file_path_2 == ''"
                />
              </div>
            </div>

            <div>
              <div>
                <div class="header-custom-field">Finding</div>
                <DxTextArea :height="80" :width="610" :read-only="true" :value="data.data.finding" />
              </div>
              <div style="margin-top: 5px;">
                <div class="header-custom-field">Recommendation</div>
                <DxTextArea
                  :height="80"
                  :width="610"
                  :read-only="true"
                  :value="data.data.recommendation"
                />
              </div>
            </div>
          </div>
        </template>

        <template #dwg-img="{ data }">
          <div style="position: relative">
            <a :href="baseURL + data.value" download="dwg" target="_blank" v-if="data.value != ''">
              <img :src="baseURL + data.value" width="300" height="200" />
              <br />
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
            <img :src="imgDwg1" width="300" height="200" v-if="imgDwg1 != '' && isInitEdit_1 == 1" />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgDwg1 == ''"
            />
            <div style="position:relative;">
              <DxFileUploader
                select-button-text="Select photo"
                label-text
                accept="image/*"
                upload-mode="useForm"
                :showFileList="false"
                @value-changed="ON_DWG_CHANGE_1"
                style="position:absolute;"
              />

              <DxButton
                :width="120"
                text="Delete"
                type="normal"
                styling-mode="contained"
                @click="DEL_PIC(1)"
                style="position:absolute; left:130px;"
              />
            </div>
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

            <img :src="imgDwg2" width="300" height="200" v-if="imgDwg2 != '' && isInitEdit_2 == 1" />

            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgDwg2 == ''"
            />

            <div style="position:relative; height:50px;">
              <DxFileUploader
                select-button-text="Select photo"
                label-text
                accept="image/*"
                upload-mode="useForm"
                :showFileList="false"
                @value-changed="ON_DWG_CHANGE_2"
                style="position:absolute;"
              />

              <DxButton
                :width="120"
                text="Delete"
                type="normal"
                styling-mode="contained"
                @click="DEL_PIC(2)"
                style="position:absolute; left:130px;"
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
        <DxExport :enabled="false" />
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
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
import { DxProgressBar } from "devextreme-vue/progress-bar";

//DataGrid
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
    DxProgressBar,
    InspectionRecordPanel,
    SelectInspRecord,
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
    DxButton
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Picture Log",
      subpageInnerName: null
    });
  },
  data() {
    return {
      //devextreme
      isDropZoneActive: false,
      imageSource: "",
      textVisible: true,
      progressVisible: false,
      progressValue: 0,
      allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],

      isDropZoneActive_2: false,
      imageSource_2: "",
      textVisible_2: true,
      progressVisible_2: false,
      progressValue_2: 0,

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
      isAdd: 0,
      isRemove: 0,
      current_view: {},
      inspection_date: "",
      dataGridAttributes: {
        class: "data-grid-custom-style"
      },
      popUpWidth: 0,
      pictureLog: "",
      pagePanelHiding: false,
      findingInputOptions: { placeholder: "Enter finding ..." },
      recInputOptions: { placeholder: "Enter recommendation ..." },
      is_changed_dwg_1: 0,
      is_changed_dwg_2: 0
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
    VIEW_ITEM(item) {
      console.log("parent triggered: ");
      console.log(item);

      this.id_inspection_record = item.id_inspection_record;
      this.inspection_date = item.inspection_date;
      this.current_view = item;
      this.imageSource = "";
      this.imageSource_2 = "";
      axios({
        method: "post",
        url: "visual-report/layout-visual-report-by-insp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.drawingList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_DWG(e) {
      console.log("CREATE_DWG");
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(e);
      var formData = new FormData();
      formData.append("id_visual", 0);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("inspection_date", this.inspection_date ?? "");
      formData.append("finding", e.data.finding);
      formData.append("recommendation", e.data.recommendation);
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("file_path_1", "");
      formData.append("file_path_2", "");
      formData.append("created_by", user.id_account);
      formData.append("updated_by", user.id_account);

      axios({
        method: "post",
        url: "visual-report/add-visual-record",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          console.log(res);
          if (res.status == 201 && res.data) {
            console.log("in");
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.is_changed_dwg_1 = 0;
          this.is_changed_dwg_2 = 0;
        });
    },
    UPDATE_DWG(e) {
      console.log("UPDATE_DWG");
      const user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id_visual", e.data.id_visual);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("inspection_date", this.inspection_date ?? "");
      formData.append("finding", e.data.finding ?? "");
      formData.append("recommendation", e.data.recommendation ?? "");
      formData.append("file_1", this.file1);
      formData.append("file_2", this.file2);
      formData.append("file_path_1", this.file_path_1_tmp ?? "");
      formData.append("file_path_2", this.file_path_2_tmp ?? "");
      formData.append("created_by", e.data.created_by);
      formData.append("updated_by", user.id_account);
      axios({
        method: "put",
        url: "visual-report/" + e.data.id_visual,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          if (res.status == 204) {
            this.file_path_1 = "";
            this.file_path_2 = "";
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
    DELETE_DWG(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "visual-report/delete-visual-report",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_visual: e.key
        }
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            // this.VIEW_DWG(this.id_inspection_record, this.inspection_date);
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
    ON_DWG_CHANGE_1(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg1 = reader.result;
      };
      this.file1 = e.value[0];
      //this.file_path_1 = this.file_path_1_tmp;
      this.isInitEdit_1 = 1;
      this.is_changed_dwg_1 = 1;
    },
    ON_DWG_CHANGE_2(e) {
      console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgDwg2 = reader.result;
      };
      this.file2 = e.value[0];
      //this.file_path_2 = this.file_path_2_tmp;
      this.isInitEdit_2 = 1;
      this.is_changed_dwg_2 = 1;
    },
    EDITING_START_DWG(e) {
      console.log("EDITING_START_DWG");
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
      this.isAdd = 0;
      this.isRemove = 0;
      if (e.data.file_path_1 != "") {
        this.textVisible = false;
      } else {
        this.textVisible = true;
      }
      if (e.data.file_path_2 != "") {
        this.textVisible_2 = false;
      } else {
        this.textVisible_2 = true;
      }
      this.popUpWidth = this.CHECK_SCREEN("w");
    },
    INIT_NEW_ROW_DWG() {
      console.log("INIT_NEW_ROW_DWG");
      // console.log(e);
      this.imageSource = "";
      this.imageSource_2 = "";
      this.textVisible = true;
      this.textVisible_2 = true;
      this.imgDwg1 = "";
      this.imgDwg2 = "";
      this.file1 = [];
      this.file2 = [];
      this.isInitEdit_1 = 1;
      this.isInitEdit_2 = 1;
      this.isAdd = 1;
      this.popUpWidth = this.CHECK_SCREEN("w");

      (this.isDropZoneActive = false),
        (this.imageSource = ""),
        (this.textVisible = true),
        (this.progressVisible = false);
      this.progressValue = 0;
    },
    REMOVING(e) {
      console.log("REMOVING");
      console.log(e);
      this.isRemove = 1;
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
        this.file_path_1_tmp = "";
        this.is_changed_dwg_1 = 1;
        //this.file_path_1 = this.file_path_1_tmp;
      } else if (seq == 2) {
        this.imgDwg2 = "";
        this.file_path_2_tmp = "";
        this.is_changed_dwg_2 = 1;
        //this.file_path_2 = this.file_path_2_tmp;
      }
    },
    SAVE(e) {
      console.log(e);
      if (e.changes.length >= 0 && this.isAdd == 0 && this.isRemove == 0) {
        this.UPDATE_DWG(this.pictureLog);
      }
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },

    //devextreme
    onDropZoneEnter(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = true;
      } else if (e.dropZoneElement.id === "dropzone-external-2") {
        this.isDropZoneActive_2 = true;
      }
    },
    onDropZoneLeave(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = false;
      } else if (e.dropZoneElement.id === "dropzone-external-2") {
        this.isDropZoneActive_2 = false;
      }
    },
    onUploaded(e) {
      const { file } = e;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.isDropZoneActive = false;
        this.imageSource = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.textVisible = false;
      this.progressVisible = false;
      this.progressValue = 0;
    },
    onUploaded2(e) {
      const { file } = e;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.isDropZoneActive_2 = false;
        this.imageSource_2 = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.textVisible_2 = false;
      this.progressVisible_2 = false;
      this.progressValue_2 = 0;
    },
    onProgress(e) {
      this.progressValue = (e.bytesLoaded / e.bytesTotal) * 100;
    },
    onProgress_2(e) {
      this.progressValue_2 = (e.bytesLoaded / e.bytesTotal) * 100;
    },
    onUploadStarted() {
      this.imageSource = "";
      this.progressVisible = true;
    },
    onUploadStarted_2() {
      this.imageSource_2 = "";
      this.progressVisible_2 = true;
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

.header-custom-field {
  font-weight: 600;
  font-size: 14px;
}

//devextreme style
#dropzone-external,
#dropzone-external-2 {
  width: 300px;
  height: 300px;
  background-color: rgba(183, 183, 183, 0.1);
  border-width: 2px;
  border-style: dashed;
  padding: 10px;
}

#dropzone-external > * {
  pointer-events: none;
}
#dropzone-external-2 > * {
  pointer-events: none;
}

#dropzone-external.dropzone-active,
#dropzone-external-2.dropzone-active {
  border-style: solid;
}

.widget-container > span {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

#dropzone-image {
  max-width: 100%;
  max-height: 100%;
}

#dropzone-text > span {
  font-weight: 100;
  opacity: 0.5;
}

#upload-progress {
  display: flex;
  margin-top: 10px;
}

.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>