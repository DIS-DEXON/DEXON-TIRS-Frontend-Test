<template>
  <div class="page-section">
    <div class="page-section-label">General Document</div>
    <DxDataGrid
      id="data-grid-style"
      :data-source="courseList"
      :selection="{ mode: 'single' }"
      :hover-state-enabled="true"
      :allow-column-reordering="true"
      :show-borders="true"
      :show-row-lines="true"
      :row-alternation-enabled="false"
      @exporting="EXPORT_DATA"
      :word-wrap-enabled="true"
    >
      <DxColumn
        data-field="created_time"
        :width="0"
        caption=""
        sort-order="asc"
      />
      <DxColumn data-field="course_no" caption="Course No" />
      <DxColumn
        data-field="nominal_shell_thk"
        caption="Nominal Shell Thk (mm)"
      />
      <DxColumn data-field="accu_height" caption="Accumulate Height" />
      <DxColumn data-field="tank_material" caption="Tank Material" />
      <DxColumn data-field="material_type" caption="Material Type" />
      <DxColumn data-field="y" caption="y" />
      <DxColumn data-field="t" caption="t" />
      <DxColumn data-field="height_hydro" caption="Height Hydro" />
      <DxColumn data-field="height_prod" caption="Height Prod" />
      <DxColumn data-field="tretire_hydro" caption="tretire Prod" />
      <DxColumn data-field="height_prod" caption="tretire Prod" />
      <DxColumn :width="50" caption="" cell-template="cell-button-set" />
      <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="VIEW_INFO(data)">
            <i class="las la-edit blue"></i>
          </div>
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
  },
  created() {},
  data() {
    return {
      courseList: [
        {
          id: 1,
          course_no: 1,
          nominal_shell_thk: 6.35,
          height: 1.828,
          accu_height: 1.83,
          tank_material: null,
          material_type: "CS",
          y: 30000,
          t: 55000,
          height_hydro: 10.97,
          height_prod: 10.97,
          tretire_hydro: 0.17,
          tretire_prod: 0.19,
        },
        {
          id: 2,
          course_no: 2,
          nominal_shell_thk: 6.35,
          height: 1.828,
          accu_height: 3.66,
          tank_material: null,
          material_type: "CS",
          y: 30000,
          t: 55000,
          height_hydro: 10.97,
          height_prod: 10.97,
          tretire_hydro: 0.17,
          tretire_prod: 0.19,
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