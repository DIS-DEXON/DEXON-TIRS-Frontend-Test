<template>
  <div class="page-container">
    <innerPageName pageName="Thickness Messurement" breadcrumb1="Coil" />
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="coil-grid"
          key-expr="id_coil"
          :data-source="dataList.coil"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_COIL"
          @row-updated="UPDATE_COIL"
          @row-removed="DELETE_COIL"
        >

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />
          <DxColumn 
            data-field="coil_no" 
            caption="Coil no"
          />

          <DxColumn 
            data-field="coil_name" 
            caption="Coil name"
          />

          <DxColumn type="buttons">
            <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" />
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
        <DxDataGrid
          id="cml-grid"
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
        >

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn 
            data-field="cml_no" 
            caption="CML no" 
          />

          <DxColumn 
            data-field="cml_name" 
            caption="CML name" 
          />

          <DxColumn 
            data-field="part" 
            caption="Part" 
          />

          <DxColumn 
            data-field="nps" 
            caption="NPS" 
          />

          <DxColumn 
            data-field="t_nom" 
            caption="tnom (mm)" 
            format="#,##0.00"
          />

          <DxColumn 
            data-field="t_req" 
            caption="treq (mm)" 
            format="#,##0.00"
            :allow-editing="false"
          />

          <DxColumn 
            data-field="P" 
            caption="P (psi)" 
            format="#,##0.00"
          />

          <DxColumn 
            data-field="S" 
            caption="S (psi)" 
            format="#,##0.00"
          />

          <DxColumn 
            data-field="E" 
            caption="E" 
          />

          <DxColumn 
            data-field="material_type" 
            caption="Material type"
          >
            <DxLookup
              :data-source="matList"
              display-expr="code"
              value-expr="code"
            />
          </DxColumn>

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
        <DxDataGrid
          id="tp-grid"
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
        >
          <!-- <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">TP</div>
            </div>
          </template> -->
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn 
            data-field="tp_name" 
            caption="TP No."
          />
          <DxColumn 
            data-field="tp_desc" 
            caption="TP Desc." 
          />

          <DxColumn type="buttons">
            <DxButton hint="View TP" icon="search" :on-click="VIEW_UTM" />
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
        <DxDataGrid
          id="thk-grid"
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
          <!-- <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">UTM</div>
            </div>
          </template> -->
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <!-- <DxColumn data-field="plate_no" caption="Plate No." />
          <DxColumn data-field="tp_name" caption="TP No." /> -->
          <DxColumn data-field="id_inspection_record" caption="Inspection date">
            <DxLookup
              :data-source="inspRecordList"
              :display-expr="SET_FORMAT_DATE"
              value-expr="id_inspection_record"
            />
          </DxColumn>

          <DxColumn 
            data-field="t_actual" 
            caption="tactual (mm)"
          />

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
      <div class="table-wrapper" style="grid-column: span 4; margin-top: 20px">
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
          <DxToolbar>
            <DxItem location="before" template="table-header" />
          </DxToolbar>
          <template #table-header>
            <div>
              <div class="page-section-label">Thickness Summary</div>
            </div>
          </template>

          <DxColumn
            data-field="coil_no" 
            caption="Coil No." 
          />

          <DxColumn 
            data-field="cml_name" 
            caption="CML name"
          />

          <DxColumn 
            data-field="tp_name" 
            caption="TP name"
          />

          <DxColumn
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
          />

          <DxColumn
            data-field="t_nom"
            caption="tnom (mm)"
            format="#,##0.00"
          />

          <DxColumn 
            data-field="t_req" 
            caption="treq (mm)" 
            format="#,##0.00"
          />

          <DxColumn
            data-field="first_insp_date"
            caption="First date"
            data-type="date"
            format="dd MMM yyyy"
            :width="120"
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

          <DxColumn 
            data-field="scr" 
            caption="SCR (mm/yr)" 
            format="#,##0.00"
          />

          <DxColumn 
            data-field="rl"
            caption="RL (yrs)"
            format="#,##0.00"
          />

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
import moment from "moment";

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
  DxLookup,
  DxButton,
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
    // DxExport,
    DxToolbar,
    DxItem,
    DxEditing,
    DxLookup,
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
      this.FETCH_INSP_RECORD();
      this.FETCH_COIL();
      this.FETCH_LAST_INSP_THK();
    }
  },
  data() {
    return {
      dataList: {
        coil: [],
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
        id_coil: null,
        id_cml: null,
        id_tp: null,
        id_utm: null,
      },
      inspRecordList: {},
      matList: [
        { code: "CS" },
        { code: "SS" },
        { code: "Duplex" },
        { code: "Unknown" },
      ],
    };
  },
  computed: {},
  methods: {
    FETCH_COIL() {
      this.isLoading = true;
      var id = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "coil-thickness/coil-info-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id,
        },
      })
        .then((res) => {
          console.log("==> coil");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.dataList.coil = res.data;
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
      var id = this.current_view_item.id_coil;
      axios({
        method: "post",
        url: "coil-thickness/coil-thk-cml-view-by-coil-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_coil: id,
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
        url: "coil-thickness/coil-thk-tp-by-cml",
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
        url: "coil-thickness/coil-thk-data-by-tp",
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
      this.current_view_item.id_coil = e.row.key;
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
    CREATE_COIL(e) {
      console.log(e);
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_coil = 0;
      console.log(e.data);
      axios({
        method: "post",
        url: "coil-thickness/add-coil-info",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            //this.FETCH_CML();
            this.FETCH_COIL();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPDATE_COIL(e) {
      console.log(e.data);
    },
    DELETE_COIL(e) {
      this.isLoading = true;
      axios({
        method: "delete",
        url: "coil-thickness/delete-coil-info",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_coil: e.key,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_COIL();
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
      e.data.id_coil = this.current_view_item.id_coil;
      e.data.actual_od = this.SET_OCTUAL_OD(e.data.nps);
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      axios({
        method: "post",
        url: "coil-thickness/add-coil-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            //this.FETCH_VIEW();
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
      e.data.actual_od = this.SET_OCTUAL_OD(e.data.nps);
      e.data.inservice_date = moment(e.data.inservice_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "coil-thickness/edit-coil-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
            // this.FETCH_VIEW();
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
        url: "coil-thickness/delete-coil-thk-cml",
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
            // this.FETCH_VIEW();
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
      e.data.id_cml = this.current_view_item.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "coil-thickness/add-coil-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            // this.FETCH_VIEW();
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
        url: "coil-thickness/edit-coil-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
            // this.FETCH_VIEW();
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
        url: "coil-thickness/delete-coil-thk-tp",
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
            // this.FETCH_VIEW();
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
      e.data.id_tp = this.current_view_item.id_tp;
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "coil-thickness/add-coil-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            // this.FETCH_VIEW();
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
      console.log(e.data);
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = moment(date[0].inspection_date).format("L");
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "coil-thickness/edit-coil-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_UTM();
            //this.FETCH_VIEW();
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
        url: "coil-thickness/delete-coil-thk-data",
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
            this.FETCH_UTM();
            // this.FETCH_VIEW();
          }
        })
        .catch((error) => {
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
    SET_OCTUAL_OD(val) {
      if(val == 0.125) {
        return 10.3;
      } else if(val == 0.25) {
        return 13.7;
      } else if(val == 0.357) {
        return 17.1;
      } else if(val == 0.5) {
        return 21.3;
      } else if(val == 0.75) {
        return 26.7;
      } else if(val == 1) {
        return 33.4;
      } else if(val == 1.25) {
        return 42.2;
      } else if(val == 1.5) {
        return 48.3;
      } else if(val == 2) {
        return 60.3;
      } else if(val == 2.5) {
        return 73;
      } else if(val == 3) {
        return 88.9;
      } else if(val == 3.5) {
        return 101.6;
      } else if(val == 4) {
        return 114.3;
      } else if(val == 5) {
        return 141.3;
      } else if(val == 6) {
        return 168.3;
      } else if(val == 8) {
        return 219.1;
      } else if(val == 10) {
        return 273;
      } else if(val == 12) {
        return 323.8;
      } else if(val == 14) {
        return 355.6;
      } else if(val == 16) {
        return 406.4;
      } else if(val == 18) {
        return 457;
      } else if(val == 20) {
        return 508;
      } else if(val == 22) {
        return 559;
      } else if(val == 24) {
        return 610;
      } else if(val == 30) {
        return 762;
      } else if(val == 34) {
        return 864;
      } else if(val == 36) {
        return 914;
      } else if(val == 38) {
        return 965;
      } else if(val == 40) {
        return 1016;
      } else if(val == 42) {
        return 1097;
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
  overflow: auto;
  .page-section {
    height: fit-content;
    margin-bottom: 20px;
    width: calc(100% - 20px);
    padding: 20px 10px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 15% 50% 15% 20%;
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