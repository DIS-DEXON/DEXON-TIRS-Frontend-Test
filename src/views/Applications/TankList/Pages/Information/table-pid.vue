<template>
  <div class="page-section">
    <div class="datagrid-header">
      <span>P&ID</span>
    </div>
    <DxDataGrid
      id="pid"
      key-expr="id_library"
      :data-source="library"
      :element-attr="dataGridAttributes"
      :hover-state-enabled="true"
      :allow-column-reordering="true"
      :show-borders="true"
      :show-row-lines="true"
      :focused-row-enabled="false"
      :row-alternation-enabled="false"
      @row-inserted="ADD_NEW_FILE"
      @row-removed="DELETE_DOC"
      @exporting="EXPORT_DATA"
    >
      <DxEditing
        :allow-deleting="true"
        :allow-adding="true"
        :allow-updating="true"
        :use-icons="true"
        :show-borders="true"
        mode="form"
      >
        <!-- THIS FORM DOES NOT SHOW UP -->
        <!-- <DxForm>
          <DxItem :col-count="2" :col-span="2" caption="Home Address" />
          <DxItem data-field="file_name" />
          <DxItem data-field="file" edit-cell-template="editCellTemplate" />
        </DxForm>-->
      </DxEditing>

      <!-- <DxToolbar>
        <DxItem location="before" template="table-header" />
      </DxToolbar>-->

      <DxColumn data-field="file" :visible="false" edit-cell-template="insertCellTemplate" />
      <!-- <DxColumn data-field="file" :visible="false" /> -->
      <DxColumn
        data-field="file_name"
        :allow-adding="true"
        :allow-editing="true"
        caption="File name"
      />

      <template #table-header>
        <div>
          <div class="page-section-label">Drawing</div>
        </div>
      </template>
      <template #insertCellTemplate>
        <div class="widget-container">
          <DxFileUploader
            id="file-uploader"
            dialog-trigger="#dropzone-external"
            drop-zone="#dropzone-external"
            :multiple="false"
            upload-mode="useForm"
            @value-changed="VALUE_CHANGE"
            :visible="true"
            @uploaded="VALUE_CHANGE"
          />
          <!-- <div
            id="dropzone-external"
            class="flex-box"
            :class="[isDropZoneActive
        ? 'dx-theme-accent-as-border-color dropzone-active'
        : 'dx-theme-border-color']"
          >
            <div id="dropzone-text" class="flex-box" v-if="textVisible">
              <span>Drag & Drop the desired file</span>
              <span>…or click to browse for a file instead.</span>
            </div>
          </div>-->
        </div>
      </template>

      <!-- <template #table-header-button-set>
        <div>
          <v-ons-toolbar-button>
            <i class="las la-upload"></i>
            <span>Upload New</span>
          </v-ons-toolbar-button>
        </div>
      </template>-->

      <DxColumn type="buttons">
        <DxButton name="image" hint="download" icon="download" :on-click="DOWNLOAD" />
        <!-- <DxButton name="edit" hint="Edit" icon="edit" /> -->
        <DxButton name="delete" hint="Delete" icon="trash" />
      </DxColumn>

      <DxHeaderFilter :visible="true" />
      <!-- <DxFilterRow :visible="false" /> -->
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
</template> 

<script>
//API
// import axios from "/axios.js";
// import moment from "moment";

//Components

//DataGrid
import "devextreme/dist/css/dx.light.css";
import axios from "/axios.js";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxHeaderFilter,
  DxButton,
  DxEditing,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport
  //DxToolbar,
  //DxItem
} from "devextreme-vue/data-grid";

export default {
  name: "info-drawing",
  components: {
    DxFileUploader,
    DxButton,
    DxHeaderFilter,
    DxDataGrid,
    DxSearchPanel,
    DxEditing,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport
    //DxToolbar,
    //DxItem
  },
  created() {},
  data() {
    return {
      library: [],
      pidList: [
        {
          id: 1,
          file_name: "original_pid_unmarked",
          file_type: "pdf",
          file_url: "/wwwroot/file/drawing/tank/file.pdf",
          created_time: "2022-08-15 08:35:00",
          created_by: 2
        },
        {
          id: 2,
          file_name: "original_pid_rev01",
          file_type: "pdf",
          file_url: "/wwwroot/file/drawing/tank/file.pdf",
          created_time: "2022-10-28 15:35:00",
          created_by: 3
        }
      ],
      dataGridAttributes: {
        class: "data-grid-style"
      }
    };
  },
  computed: {},
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
    FETCH_LIBRARY() {
      let id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "/tank-library/tank-library-by-type-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_library_type: 2
        }
      })
        .then(res => {
          //console.log(res);
          if (res.status == 200) {
            //console.log("in");
            console.log(res.data);
            this.library = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    ADD_NEW_FILE(e) {
      console.log("INSERTING . . .");
      console.log(e);
      console.log(e.data);
      var formData = new FormData();
      formData.append("id_tag", this.$route.params.id_tag);
      formData.append("file_name", e.data.file_name);
      formData.append("id_library_type", 2);
      //console.log("id account: " + this.$store.state.user.id_account);
      formData.append("created_by", this.$store.state.user.id_account);
      formData.append("file", this.file);
      axios({
        method: "post",
        url: "/tank-library/add-tank-library",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 201) {
            //console.log("in");
            //console.log(res.data);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
          console.log("UPLOAD COMPLETED");
          this.FETCH_LIBRARY();
        });
    },
    VALUE_CHANGE(e) {
      //console.log("fileReader e data:");
      console.log(e);
      console.log(e.value[0].name);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {
        // this.drawingList.file = reader.result;
      };
      this.file = e.value[0];
      this.file_name = e.value[0].name;
    },
    DOWNLOAD() {},
    DELETE_DOC() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.page-section {
  padding: 20px;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.toolbar-button {
  background-color: $web-theme-color-background;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;
  border: 1px solid $web-font-color-black;

  i {
    font-size: 20px;
    color: $web-font-color-black;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: $web-font-color-black;
  }
}
.toolbar-button:hover,
.toolbar-button:active {
  background-color: $dexon-primary-blue;

  i {
    color: $web-font-color-white;
  }
  span {
    color: $web-font-color-white;
  }
}
span {
  font-weight: bold;
  font-size: 15px;
  color: $web-font-color-blue;
  padding: 0%;
}
</style>