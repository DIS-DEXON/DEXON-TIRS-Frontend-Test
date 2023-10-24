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
              <DxItem data-field="note" :col-span="2" />
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
              v-if="imgHolder != '' && isInitEdit == 0"
            />
            <img
              :src="imgHolder"
              width="300"
              height="200"
              v-if="imgHolder != '' && isInitEdit == 1"
            />
            <img
              src="http://tmt-solution.com/public/image-empty.png"
              width="300"
              height="200"
              v-if="imgHolder == ''"
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
        <DxExport :enabled="false" :fileName="'Other Attachment'" />
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

//import { DxButton } from 'devextreme-vue/button';
import { DxFileUploader } from "devextreme-vue/file-uploader";
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
    // this.$store.commit("UPDATE_CURRENT_INAPP", {
    //   name: "Tank Management",
    //   icon: "/img/icon_menu/tank/tank.png"
    // });
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
      imgHolder: "",
      file: [],
      isInitEdit: 0,
      id_component: 0,
      id_inspection_record: 0,
      dataGridAttributes: {
        class: "data-grid-custom-style"
      },
      pagePanelHiding: false,
      current_view: {},
      dataIMGTemp: "",
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
    FETCH_ATTACHMENTS() {
      axios({
        method: "get",
        url:
          "other-attachment/get-other-attachment-by-ir-id?id_inspection_record=" +
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
      let user = JSON.parse(localStorage.getItem("user"));
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("note", e.data.note);
      formData.append("file", this.file);
      formData.append("created_by", user.id_account);
      formData.append("updated_by", user.id_account);

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
      let user = JSON.parse(localStorage.getItem("user"));
      var formData = new FormData();
      formData.append("id", e.key);
      formData.append("id_inspection_record", this.id_inspection_record);
      formData.append("file", this.file);
      formData.append("file_path", this.file_path);

      formData.append("note", e.data.note);

      formData.append("created_time", e.data.created_time);
      formData.append("created_by", e.data.created_by);
      formData.append("updated_by", user.id_account);
      axios({
        method: "put",
        url: "other-attachment/edit-other-attachment?id=" + e.key,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 204) {
            //console.log(res.data);
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
    ON_DWG_CHANGE(e) {
      console.log(e);
      this.isInitEdit = 1;
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        this.imgHolder = reader.result;
      };
      this.file = e.value[0];
    },
    EDITING_START_DWG(e) {
      console.warn("EDIT");
      console.log(e);
      this.file = [];
      this.isInitEdit = 0;
      this.file_path = e.data.file_path;
      this.dataIMGTemp = e;
    },
    SAVE(e) {
      console.log("save:");
      console.log(e);
      if (e.changes.length == 0) {
        this.UPDATE_DWG(this.dataIMGTemp);
      }
    },
    INIT_NEW_ROW_DWG() {
      this.imgHolder = "";
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