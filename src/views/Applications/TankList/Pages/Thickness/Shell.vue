<template>
  <div class="page-container">
    <innerPageName pageName="Thickness Messurement" breadcrumb1="Shell" />
    <div class="page-section">
      <div class="table-wrapper">
        <DxDataGrid
          id="data-grid-style"
          key-expr="id_cml"
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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
          key-expr="id_cml"
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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

          <DxColumn data-field="id_campaign" caption="Campaign">
            <DxLookup
              :data-source="campaigeList"
              value-expr="id_campaign"
              display-expr="campaign_desc"
            />
          </DxColumn>
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
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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

          <DxColumn data-field="id_campaign" caption="Campaign">
            <DxLookup
              :data-source="campaigeList"
              value-expr="id_campaign"
              display-expr="campaign_desc"
            />
          </DxColumn>
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
      <div class="table-wrapper" style="grid-column: span 4">
        <DxDataGrid
          id="data-grid-style"
          key-expr="id_inspection_record"
          :data-source="dataList.cml"
          :element-attr="dataGridAttributes"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :allow-column-reordering="true"
          :show-borders="true"
          :show-row-lines="true"
          :row-alternation-enabled="false"
          @exporting="EXPORT_DATA"
          :word-wrap-enabled="true"
          @row-inserted="CREATE_RECORD"
          @row-updated="UPDATE_RECORD"
          @row-removed="DELETE_RECORD"
          style="margin-top: 20px"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="true"
            mode="row"
          />
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

          <DxColumn data-field="id_campaign" caption="Campaign">
            <DxLookup
              :data-source="campaigeList"
              value-expr="id_campaign"
              display-expr="campaign_desc"
            />
          </DxColumn>
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
// import axios from "/axios.js";
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
  DxExport,
  //DxToolbar,
  //DxItem,
  DxEditing,
  DxLookup,
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
    innerPageName,
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png",
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", "Thickness Messurement");
    if (this.$store.state.status.server == true) {
      // this.FETCH_TANK_INFO();
      // this.FETCH_CLIENT_INFO();
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
      dataGridAttributes: {
        class: "data-grid-style",
      },
      isLoading: false,
    };
  },
  computed: {},
  methods: {},
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
    grid-template-columns: 20% 40% 20% 20%;
    grid-template-rows: 500px 500px;
    // grid-gap: 10px;
  }
}

.table-wrapper {
  padding: 0 10px;
}

#data-grid-style {
  height: 100%;
}
</style>