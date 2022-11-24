<template>
  <div class="page-container">
    <div class="list-panel">
      <div class="column-header">Inspection Record</div>
      <DxList :data-source="inspRecordList">
        <template #item="{ data: item }">
          <div
            class="list-item-wrapper"
            :class="{
              active: item.id_inspection_record == id_inspection_record,
            }"
          >
            <div class="contents">
              {{ DATE_FORMAT(item.inspection_date) }}<br />
              {{ SET_CAMPAIGN(item.id_campaign) }}
            </div>
            <div class="contents">
              <v-ons-toolbar-button
                class="btn"
                v-on:click="VIEW_DWG(item.id_inspection_record)"
              >
                <i class="las la-search"></i>
              </v-ons-toolbar-button>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div class="list-page" style="overflow-y: auto">
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
          <DxPopup :show-title="true" :width="700" title="New Picture Log">
          </DxPopup>
          <DxForm>
            <DxItem :col-count="2" :col-span="2" item-type="group">
              <DxItem data-field="file_path" :col-span="2" />
              <DxItem data-field="finding" :col-span="2" />
              <DxItem data-field="recommendation" :col-span="2" />
            </DxItem>
          </DxForm>
        </DxEditing>

        <DxColumn
          data-field="file_path"
          caption="Overview Picture"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor1"
          :width="500"
        />
        <DxColumn
          data-field="file_path"
          caption="Close-Up Picture"
          cell-template="dwg-img"
          edit-cell-template="dwg-img-editor2"
          :width="500"
        />

        <DxColumn data-field="finding" caption="Finding" />
        <DxColumn data-field="recomend" caption="Recommendation" />

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

        <template #dwg-img-editor1="{ data }">
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
        <template #dwg-img-editor2="{ data }">
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
import { DxList } from "devextreme-vue/list";

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
    DxList,
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
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Picture Log");
    if (this.$store.state.status.server == true) {
      this.FETCH_CAMPAIGN();
      this.FETCH_INSP_RECORD();
    }
  },
  data() {
    return {
      drawingList: [
        // {
        //   id_dwg: 1,
        //   id_tag: 5,
        //   id_inspection_record: 2,
        //   path_dwg: "wwwroot/attach/marked_up_dwg/4-GC-H12N-0206101_Page_1.png",
        //   file_name: "4-GC-H12N-0206101_Page_1",
        // },
        // {
        //   id_dwg: 2,
        //   id_tag: 5,
        //   id_inspection_record: 2,
        //   path_dwg: "wwwroot/attach/marked_up_dwg/4-GC-H12N-0206101_Page_2.png",
        //   file_name: "4-GC-H12N-0206101_Page_2",
        // },
      ],
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
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_DWG(id_inspection_record) {
      this.id_component = this.$route.params.id_component;
      this.id_inspection_record = id_inspection_record;
      console.log("id_insp:" + id_inspection_record);
      console.log("id_component:" + this.id_component);
      axios({
        method: "post",
        url: "layout-drawing/layout-drawing-by-comp-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_component: this.id_component,
          id_inspection_record: id_inspection_record,
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
    DATE_FORMAT(d) {
      return moment(d).format("LL");
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
    FETCH_CAMPAIGN() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.campaignList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CAMPAIGN(id) {
      if (this.campaignList) {
        var data = this.campaignList.filter(function (e) {
          return e.id_campaign == id;
        });
        console.log(data);
        return data[0].campaign_desc;
      }
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
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
  grid-template-columns: 250px calc(100% - 250px);
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.tab-wrapper {
  height: 48px;
}

.info-tab-display {
  display: flex;
}

.dx-list-item-content::before {
  content: none;
}
#data-grid-style {
  width: 100%;
}

.btn-view-dwg {
  padding: 8px;
  text-align: center;
  background-color: #eb1851;
  color: #fff;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>