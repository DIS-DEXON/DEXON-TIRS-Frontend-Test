<template>
  <div class="page-container">
    <innerPageName pageName="Thickness Messurement" breadcrumb1="Shell" />
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-table-shellcourse"
          key-expr="id_tank_course"
          :data-source="dataList.shellcourse"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">Shell Course</div>
            </div>
          </template>
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />
          <DxColumn data-field="course_no" caption="Shell Course" />
          <DxColumn data-field="height_of_course_m" caption="Height (m)" />
          <DxColumn data-field="t_nom_plate_mm" caption="tnom (mm)" />
          <DxColumn data-field="tmin_prod_mm" caption="tretire (mm)" />

          <DxColumn type="buttons">
            <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" />
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

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
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="data-table-cml"
          key-expr="id_cml"
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">CML</div>
            </div>
          </template>
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="plate_desc" caption="Plate Desc." />
          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn type="buttons">
            <DxButton hint="View TP" icon="search" :on-click="VIEW_TP" />
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

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
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="data-table-tp"
          key-expr="id_tp"
          :data-source="dataList.tp"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">TP</div>
            </div>
          </template>
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="tp_name" caption="TP No." />
          <DxColumn data-field="tp_desc" caption="Plate Desc." />

          <DxColumn type="buttons">
            <DxButton hint="View TP" icon="search" :on-click="VIEW_UTM" />
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

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
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="data-table-thk"
          key-expr="id_thk"
          :data-source="dataList.utm"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">UTM</div>
            </div>
          </template>
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="tp_name" caption="TP No." />
          <DxColumn
            data-field="inspection_date"
            caption="Inspection Date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />
          <DxColumn data-field="t_actual" caption="tactual (mm)" />

          <DxColumn type="buttons">
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

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
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
      <div class="table-wrapper" style="grid-column: span 4; margin-top: 20px">
        <DxDataGrid
          id="data-table-thk"
          key-expr="id_tp"
          :data-source="dataList.last_insp_thk"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">Thickness Summary</div>
            </div>
          </template>

          <DxColumn data-field="id_tank_course" caption="Shell Course" />
          <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="tp_name" caption="TP No." />
          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />
          <DxColumn data-field="t_nom" caption="tnom (mm)" />
          <DxColumn data-field="t_req" caption="tretire (mm)" />
          <DxColumn
            data-field="first_insp_date"
            caption="First Insp Date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />
          <DxColumn
            data-field="first_t_actual"
            caption="First Insp Thk. (mm)"
          />
          <DxColumn
            data-field="previous_insp_date"
            caption="Prev Insp Date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />
          <DxColumn
            data-field="previous_t_actual"
            caption="Prev Insp Thk. (mm)"
          />
          <DxColumn
            data-field="inspection_date"
            caption="Last Insp Date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />
          <DxColumn data-field="t_actual" caption="Last Insp Thk. (mm)" />
          <DxColumn data-field="crs" caption="ST_CR (mm/yr)" />
          <DxColumn data-field="crl" caption="LT_CR (mm/yr)" />
          <DxColumn data-field="scr" caption="SCR (mm/yr)" />
          <DxColumn data-field="rl" caption="RL (yr)" />

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxPaging :page-size="10" :page-index="0" />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[5, 10, 20]"
            :show-navigation-buttons="true"
            :show-info="true"
            info-text="Page {0} of {1} ({2} items)"
          />
          <!-- <DxExport :enabled="true" /> -->
        </DxDataGrid>
      </div>
    </div>
    <contentLoading
      text="Loading, please wait..."
      v-if="isLoading == true"
      color="#fc9b21"
    />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
// import moment from "moment";

//Components
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import innerPageName from "@/components/app-structures/app-inner-pagename.vue";

//DataGrid
import "devextreme/dist/css/dx.light.css";
// import { Workbook } from "exceljs";
// import saveAs from "file-saver";
// import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  // DxExport,
  DxToolbar,
  DxItem,
  DxEditing,
  // DxLookup,
  DxButton,
} from "devextreme-vue/data-grid";

export default {
  name: "ViewTankInformation",
  components: {
    contentLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    // DxExport,
    DxToolbar,
    DxItem,
    DxEditing,
    // DxLookup,
    DxButton,
    innerPageName,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Thickness Messurement");
    if (this.$store.state.status.server == true) {
      this.FETCH_SHELL_COURSE();
      this.FETCH_LAST_INSP_THK();
    }
  },
  data() {
    return {
      dataList: {
        shellcourse: [],
        cml: [],
        tp: [],
        thk: [],
        last_insp_thk: [],
      },
      dataGridAttributes: {
        class: "data-grid-style",
      },
      isLoading: false,
      current_view_item: {
        id_tank_course: null,
        id_cml: null,
        id_tp: null,
        id_utm: null,
      },
    };
  },
  computed: {},
  methods: {
    FETCH_SHELL_COURSE() {
      this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "tank-course/tank-course-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id,
        },
      })
        .then((res) => {
          console.log("==> SHELL COURSE");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.shellcourse = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CML() {
      this.isLoading = true;
      var id = this.current_view_item.id_tank_course;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-cml-by-Course-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tank_course: id,
        },
      })
        .then((res) => {
          console.log("==> CML");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.cml = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_TP() {
      this.isLoading = true;
      var id = this.current_view_item.id_cml;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-tp-by-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_cml: id,
        },
      })
        .then((res) => {
          console.log("==> TP");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.tp = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_UTM() {
      this.isLoading = true;
      var id = this.current_view_item.id_tp;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-data-by-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tp: id,
        },
      })
        .then((res) => {
          console.log("==> UTM");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.utm = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_LAST_INSP_THK() {
      this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-view-last-insp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id,
        },
      })
        .then((res) => {
          console.log("==> LAST INSP THK");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.last_insp_thk = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_CML(e) {
      this.current_view_item.id_tank_course = e.row.key;
      this.FETCH_CML();
    },
    VIEW_TP(e) {
      this.current_view_item.id_cml = e.row.key;
      this.FETCH_TP();
    },
    VIEW_UTM(e) {
      this.current_view_item.id_tp = e.row.key;
      this.FETCH_UTM();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  .page-section {
    height: fit-content;
    margin-bottom: 20px;
    width: calc(100% - 20px);
    padding: 20px 10px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 30% 20% 20% 30%;
    grid-template-rows: 500px 500px;
    // grid-gap: 10px;
  }
}

.table-wrapper {
  padding: 0 10px;
}

.data-grid-style {
  height: 100%;
}

.page-section-label {
  padding: 0;
}
</style>