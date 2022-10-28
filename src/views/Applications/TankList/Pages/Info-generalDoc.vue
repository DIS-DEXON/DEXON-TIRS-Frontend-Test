<template>
  <div class="page-section">
    <DxDataGrid
      id="data-grid-style"
      :data-source="pidList"
      :selection="{ mode: 'single' }"
      :hover-state-enabled="true"
      :allow-column-reordering="true"
      :show-borders="true"
      :show-row-lines="true"
      :row-alternation-enabled="false"
      @exporting="EXPORT_DATA"
    >
      <DxToolbar>
        <DxItem location="before" template="table-header" />
      </DxToolbar>
      <DxColumn
        data-field="created_time"
        :width="0"
        caption=""
        sort-order="asc"
      />
      <DxColumn data-field="file_name" caption="File Name" />
      <DxColumn data-field="file_type" caption="File Type" :width="120" />
      <DxColumn data-field="created_time" caption="Uploaded On" :width="200" />
      <DxColumn :width="110" caption="" cell-template="cell-button-set" />
      <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="VIEW_INFO(data)">
            <i class="las la-search blue"></i>
          </div>
          <div class="table-btn" v-on:click="VIEW_INFO(data)">
            <i class="las la-download green"></i>
          </div>
          <div class="table-btn" v-on:click="VIEW_INFO(data)">
            <i class="las la-trash red"></i>
          </div>
        </div>
      </template>
      <template #table-header>
        <div>
          <div class="page-section-label">General Document</div>
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
</template> 

<script>
//API
// import axios from "/axios.js";
// import moment from "moment";

//Components

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
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";

export default {
  name: "info-drawing",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxToolbar,
    DxItem,
  },
  created() {},
  data() {
    return {
      pidList: [
        {
          id: 1,
          file_name: "other",
          file_type: "pdf",
          file_url: "/wwwroot/file/drawing/tank/file.pdf",
          created_time: "2022-08-15 08:35:00",
          created_by: 2,
        },
        {
          id: 2,
          file_name: "summary",
          file_type: "docx",
          file_url: "/wwwroot/file/drawing/tank/file.pdf",
          created_time: "2022-10-28 15:35:00",
          created_by: 3,
        },
      ],
    };
  },
  computed: {},
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
  },
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
</style>