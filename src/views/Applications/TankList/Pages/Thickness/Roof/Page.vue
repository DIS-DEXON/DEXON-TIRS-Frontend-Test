<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <button v-on:click="VIEW_TP()">ffffffS</button>
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

          <DxColumn data-field="roof_row" caption="Roof row" />

          <DxColumn data-field="roof_column" caption="Roof column" />

          <DxColumn data-field="t_nom" caption="tnom (mm)" format="#,##0.00" />

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

          <DxColumn type="buttons">
            <DxButton hint="View TP" icon="search" @click="VIEW_TP" />

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
          <DxExport :enabled="true" />
        </DxDataGrid>
      </div>
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-style"
          key-expr="id_inspection_record"
          :data-source="dataList.tp"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          :word-wrap-enabled="true"
        >
          <!-- <DxColumn
        data-field="created_time"
        :width="0"
        caption=""
        sort-order="asc"
      /> -->
          <DxColumn data-field="plate_desc" caption="Plate No." />
          <DxColumn data-field="plate_desc" caption="tnom" />
          <DxColumn
            data-field="inservice_date"
            caption="Inspection date"
            data-type="date"
            format="dd MMM yyyy"
            sort-order="desc"
          />

          <DxColumn data-field="report_no" caption="Report number" />

          <DxColumn data-field="remark" caption="Remark" />

          <!-- <DxColumn :width="80" caption="" cell-template="cell-button-set" /> -->

          <!-- <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="EDIT_INFO(data)">
            <i class="las la-pen blue"></i>
          </div>
          <div class="table-btn" v-on:click="DELETE_INFO(data)">
            <i class="las la-trash red"></i>
          </div>
        </div>
      </template> -->
          <template #table-header>
            <div>
              <div class="page-section-label">Shell Course</div>
            </div>
          </template>
          <!-- <template #table-header-button-set>
        <div>
          <v-ons-toolbar-button>
            <i class="las la-plus"></i>
            <span>Add New Tank Course</span>
          </v-ons-toolbar-button>
        </div>
      </template> -->
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
          <!-- <DxColumn
        data-field="created_time"
        :width="0"
        caption=""
        sort-order="asc"
      /> -->
          <DxColumn
            data-field="inspection_date"
            caption="Inspection date"
            data-type="date"
            format="dd MMM yyyy"
            sort-order="desc"
          />

          <DxColumn data-field="report_no" caption="Report number" />
          <DxColumn data-field="remark" caption="Remark" />

          <!-- <DxColumn :width="80" caption="" cell-template="cell-button-set" /> -->

          <!-- <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="EDIT_INFO(data)">
            <i class="las la-pen blue"></i>
          </div>
          <div class="table-btn" v-on:click="DELETE_INFO(data)">
            <i class="las la-trash red"></i>
          </div>
        </div>
      </template> -->
          <template #table-header>
            <div>
              <div class="page-section-label">Shell Course</div>
            </div>
          </template>
          <!-- <template #table-header-button-set>
        <div>
          <v-ons-toolbar-button>
            <i class="las la-plus"></i>
            <span>Add New Tank Course</span>
          </v-ons-toolbar-button>
        </div>
      </template> -->
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

          <!-- <DxColumn :width="80" caption="" cell-template="cell-button-set" /> -->

          <!-- <template #cell-button-set="{ data }">
        <div class="table-btn-group">
          <div class="table-btn" v-on:click="EDIT_INFO(data)">
            <i class="las la-pen blue"></i>
          </div>
          <div class="table-btn" v-on:click="DELETE_INFO(data)">
            <i class="las la-trash red"></i>
          </div>
        </div>
      </template> -->
          <template #table-header>
            <div>
              <div class="page-section-label">Shell Course</div>
            </div>
          </template>
          <!-- <template #table-header-button-set>
        <div>
          <v-ons-toolbar-button>
            <i class="las la-plus"></i>
            <span>Add New Tank Course</span>
          </v-ons-toolbar-button>
        </div>
      </template> -->
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
// import moment from "moment";

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
  //DxLookup,
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
    //DxLookup,
    DxButton,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Thickness Messurement");
    if (this.$store.state.status.server == true) {
      this.FETCH_CML();
    }
  },
  data() {
    return {
      dataList: {
        cml: [
          {
            id_cml: 1,
            id_tag: 5,
            roof_row: 1,
            roof_column: 1,
            roof_no: "",
            plate_desc: "",
            t_nom: 6.5,
            t_req: 2.29,
            inservice_date: "2012-01-01T00:00:00",
          },
          {
            id_cml: 2,
            id_tag: 5,
            roof_row: 1,
            roof_column: 3,
            roof_no: "1-2",
            plate_desc: null,
            t_nom: 6.5,
            t_req: 2.29,
            inservice_date: "2012-01-01T00:00:00",
          },
        ],
        tp: [],
        thk: [],
      },
      isLoading: false,
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
    VIEW_TP() {
      console.log("in");
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