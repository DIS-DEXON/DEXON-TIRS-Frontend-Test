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
        key-expr="id"
        :data-source="repairList"
        :element-attr="dataGridAttributes"
        :hover-state-enabled="true"
        :allow-column-reordering="true"
        :show-borders="true"
        :show-row-lines="true"
        :row-alternation-enabled="false"
        @row-inserted="CREATE_REPAIR"
        @row-updated="UPDATE_REPAIR"
        @row-removed="DELETE_REPAIR"
        @editing-start="EDITING_START_REPAIR"
        @init-new-row="INIT_NEW_ROW_REPAIR"
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
              <DxItem data-field="part" :col-span="2" />
              <DxItem data-field="file_path" :col-span="2" />
              <DxItem data-field="recommendation" :col-span="2" editor-type="dxTextArea" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path"
          caption="Image"
          cell-template="repair-img"
          edit-cell-template="repair-img-drag-drop"
          :width="320"
        ></DxColumn>
        

        <DxColumn data-field="part" caption="Part" :editor-options="partInputOptions" :width="0">
          <DxRequiredRule />
        </DxColumn>

        <DxColumn
          data-field="recommendation"
          caption="Recommendation"
          cell-template="dxTextArea"
          :editor-options="recInputOptions"
          :width="0"
        ></DxColumn>

        <DxColumn
          caption="Detail"
          cell-template="detail-template"
          css-class="text-vertical-align-top"
        />

        <template #detail-template="{ data }">
          <div>
            <div class="header-custom-field">
              Part:
              <span>{{ data.data.part }}</span>
            </div>
            <hr />
            <div class="header-custom-field">Recommendation</div>
            <DxTextArea :height="150" :read-only="true" :value="data.data.recommendation" />
          </div>
        </template>

        <template #repair-img="{ data }">
          <div style="position: relative">
            <a :href="baseURL + data.value" download="dwg" target="_blank">
              <img :src="baseURL + data.value" width="300" height="200" />
              <br />
            </a>
          </div>
        </template>

        <template #repair-img-editor="{ data }">
          <div>
            <img
              :src="baseURL + data.value"
              width="300"
              height="200"
              v-if="imgRepair != '' && isInitEdit == 0"
            />
            <img
              :src="imgRepair"
              width="300"
              height="200"
              v-if="imgRepair != '' && isInitEdit == 1"
            />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgRepair == ''"
            />

            <DxFileUploader
              select-button-text="Select photo"
              label-text
              accept="image/*"
              upload-mode="useForm"
              @value-changed="ON_REPAIR_CHANGE"
            />
          </div>
        </template>

        <template #repair-img-drag-drop="{data}">
          <div class="widget-container flex-box">
            <!-- <span>Profile Picture</span> -->
            <div
              id="dropzone-external"
              class="flex-box"
              :class="[isDropZoneActive
        ? 'dx-theme-accent-as-border-color dropzone-active'
        : 'dx-theme-border-color']"
            >
              <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt />
              <img
                id="dropzone-image"
                :src="baseURL + data.value"
                v-if="imgRepair != '' && isInitEdit == 0"
                alt
              />
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
              @progress="onProgress"
              @upload-started="upload_start"
              @value-changed="ON_REPAIR_CHANGE"
            />
            <div class="delete-image-button" v-on:click="DELETE_IMAGE()">
              Delete
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
// import innerPageName from "@/components/app-structures/app-inner-pagename.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import SelectInspRecord from "@/components/select-insp-record.vue";
import DxTextArea from "devextreme-vue/text-area";
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
  //DxPopup,
  DxForm,
  DxRequiredRule
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
    DxProgressBar,
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
    SelectInspRecord,
    DxTextArea,
    DxRequiredRule
  },
  created() {
    // this.$store.commit("UPDATE_CURRENT_INAPP", {
    //   name: "Tank Management",
    //   icon: "/img/icon_menu/tank/tank.png"
    // });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Repair Record",
      subpageInnerName: this.currentPage
    });
  },
  data() {
    return {
      repairList: null,
      inspRecordList: {},
      campaignList: {},
      isLoading: false,
      fileUploaderRef,
      imgRef,
      imgRepair: "",
      file: [],
      isInitEdit: 0,
      id_inspection_record: 0,
      dataGridAttributes: {
        class: "data-grid-custom-style"
      },
      pagePanelHiding: false,
      current_view: {},
      is_changed_repair: 0,
      dataRepairTemp: "",
      partInputOptions: { placeholder: "Enter part ..." },
      recInputOptions: { placeholder: "Enter recommendation ..." },

      //devextreme drag-drop
      isDropZoneActive: false,
      imageSource: "",
      textVisible: true,
      progressVisible: false,
      progressValue: 0,
      allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"]
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
      this.current_view = {};
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      console.log(this.id_inspection_record);
      axios({
        method: "get",
        url:
          "repair-record/get-repair-record-by-ir-id?id_inspection_record=" +
          this.id_inspection_record,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("repair record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.repairList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_REPAIR(e) {
      console.log(e);
      const user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("part", e.data.part);
      formData.append("recommendation", e.data.recommendation);
      formData.append("file", this.file);
      formData.append("created_by", user.id_account);
      formData.append("updated_by", user.id_account);

      axios({
        method: "post",
        url: "repair-record/add-repair-record",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          console.log(res);
          if (res.status == 201 && res.data) {
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
          this.is_changed_repair = 0;
        });
    },
    UPDATE_REPAIR(e) {
      console.log(e);
      const user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id", e.key);
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("part", e.data.part);
      formData.append("file", this.file);
      formData.append("file_path", this.file_path);
      formData.append("recommendation", e.data.recommendation);
      formData.append("is_changed_repair", this.is_changed_repair);
      formData.append("created_by", e.data.created_by);
      formData.append("created_time", e.data.created_time);
      formData.append("updated_by", user.id_account);
      formData.append("updated_time", e.data.updated_time);
      axios({
        method: "put",
        url: "repair-record/" + e.key,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          console.log(res);
          if (res.status == 204) {
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
          this.is_changed_dwg = 0;
        });
    },
    DELETE_REPAIR(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "repair-record/delete-repair-record?id=" + e.key,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
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
    ON_REPAIR_CHANGE(e) {
      console.log(e);
      this.isInitEdit = 1;
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgRepair = reader.result;
      };
      this.file = e.value[0];
      this.is_changed_repair = 1;
    },
    EDITING_START_REPAIR(e) {
      console.log(e);
      this.imgRepair = e.data.path_repair;
      this.file = [];
      this.isInitEdit = 0;
      this.file_path = e.data.file_path;
      this.dataRepairTemp = e;
    },
    INIT_NEW_ROW_REPAIR() {
      this.imgRepair = "";
      this.file = [];
      this.isInitEdit = 1;
    },
    SAVE(e) {
      console.log("save:");
      console.log(e);
      if (e.changes.length == 0) {
        this.UPDATE_REPAIR(this.dataRepairTemp);
      }
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
    onDropZoneEnter(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = true;
      }
    },
    onDropZoneLeave(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = false;
      }
    },
    onUploaded(e) {
      console.warn(e);
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
    onProgress(e) {
      this.progressValue = (e.bytesLoaded / e.bytesTotal) * 100;
    },
    upload_start() {
      // this.progressVisible = true;
      this.progressVisible = true;
      this.imageSource = "";
    },
    DELETE_IMAGE() {
      this.imgRepair = ""
      this.imageSource = ""
      this.textVisible = true
    }
  },
  watch: {
    $route() {
      console.log("PATH CHANGED");
      this.id_inspection_record = "";
      this.current_view = {};
      this.drawingList = null;
      this.$store.commit("UPDATE_CURRENT_PAGENAME", {
        subpageName: "Marked-Up Drawing",
        subpageInnerName: this.currentPage
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
  // padding: 20px;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.delete-image-button {
  cursor: pointer;
  display: flex;
  width: 56.8px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  margin-top: 8px;
  margin-left: 244px;
  &:hover {
    background-color: #eee;
  }
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
#dropzone-external {
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

#dropzone-external.dropzone-active {
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
</style>