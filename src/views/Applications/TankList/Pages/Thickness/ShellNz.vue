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
          key-expr="id_thk"
          :element-attr="dataGridAttributes"
          :data-source="dataList.view"
          :focused-row-enabled="false"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          style="margin-top: 20px"
        >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />

          <DxColumn
            data-field="shellnz_no"
            caption="Nozzle no."
            sort-order="asc"
          />

          <DxColumn data-field="tp_name" caption="TP name" />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
          />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" />

          <DxColumn data-field="t_req" caption="treq (mm)" format="#,##0.00" />

          <DxColumn
            data-field="first_insp_date"
            caption="First date"
            data-type="date"
            format="dd MMM yyyy"
          />

          <DxColumn
            data-field="first_t_actual"
            caption="First thickness (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="previous_insp_date"
            caption="Previous date"
            data-type="date"
            format="dd MMM yyyy"
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
          />

          <DxColumn
            data-field="t_actual"
            caption="Last thickness (mm)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="crs"
            caption="ST_CR (mm/yr)"
            format="#,##0.00"
          />

          <DxColumn
            data-field="crl"
            caption="LT_CR (mm/yr)"
            format="#,##0.00"
          />

          <DxColumn data-field="rl" caption="RL (yrs)" format="#,##0.00" />

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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
    </div>
    <div id="x-page" class="page-section overflow-x" v-if="tabCurrent == 'A2'">
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>CML</label>
          </div>
          <div class="right">
            <v-ons-toolbar-button>
              <label for="cml-upload-btn"
                ><i class="las la-file-import"></i>Import Excel</label
              >
            </v-ons-toolbar-button>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="cml-upload-btn"
          ref="cml_upload_file"
          @change="UPLOAD_CML()"
        />
        <DxDataGrid
          id="cml-grid"
          key-expr="id_cml"
          :element-attr="dataGridAttributes"
          :data-source="dataList.cml"
          :hover-state-enabled="true"
          :focused-row-enabled="false"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_CML"
          @row-updated="UPDATE_CML"
          @row-removed="DELETE_CML"
          @selection-changed="VIEW_TP"
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

          <DxColumn
            data-field="shellnz_no"
            caption="Nozzle no."
            sort-order="asc"
            :width="90"
          />

          <DxColumn data-field="nps" caption="DIA (in)" :width="80" />

          <DxColumn data-field="material_type" caption="Material type" :width="90">
            <DxLookup
              :data-source="matList"
              display-expr="code"
              value-expr="code"
            />
          </DxColumn>

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" :width="80" />

          <DxColumn
            data-field="t_req"
            caption="treq (mm)"
            format="#,##0.00"
            :allow-editing="false"
            :width="80"
          />

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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>TP</label>
          </div>
          <div class="right">
            <v-ons-toolbar-button>
              <label for="tp-upload-btn"
                ><i class="las la-file-import"></i>Import Excel</label
              >
            </v-ons-toolbar-button>
          </div>
        </div>
        <input
          type="file"
          style="display: none"
          id="tp-upload-btn"
          ref="tp_upload_file"
          @change="UPLOAD_TP()"
        />
        <DxDataGrid
          id="tp-grid"
          key-expr="id_tp"
          :element-attr="dataGridAttributes"
          :data-source="dataList.tp"
          :focused-row-enabled="false"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_TP"
          @row-updated="UPDATE_TP"
          @row-removed="DELETE_TP"
          @selection-changed="VIEW_THK"
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

          <DxColumn data-field="tp_name" caption="TP name" :width="90"/>

          <DxColumn data-field="tp_desc" caption="TP desc" :width="130"/>

          <DxColumn type="buttons">
            <!-- <DxButton hint="View TP" icon="search" :on-click="VIEW_THK" /> -->

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
            info-text="Page {0} of {1} ({2} i tems)"
          />
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <div class="table-header-toolbar" style="width: calc(100% - 82px)">
          <div class="left">
            <label>Thickness</label>
          </div>
          <div class="right"></div>
        </div>
        <DxDataGrid
          id="thk-grid"
          key-expr="id_thk"
          :element-attr="dataGridAttributes"
          :data-source="dataList.thk"
          :focused-row-enabled="false"
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

          <DxColumn data-field="id_inspection_record" caption="Inspection date" :width="120">
            <DxLookup
              :data-source="inspRecordList"
              :display-expr="SET_FORMAT_DATE"
              value-expr="id_inspection_record"
            />
          </DxColumn>

          <DxColumn
            data-field="t_actual"
            caption="tactual (mm)"
            format="#,##0.00"
            :width="90"
          />

          <DxColumn type="buttons">
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
          <DxExport :enabled="true" />
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
  //DxToolbar,
  //DxItem,
  DxEditing,
  DxLookup,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxSelection,
} from "devextreme-vue/data-grid";

export default {
  name: "ViewThicknessShellNozzle",
  components: {
    contentLoading,
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    //DxToolbar,
    //DxItem,
    DxEditing,
    DxLookup,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    DxSelection,
    VueTabsChrome,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Thickness Messurement",
      subpageInnerName: "Shell Nozzle",
    });
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_CML();
      this.FETCH_VIEW();
    }
  },
  data() {
    return {
      dataList: {
        cml: [],
        tp: [],
        thk: [],
        view: [],
      },
      isLoading: false,
      id_cml: 0,
      id_tp: 0,
      inspRecordList: {},
      dataGridAttributes: {
        class: "data-grid-style",
      },
      matList: [
        { code: "CS" },
        { code: "SS" },
        { code: "Duplex" },
        { code: "Unknown" },
      ],
      tabCurrent: "A2",
      tabs: [
        {
          label: "Calculation Result",
          key: "A1",
          closable: false,
        },
        {
          label: "Messurement Result",
          key: "A2",
          closable: false,
        },
      ],
    };
  },
  computed: {},
  methods: {
    FETCH_CML() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shellnz-thickness/shellnz-thk-cml-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("cml:");
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
      console.log(this.id_cml);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shellnz-thickness/shellnz-thk-tp-by-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_cml: this.id_cml,
        },
      })
        .then((res) => {
          console.log("tp:");
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
    FETCH_THK() {
      console.log(this.id_tp);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shellnz-thickness/shellnz-thk-data-by-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tp: this.id_tp,
        },
      })
        .then((res) => {
          console.log("thk:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.thk = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_VIEW() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shellnz-thickness/shellnz-thk-view-last-insp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("view:");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.view = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
    CREATE_CML(e) {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_cml = 0;
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "shellnz-thickness/add-shellnz-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_CML(e) {
      console.log(e);
      this.isLoading = true;
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      axios({
        method: "put",
        url: "shellnz-thickness/edit-shellnz-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
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
        url: "shellnz-thickness/delete-shellnz-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_cml: e.key,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_TP(e) {
      e.data.id_cml = this.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shellnz-thickness/add-shellnz-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
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
        url: "shellnz-thickness/edit-shellnz-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
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
        url: "shellnz-thickness/delete-shellnz-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tp: e.key,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    CREATE_THK(e) {
      e.data.id_thk = 0;
      e.data.id_tp = this.id_tp;
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "shellnz-thickness/add-shellnz-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_THK(e) {
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "shellnz-thickness/edit-shellnz-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
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
        url: "shellnz-thickness/delete-shellnz-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_thk: e.key,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
            this.FETCH_VIEW();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VIEW_TP(e) {
      console.log(e);
      this.id_cml = e.selectedRowKeys[0];
      this.FETCH_TP();
    },
    VIEW_THK(e) {
      console.log(e);
      this.id_tp = e.selectedRowKeys[0];
      this.FETCH_THK();
    },
    SET_FORMAT_DATE(e) {
      console.log(e);
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
          url: "/shellnz-thickness/upload-shell-nz-thk-cml?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: {
            file: file,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status == 204) {
              this.FETCH_CML();
              this.FETCH_VIEW();
            }
          })
          .catch((error) => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
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
          url: "/shellnz-thickness/upload-shell-nz-thk-tp?id_tag=" + id_tag,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          data: {
            file: file,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status == 204) {
              this.FETCH_TP();
              this.FETCH_VIEW();
            }
          })
          .catch((error) => {
            this.$ons.notification.alert(
              error.code + " " + error.response.status + " " + error.message
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$ons.notification.alert(
          "Incorrect filetype. <br/> Only XLS/XLSX file can be uploaded."
        );
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