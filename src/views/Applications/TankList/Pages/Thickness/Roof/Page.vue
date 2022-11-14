<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="cml-grid"
          key-expr="id_cml"
          :data-source="dataList.cml"
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
            data-field="roof_row" 
            caption="Roof row"
          />

          <DxColumn 
            data-field="roof_column" 
            caption="Roof column" 
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
            data-field="inservice_date"
            caption="In-service date"
            data-type="date"
            format="dd MMM yyyy"
            sort-order="desc"
            :width="120"
          />

          <DxColumn 
            type="buttons"
          >
            <DxButton
              hint="View TP"
              icon="search"
              :on-click="VIEW_TP"
            />

            <DxButton
              name="edit"
              hint="Edit"
              icon="edit"
            />

            <DxButton
              name="delete"
              hint="Delete"
              icon="trash"
            />
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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="tp-grid"
          key-expr="id_tp"
          :data-source="dataList.tp"
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

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn 
            data-field="tp_name" 
            caption="TP name" 
          />

          <DxColumn 
            data-field="tp_desc" 
            caption="TP desc" 
          />
          
          <DxColumn 
            type="buttons"
          >
            <DxButton
              hint="View TP"
              icon="search"
              :on-click="VIEW_THK"
            />

            <DxButton
              name="edit"
              hint="Edit"
              icon="edit"
            />

            <DxButton
              name="delete"
              hint="Delete"
              icon="trash"
            />
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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="thk-grid"
          key-expr="id_thk"
          :data-source="dataList.thk"
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

          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            :use-icons="true"
            mode="row"
          />

          <DxColumn
            data-field="id_inspection_record"
            caption="Inspection date"
          >
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
          />

          <DxColumn 
            type="buttons"
          >
            <DxButton
              name="edit"
              hint="Edit"
              icon="edit"
            />

            <DxButton
              name="delete"
              hint="Delete"
              icon="trash"
            />
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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper" style="grid-column: span 3">
        <DxDataGrid
          id="data-grid-style"
          key-expr="id_inspection_record"
          :data-source="dataList.thk"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >

          <DxColumn
            data-field="inspection_date"
            caption="Inspection date"
            data-type="date"
            format="dd MMM yyyy"
            sort-order="desc"
          />

          <DxColumn data-field="report_no" caption="Report number" />

          <DxColumn data-field="remark" caption="Remark" />

          <template #table-header>
            <div>
              <div class="page-section-label">Shell Course</div>
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
    DxExport,
    //DxToolbar,
    //DxItem,
    DxEditing,
    DxLookup,
    DxButton,
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_CML();
    }
  },
  data() {
    return {
      dataList: {
        cml: [],
        tp: [],
        thk: [],
      },
      isLoading: false,
      id_cml: 0,
      id_tp: 0,
      inspRecordList: {},
    };
  },
  computed: {},
  methods: {
    FETCH_CML() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "roof-thickness/roof-thk-cml-by-tank-id",
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
        url: "roof-thickness/roof-thk-tp-by-cml",
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
        url: "roof-thickness/roof-thk-data-by-tp",
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
      console.log(e);
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      e.data.id_tag = id_tag;
      e.data.id_cml = 0;
      console.log(e);
      axios({
        method: "post",
        url: "roof-thickness/add-roof-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
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
      axios({
        method: "put",
        url: "roof-thickness/edit-roof-thk-cml",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_CML();
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
    },
    CREATE_TP(e) {
      e.data.id_cml = this.id_cml;
      e.data.id_tp = 0;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "roof-thickness/add-roof-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
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
        url: "roof-thickness/edit-roof-thk-tp",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
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
    },
    CREATE_THK(e) {
      e.data.id_thk = 0;
      e.data.id_tp = this.id_tp;
      var date = this.inspRecordList.filter(function (v) {
        return v.id_inspection_record == e.data.id_inspection_record;
      });
      e.data.inspection_date = date[0].inspection_date;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "post",
        url: "roof-thickness/add-roof-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
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
      e.data.inspection_date = date[0].inspection_date;
      console.log(e.data);
      this.isLoading = true;
      axios({
        method: "put",
        url: "roof-thickness/edit-roof-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: e.data,
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_TP();
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
        url: "roof-thickness/delete-roof-thk-data",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          "id_thk":e.key
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.FETCH_THK();
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
      this.id_cml = e.row.key;
      this.FETCH_TP();
    },
    VIEW_THK(e) {
      console.log(e);
      this.id_tp = e.row.key;
      this.FETCH_THK();
    },
    SET_FORMAT_DATE(e) {
      console.log(e);
      return moment(e.inspection_date).format("DD MMM yyyy");
    }
  },
}
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
  height: calc(100% - 40px);
  // height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 40% 30% 30%;
  grid-template-rows: 500px 500px;
  grid-gap: 10px;
  width: calc(100% - 60px);
}

.table-wrapper {
  // border: 1px solid #cecece;
  // padding: 20px;
}

#data-grid-style {
  height: 100%;
}
</style>