<template>
  <div class="page-container">
    <div class="tab-wrapper">
      <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
    </div>
    <div class="page-section" v-if="tabCurrent == 'A1'">
      <div class="table-header-toolbar" style="width: calc(100% - 41px)">
        <div class="left">
          <label>Thickness Calculation Result</label>
        </div>
        <div class="right"></div>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="view-grid"
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
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxColumn data-field="course_no" caption="Shell course" />

          <DxColumn data-field="plate_no" caption="Plate no" />

          <DxColumn data-field="tp_name" caption="TP name" />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" />

          <DxColumn data-field="t_req" caption="treq (mm)" format="#,##0.00" />

          <DxColumn
            data-field="first_insp_date"
            caption="First date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="first_t_actual" caption="First thickness (mm)" format="#,##0.00" />

          <DxColumn
            data-field="previous_insp_date"
            caption="Previous date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn
            data-field="previous_t_actual"
            caption="Previous thickness (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="inspection_date"
            caption="Last date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn data-field="t_actual" caption="Last thickness (mm)" format="#,##0.00" />

          <DxColumn data-field="crs" caption="ST_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="crl" caption="LT_CR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="scr" caption="SCR (mm/yr)" format="#,##0.00" />

          <DxColumn data-field="rl" caption="RL (yrs)" format="#,##0.00" />

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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
    </div>
    <div id="x-page" class="page-section overflow-x" v-if="tabCurrent == 'A2'">
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 216px)">
          <div class="left">
            <label>Shell Course</label>
          </div>
          <div class="right"></div>
        </div>
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
          @selection-changed="VIEW_CML"
          @row-click="SHELL_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />
          <DxColumn data-field="course_no" caption="Shell Course" :width="80" />
          <DxColumn data-field="height_of_course_m" caption="Height (m)" :width="80" />
          <DxColumn data-field="t_nom_plate_mm" caption="tnom (mm)" :width="80" />
          <DxColumn data-field="tmin_prod_mm" caption="tretire (mm)" :width="80" />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel id="search-pn" :visible="true" />
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
        <div class="table-header-toolbar" :style="px_cml">
          <div class="left">
            <label>CML</label>
          </div>
          <div class="right">
            <v-ons-toolbar-button>
              <label for="cml-upload-btn">
                <i class="las la-file-import"></i>Import Excel
              </label>
            </v-ons-toolbar-button>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="cml-upload-btn"
          ref="cml_upload_file"
          @change="UPLOAD_CML()"
          :disabled="IMPORT_CML"
        />
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
          @row-inserted="CREATE_CML"
          @row-updated="UPDATE_CML"
          @row-removed="DELETE_CML"
          @selection-changed="VIEW_TP"
          @row-click="CML_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="plate_no" caption="Plate No." :width="80" />
          <DxColumn data-field="plate_desc" caption="Plate Desc." :width="80" />
          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_TP" /> -->
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="false" />
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
        <div class="table-header-toolbar" :style="px">
          <div class="left">
            <label>TP</label>
          </div>
          <div class="right">
            <v-ons-toolbar-button>
              <label for="tp-upload-btn">
                <i class="las la-file-import"></i>Import Excel
              </label>
            </v-ons-toolbar-button>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="tp-upload-btn"
          ref="tp_upload_file"
          @change="UPLOAD_TP()"
          :disabled="IMPORT_TP"
        />
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
          @row-inserted="CREATE_TP"
          @row-updated="UPDATE_TP"
          @row-removed="DELETE_TP"
          @selection-changed="VIEW_UTM"
          @row-click="TP_FLAGER"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="single" />
          <!-- <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">TP</div>
            </div>
          </template>-->
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn data-field="tp_name" caption="TP No." :width="100" />
          <DxColumn data-field="tp_desc" caption="Plate Desc." :width="200" />

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_UTM" /> -->
            <DxButton name="edit" hint="Edit" icon="edit" />
            <DxButton name="delete" hint="Delete" icon="trash" />
          </DxColumn>

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="false" />
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
        <div class="table-header-toolbar" :style="px_thk">
          <div class="left">
            <label>Thickness</label>
          </div>
          <div class="right"></div>
        </div>
        <DxDataGrid
          id="data-table-thk"
          key-expr="id_thk"
          :data-source="dataList.thk"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_THK"
          @row-updated="UPDATE_THK"
          @row-removed="DELETE_THK"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <!-- <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="tp_name" caption="TP No." />-->
          <DxColumn data-field="id_inspection_record" caption="Inspection date" :width="150">
            <DxLookup
              :data-source="inspRecordList"
              :display-expr="SET_FORMAT_DATE"
              value-expr="id_inspection_record"
            />
          </DxColumn>

          <DxColumn data-field="t_actual" caption="tactual (mm)" :width="150" />

          <!-- Configuration goes here -->
          <!-- <DxFilterRow :visible="true" /> -->
          <DxScrolling mode="standard" />
          <DxSearchPanel :visible="false" />
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
    </div>

    <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
  </div>
</template> 

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import VueTabsChrome from "vue-tabs-chrome";

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
  DxExport,
  // DxToolbar,
  // DxItem,
  DxEditing,
  DxLookup,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxSelection
} from "devextreme-vue/data-grid";

export default {
  name: "ViewThicknessShell",
  components: {
    contentLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    // DxToolbar,
    // DxItem,
    DxEditing,
    DxLookup,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
    VueTabsChrome
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "Shell"
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_SHELL_COURSE();
      this.FETCH_LAST_INSP_THK();
    }
  },
  data() {
    return {
      px_thk: "width: calc(100% - 0px)",
      px: "width: calc(100% - 0px)",
      px_cml: "width: calc(100% - 0px)",
      shell_flag: false,
      cml_flag: false,
      tp_flag: false,
      dataList: {
        shellcourse: [],
        cml: [],
        tp: [],
        thk: [],
        last_insp_thk: []
      },
      dataGridAttributes: {
        class: "data-grid-style"
      },
      isLoading: false,
      current_view_item: {
        id_tank_course: null,
        id_cml: null,
        id_tp: null,
        id_utm: null
      },
      inspRecordList: {},
      tabCurrent: "A2",
      tabs: [
        {
          label: "Calculation Result",
          key: "A1",
          closable: false
        },
        {
          label: "Messurement Result",
          key: "A2",
          closable: false
        }
      ]
    };
  },
  computed: {
    SELECTION() {
      if (this.tp_flag) {
        return true;
      }
      return false;
    },
    IMPORT_CML() {
      if (this.shell_flag) {
        console.warn(this.shell_flag);
        return false;
      }
      return true;
    },
    IMPORT_TP() {
      if (this.tp_flag) {
        console.warn(this.tp_flag);
        return false;
      }
      return true;
    }
  },
  methods: {
    FETCH_SHELL_COURSE() {
      this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "tank-course/tank-course-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id
        }
      })
        .then(res => {
          console.log("==> SHELL COURSE");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.shellcourse = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CML() {
      // this.isLoading = true;
      var id = this.current_view_item.id_tank_course;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-cml-by-Course-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tank_course: id
        }
      })
        .then(res => {
          console.log("==> CML");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.cml = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_TP() {
      // this.isLoading = true;
      var id = this.current_view_item.id_cml;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-tp-by-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_cml: id
        }
      })
        .then(res => {
          console.log("==> TP");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.tp = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_UTM() {
      // this.isLoading = true;
      var id = this.current_view_item.id_tp;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-data-by-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tp: id
        }
      })
        .then(res => {
          console.log("==> UTM");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_INSP_RECORD() {
      // this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag
        }
      })
        .then(res => {
          console.log("insp record:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.inspRecordList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_LAST_INSP_THK() {
      // this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-thickness/shell-thk-view-last-insp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id
        }
      })
        .then(res => {
          console.log("==> LAST INSP THK");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.last_insp_thk = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_CML(e) {
      this.current_view_item.id_tank_course = e.selectedRowKeys[0];
      this.FETCH_CML();
      this.tp_flag = false;
      this.px = "width: calc(100% - 0px)";
      this.px_thk = "width: calc(100% - 0px)";
    },
    VIEW_TP(e) {
      this.current_view_item.id_cml = e.selectedRowKeys[0];
      this.FETCH_TP();
      this.tp_flag = false;
    },
    VIEW_UTM(e) {
      this.current_view_item.id_tp = e.selectedRowKeys[0];
      this.FETCH_UTM();
    },
    CREATE_CML(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_cml = 0;
      e.data.id_tank_course = this.current_view_item.id_tank_course;
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "shell-thickness/add-shell-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            //this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_CML(e) {
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "shell-thickness/edit-shell-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_CML(e) {
      console.log(e);
      this.isLoading = true;
      axios({
        method: "delete",
        url: "shell-thickness/delete-shell-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_cml: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_TP(e) {
      e.data.id_cml = this.current_view_item.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shell-thickness/add-shell-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            // this.FETCH_VIEW();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_TP(e) {
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "shell-thickness/edit-shell-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_TP(e) {
      console.log(e);
      axios({
        method: "delete",
        url: "shell-thickness/delete-shell-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tp: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_THK(e) {
      e.data.id_thk = 0;
      e.data.id_tp = this.current_view_item.id_tp;
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shell-thickness/add-shell-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_THK(e) {
      console.log(e.data);
      var date = this.inspRecordList.filter(function(v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "shell-thickness/edit-shell-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE_THK(e) {
      console.log(e);
      this.isLoading = true;
      axios({
        method: "delete",
        url: "shell-thickness/delete-shell-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_thk: e.key
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            this.FETCH_LAST_INSP_THK();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_FORMAT_DATE(e) {
      // console.log(e);
      return moment(e.inspection_date).format("DD MMM yyyy");
    },
    UPLOAD_CML() {
      this.isLoading = true;
      var file = this.$refs.cml_upload_file.files[0];
      var id_tag = parseInt(this.$route.params.id_tag);
      if (
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        this.$route.params.id_tag
      ) {
        axios({
          method: "post",
          url: "/shell-thickness/upload-shell-thk-cml?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            file: file
          }
        })
          .then(res => {
            console.log(res);
            if (res.status == 204) {
              console.log("success");
              // this.FETCH_CML();
              // this.FETCH_LAST_INSP_THK();
            }
          })
          .catch(error => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
            this.$ons.notification.alert("Upload Completed!");
          });
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only XLS/XLSX file can be uploaded."
        );
      }
    },
    UPLOAD_TP() {
      this.isLoading = true;
      var file = this.$refs.tp_upload_file.files[0];
      var id_tag = parseInt(this.$route.params.id_tag);
      if (
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        this.$route.params.id_tag
      ) {
        axios({
          method: "post",
          url: "/shell-thickness/upload-shell-thk-tp?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          },
          data: {
            file: file
          }
        })
          .then(res => {
            console.log(res);
            if (res.status == 204) {
              this.FETCH_LAST_INSP_THK();
            }
          })
          .catch(error => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
            this.$ons.notification.alert("Upload Completed!");
          });
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only XLS/XLSX file can be uploaded."
        );
      }
    },
    TP_FLAGER() {
      this.tp_flag = true;
      this.px_thk = "width: calc(100% - 42px)";
    },
    CML_FLAGER() {
      this.px = "width: calc(100% - 42px)";
    },
    SHELL_FLAGER() {
      this.px_cml = "width: calc(100% - 42px)";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .page-section {
    padding: 20px;
    height: fit-content;
    width: auto;
  }

  .overflow-x {
    height: calc(100% - 88px);
  }
}
.table-wrapper {
  margin-right: 20px;
}
.table-wrapper:last-child {
  margin-right: 0px;
}

.data-grid-style {
  height: 100%;
}
</style>