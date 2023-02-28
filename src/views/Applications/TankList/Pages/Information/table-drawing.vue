<template>
  <div class="page-section">
    <DxDataGrid
      id="drawing"
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
        mode="form"
      ></DxEditing>

      <!-- <DxToolbar>
        <DxItem location="before" template="table-header" />
        <DxItem location="after" template="table-header-button-set" />
      </DxToolbar>-->

      <DxColumn data-field="file" caption :visible="false" edit-cell-template="editCellTemplate" />
      <DxColumn
        data-field="file_name"
        :allow-adding="false"
        :allow-editing="false"
        caption="File name"
      />

      <template #table-header>
        <div>
          <div class="page-section-label">Drawing</div>
        </div>
      </template>

      <template #editCellTemplate="{  }">
        <div>
          <img src="http://tmt-solution.com/public/image-empty.png" width="150" height="100" />
          <DxFileUploader
            select-button-text="Select File"
            label-text
            upload-mode="useForm"
            @value-changed="VALUE_CHANGE"
          />
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
      <DxExport :enabled="false" />
    </DxDataGrid>
  </div>
</template> 

<script>
//API
// import axios from "/axios.js";
// import moment from "moment";

//Components

//DataGrid
import axios from "/axios.js";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxEditing,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  //DxToolbar,
  //DxItem,
  //DxForm,
  //DxFormItem,
  DxButton,
  DxHeaderFilter
} from "devextreme-vue/data-grid";

export default {
  name: "info-drawing",
  components: {
    DxDataGrid,
    DxEditing,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    //DxToolbar,
    //DxItem,
    //DxFormItem,
    //DxForm,
    DxButton,
    DxHeaderFilter,
    DxFileUploader
  },
  created() {
    console.clear();
    this.FETCH_LIBRARY();
  },
  data() {
    return {
      file: [],
      file_name: "",
      DxDataGrid,
      DxPaging,
      DxPager,
      DxScrolling,
      DxColumn,
      DxExport,
      DxEditing,
      DxFileUploader,
      library: [],
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
          id_library_type: 1
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
      formData.append("id_library_type", 1);
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
    setCellValue(newData, value) {
      console.log("newData:" + newData);
      console.log("value:" + value);
      newData.file_name = this.file_name;
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
</style>